-- ============================================================================
-- Customer Intelligence & Revenue Analytics: Production SQL Queries
-- Dialect: ANSI SQL / PostgreSQL / Google BigQuery / Snowflake Compatible
-- Author: Data Analytics Portfolio Project
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. EXECUTIVE KPI SUMMARY & CHANNEL ATTRIBUTION
-- Evaluates total revenue, active customers, AOV, and customer acquisition efficiency
-- ----------------------------------------------------------------------------
WITH CustomerOrders AS (
    SELECT 
        c.customer_id,
        c.acquisition_channel,
        c.country,
        COUNT(o.order_id) AS total_orders,
        SUM(o.total_amount) AS total_customer_spend,
        MIN(o.order_date) AS first_order_date,
        MAX(o.order_date) AS last_order_date
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_status = 'Delivered'
    GROUP BY c.customer_id, c.acquisition_channel, c.country
)
SELECT 
    acquisition_channel,
    COUNT(customer_id) AS total_customers,
    ROUND(SUM(total_customer_spend), 2) AS total_channel_revenue,
    ROUND(AVG(total_customer_spend), 2) AS avg_revenue_per_customer,
    ROUND(SUM(total_customer_spend) / SUM(total_orders), 2) AS average_order_value_aov,
    ROUND(100.0 * COUNT(CASE WHEN total_orders > 1 THEN 1 END) / COUNT(customer_id), 2) AS repeat_purchase_rate_pct
FROM CustomerOrders
GROUP BY acquisition_channel
ORDER BY total_channel_revenue DESC;


-- ----------------------------------------------------------------------------
-- 2. MONTHLY COHORT RETENTION ANALYSIS MATRIX
-- Tracks user retention over subsequent months from initial acquisition month
-- ----------------------------------------------------------------------------
WITH CohortBase AS (
    -- Step A: Determine each customer's first purchase month (Cohort Month)
    SELECT 
        customer_id,
        DATE_TRUNC('month', MIN(order_date))::DATE AS cohort_month
    FROM orders
    WHERE order_status = 'Delivered'
    GROUP BY customer_id
),
CohortActivity AS (
    -- Step B: Map all order events back to cohort month & compute month index
    SELECT 
        o.customer_id,
        cb.cohort_month,
        DATE_TRUNC('month', o.order_date)::DATE AS activity_month,
        (EXTRACT(YEAR FROM o.order_date) - EXTRACT(YEAR FROM cb.cohort_month)) * 12 +
        (EXTRACT(MONTH FROM o.order_date) - EXTRACT(MONTH FROM cb.cohort_month)) AS cohort_index
    FROM orders o
    JOIN CohortBase cb ON o.customer_id = cb.customer_id
    WHERE o.order_status = 'Delivered'
    GROUP BY o.customer_id, cb.cohort_month, o.order_date
),
CohortSizes AS (
    -- Step C: Get initial cohort size at month 0
    SELECT 
        cohort_month,
        COUNT(DISTINCT customer_id) AS cohort_size
    FROM CohortBase
    GROUP BY cohort_month
)
-- Step D: Pivot & aggregate retention rates by cohort month
SELECT 
    ca.cohort_month,
    cs.cohort_size,
    COUNT(DISTINCT CASE WHEN ca.cohort_index = 0 THEN ca.customer_id END) AS month_0,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN ca.cohort_index = 1 THEN ca.customer_id END) / cs.cohort_size, 1) AS month_1_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN ca.cohort_index = 2 THEN ca.customer_id END) / cs.cohort_size, 1) AS month_2_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN ca.cohort_index = 3 THEN ca.customer_id END) / cs.cohort_size, 1) AS month_3_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN ca.cohort_index = 4 THEN ca.customer_id END) / cs.cohort_size, 1) AS month_4_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN ca.cohort_index = 5 THEN ca.customer_id END) / cs.cohort_size, 1) AS month_5_pct
FROM CohortActivity ca
JOIN CohortSizes cs ON ca.cohort_month = cs.cohort_month
GROUP BY ca.cohort_month, cs.cohort_size
ORDER BY ca.cohort_month ASC;


-- ----------------------------------------------------------------------------
-- 3. RFM (RECENCY, FREQUENCY, MONETARY) SEGMENTATION
-- Uses statistical quintiles (NTILE) to segment customers into actionable tiers
-- ----------------------------------------------------------------------------
WITH Snapshot AS (
    -- Anchor date for recency calculation (e.g., latest dataset date)
    SELECT MAX(order_date) + INTERVAL '1 day' AS snapshot_date FROM orders
),
RFM_Raw AS (
    SELECT 
        o.customer_id,
        c.customer_name,
        c.email,
        DATE_PART('day', s.snapshot_date - MAX(o.order_date)) AS recency_days,
        COUNT(DISTINCT o.order_id) AS frequency,
        ROUND(SUM(o.total_amount), 2) AS monetary_value
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    CROSS JOIN Snapshot s
    WHERE o.order_status = 'Delivered'
    GROUP BY o.customer_id, c.customer_name, c.email, s.snapshot_date
),
RFM_Scores AS (
    SELECT 
        customer_id,
        customer_name,
        email,
        recency_days,
        frequency,
        monetary_value,
        -- Higher recency score for recent purchasers (fewer days)
        NTILE(5) OVER (ORDER BY recency_days DESC) AS r_score,
        NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary_value ASC) AS m_score
    FROM RFM_Raw
)
SELECT 
    customer_id,
    customer_name,
    email,
    recency_days,
    frequency,
    monetary_value,
    CONCAT(r_score, f_score, m_score) AS rfm_combined,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions / VIP'
        WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customers'
        WHEN r_score >= 4 AND f_score <= 2 THEN 'Promising New Customers'
        WHEN r_score = 3 AND f_score <= 2 THEN 'Needs Attention'
        WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk (High Value Churn)'
        WHEN r_score <= 2 AND f_score <= 2 THEN 'Hibernating / Lost'
        ELSE 'General Casual'
    END AS customer_segment
FROM RFM_Scores
ORDER BY monetary_value DESC;


-- ----------------------------------------------------------------------------
-- 4. CATEGORY LIFETIME VALUE & REORDER INTERVAL (WINDOW FUNCTION)
-- Calculates days between consecutive orders to identify reorder cycles
-- ----------------------------------------------------------------------------
WITH OrderSequences AS (
    SELECT 
        customer_id,
        order_id,
        category,
        order_date,
        total_amount,
        LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS previous_order_date
    FROM orders
    WHERE order_status = 'Delivered'
)
SELECT 
    category,
    COUNT(order_id) AS total_orders,
    ROUND(SUM(total_amount), 2) AS total_category_revenue,
    ROUND(AVG(total_amount), 2) AS avg_item_order_value,
    ROUND(AVG(order_date - previous_order_date), 1) AS avg_days_between_purchases
FROM OrderSequences
GROUP BY category
ORDER BY total_category_revenue DESC;
