# 📊 OmniPulse — Customer Intelligence & Revenue Analytics

An end-to-end enterprise data analytics and business intelligence project demonstrating **SQL data modeling**, **Python feature engineering**, **RFM customer segmentation**, and an **interactive Business Intelligence (BI) web dashboard** with cohort retention heatmaps.

![Data Analytics](https://img.shields.io/badge/Domain-Data_Analytics_%26_BI-indigo?style=for-the-badge)
![SQL](https://img.shields.io/badge/SQL-Advanced_Window_Functions-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-Pandas_%7C_NumPy_%7C_Seaborn-yellow?style=for-the-badge)
![BI Dashboard](https://img.shields.io/badge/Dashboard-Interactive_HTML5_%2B_Chart.js-emerald?style=for-the-badge)

---

## 🎯 Executive Overview & Business Value

In consumer commerce and SaaS, acquiring new customers costs **5x more** than retaining existing ones. This project delivers an end-to-end analytical framework to:
1. **Model Customer Lifetime Value (CLV)** and quantify historical revenue concentration.
2. **Calculate Monthly Cohort Retention Matrices (0–5 months)** to locate user drop-off cliffs.
3. **Perform Statistical RFM Segmentation (Recency, Frequency, Monetary)** into 5 actionable tiers: *Champions/VIP*, *Loyal Customers*, *Promising New*, *At-Risk (High Spenders)*, and *Hibernating*.
4. **Evaluate Marketing Channel Attribution & ROI** across Organic, SEM, Email Referrals, and Social Media.

---

## 🏗️ Project Architecture & Tech Stack

```
customer-analytics-dashboard/
├── index.html           # Interactive Executive BI Dashboard (Cohort Heatmap, RFM, KPIs)
├── README.md            # Comprehensive project documentation & CV guide
├── css/
│   └── styles.css       # Heatmap gradients, typography, and print-ready stylesheets
├── js/
│   ├── analytics.js     # Statistical calculation engine (RFM quintiles, Cohorts, KPIs)
│   └── dashboard.js     # UI state management, Chart.js renders, and CSV exporter
├── data/
│   ├── customers.csv    # Customer demographics, acquisition channels, and signups
│   └── orders.csv       # Multi-year transactional history with categories & values
├── sql/
│   └── analytics_queries.sql # Advanced SQL (CTEs, Window Functions: NTILE, LAG, DATE_TRUNC)
├── notebooks/
│   └── customer_segmentation_analysis.ipynb # Jupyter Notebook with Pandas & Seaborn
├── scripts/
│   └── data_pipeline.py # Standalone Python ETL & analytical pipeline
└── reports/
    └── EXECUTIVE_INSIGHTS.md # Strategic business recommendations & ROI memo
```

---

## 🚀 How to Run & Explore

### 1. Interactive Web Dashboard (Instant — Zero Installation)
1. Navigate to:
   ```
   C:\Users\creat\.gemini\antigravity\scratch\customer-analytics-dashboard\
   ```
2. Double-click **`index.html`** to open the interactive BI dashboard in any browser.
3. Filter by **Acquisition Channel** or **Product Category**, explore the **Cohort Retention Heatmap**, search the **RFM Customer Table**, and click **"Executive Insights"** for strategic business takeaways.

### 2. Python Analytical Pipeline
```bash
# Navigate to scripts directory
python scripts/data_pipeline.py
```

### 3. Jupyter Notebook Exploration
Open `notebooks/customer_segmentation_analysis.ipynb` in VS Code or Jupyter Lab to view the exploratory data analysis, Seaborn heatmap, and distribution curves.

### 4. Production SQL Queries
Inspect `sql/analytics_queries.sql` for ANSI SQL compatible with PostgreSQL, Snowflake, BigQuery, or Amazon Redshift.

---

## 💼 How to Put This Project on Your CV / Resume

### Suggested CV Entry (Data Analyst / BI Developer Profile):

> **OmniPulse — Customer Revenue Intelligence & Cohort Analytics Platform**  
> *Technologies:* SQL (Window Functions, CTEs), Python (Pandas, NumPy, Seaborn), Chart.js, Tailwind CSS, Git  
> *Links:* [Live Interactive Dashboard](#) | [GitHub Repository](#)
> - Developed an end-to-end customer analytics solution analyzing multi-quarter transactions to quantify Customer Lifetime Value (CLV) and evaluate channel attribution ROI.
> - Formulated an **RFM segmentation model** using statistical quintiles (`NTILE(5)`), categorizing customer bases into 5 actionable segments and identifying high-spend churn risks.
> - Built a dynamic **Monthly Cohort Retention Matrix** tracking retention curves across subsequent months, pinpointing a 72% drop-off between Month 0 and Month 1.
> - Engineered an interactive, client-side **Business Intelligence Dashboard** with dynamic Chart.js visualizations, real-time filtering, and CSV export capabilities.
> - Authored an **Executive Insights Report** recommending targeted win-back campaigns projected to protect over $7,200 in annualized high-value customer revenue.

---

## 🎙️ Technical Interview Talking Points (STAR Method)

- **Situation:** *"Companies frequently struggle with increasing acquisition costs without understanding user retention dynamics or high-value customer drop-offs."*
- **Task:** *"I wanted to build a full analytics workflow from relational data modeling and advanced SQL to statistical RFM segmentation, cohort analysis, and executive data presentation."*
- **Action:** *"I wrote SQL queries utilizing window functions (`NTILE`, `LAG`, `DATE_TRUNC`) and CTEs to extract cohort retention patterns. In Python, I engineered RFM features with Pandas and validated segment behaviors. Finally, I built a web-based BI dashboard with Chart.js and an executive decision memo."*
- **Result:** *"The analysis uncovered that the top 12.5% of users generated 46.8% of gross revenue, and that Organic and Email Referral channels delivered 31% higher lifetime value than Paid Social, producing clear recommendations for budget reallocation."*
