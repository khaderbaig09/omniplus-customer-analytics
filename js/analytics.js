/**
 * Customer Intelligence & Revenue Analytics Calculation Engine
 */

const RAW_CUSTOMERS = [
  { customer_id: 'CUST-1001', customer_name: 'Eleanor Vance', email: 'eleanor.v@example.com', acquisition_channel: 'Organic Search', country: 'United States', signup_date: '2025-01-10' },
  { customer_id: 'CUST-1002', customer_name: 'Liam Gallagher', email: 'liam.g@example.com', acquisition_channel: 'Paid Search', country: 'United Kingdom', signup_date: '2025-01-12' },
  { customer_id: 'CUST-1003', customer_name: 'Sophia Martinez', email: 'sophia.m@example.com', acquisition_channel: 'Social Media', country: 'Canada', signup_date: '2025-01-15' },
  { customer_id: 'CUST-1004', customer_name: 'Marcus Chen', email: 'marcus.c@example.com', acquisition_channel: 'Email Referral', country: 'Germany', signup_date: '2025-01-20' },
  { customer_id: 'CUST-1005', customer_name: 'Amina Diallo', email: 'amina.d@example.com', acquisition_channel: 'Direct', country: 'France', signup_date: '2025-01-22' },
  { customer_id: 'CUST-1006', customer_name: 'David Miller', email: 'david.m@example.com', acquisition_channel: 'Paid Search', country: 'United States', signup_date: '2025-02-01' },
  { customer_id: 'CUST-1007', customer_name: 'Chloe Bennett', email: 'chloe.b@example.com', acquisition_channel: 'Organic Search', country: 'Australia', signup_date: '2025-02-05' },
  { customer_id: 'CUST-1008', customer_name: 'Tariq Al-Mansoor', email: 'tariq.m@example.com', acquisition_channel: 'Social Media', country: 'United Arab Emirates', signup_date: '2025-02-11' },
  { customer_id: 'CUST-1009', customer_name: 'Hannah Schmidt', email: 'hannah.s@example.com', acquisition_channel: 'Direct', country: 'Germany', signup_date: '2025-02-14' },
  { customer_id: 'CUST-1010', customer_name: 'Kenji Sato', email: 'kenji.s@example.com', acquisition_channel: 'Email Referral', country: 'Japan', signup_date: '2025-02-18' },
  { customer_id: 'CUST-1011', customer_name: 'Olivia Taylor', email: 'olivia.t@example.com', acquisition_channel: 'Paid Search', country: 'United Kingdom', signup_date: '2025-03-02' },
  { customer_id: 'CUST-1012', customer_name: 'Gabriel Rossi', email: 'gabriel.r@example.com', acquisition_channel: 'Organic Search', country: 'Italy', signup_date: '2025-03-05' },
  { customer_id: 'CUST-1013', customer_name: 'Zara Patel', email: 'zara.p@example.com', acquisition_channel: 'Social Media', country: 'India', signup_date: '2025-03-12' },
  { customer_id: 'CUST-1014', customer_name: 'Ethan Walker', email: 'ethan.w@example.com', acquisition_channel: 'Direct', country: 'United States', signup_date: '2025-03-15' },
  { customer_id: 'CUST-1015', customer_name: 'Isabella Silva', email: 'isabella.s@example.com', acquisition_channel: 'Paid Search', country: 'Brazil', signup_date: '2025-03-22' },
  { customer_id: 'CUST-1016', customer_name: 'Noah Andersen', email: 'noah.a@example.com', acquisition_channel: 'Email Referral', country: 'Denmark', signup_date: '2025-04-03' },
  { customer_id: 'CUST-1017', customer_name: 'Mia Kowalski', email: 'mia.k@example.com', acquisition_channel: 'Organic Search', country: 'Poland', signup_date: '2025-04-08' },
  { customer_id: 'CUST-1018', customer_name: 'Lucas Morales', email: 'lucas.m@example.com', acquisition_channel: 'Social Media', country: 'Spain', signup_date: '2025-04-14' },
  { customer_id: 'CUST-1019', customer_name: 'Emily Clark', email: 'emily.c@example.com', acquisition_channel: 'Paid Search', country: 'United States', signup_date: '2025-04-19' },
  { customer_id: 'CUST-1020', customer_name: 'Alexander Wright', email: 'alex.w@example.com', acquisition_channel: 'Direct', country: 'Canada', signup_date: '2025-04-25' },
  { customer_id: 'CUST-1021', customer_name: 'Layla Hassan', email: 'layla.h@example.com', acquisition_channel: 'Email Referral', country: 'Egypt', signup_date: '2025-05-02' },
  { customer_id: 'CUST-1022', customer_name: 'Benjamin Scott', email: 'ben.s@example.com', acquisition_channel: 'Organic Search', country: 'United Kingdom', signup_date: '2025-05-07' },
  { customer_id: 'CUST-1023', customer_name: 'Zoe Martin', email: 'zoe.m@example.com', acquisition_channel: 'Paid Search', country: 'Australia', signup_date: '2025-05-12' },
  { customer_id: 'CUST-1024', customer_name: 'Carlos Gomez', email: 'carlos.g@example.com', acquisition_channel: 'Social Media', country: 'Mexico', signup_date: '2025-05-18' },
  { customer_id: 'CUST-1025', customer_name: 'Freja Lind', email: 'freja.l@example.com', acquisition_channel: 'Direct', country: 'Sweden', signup_date: '2025-05-23' },
  { customer_id: 'CUST-1026', customer_name: 'Samuel Adams', email: 'sam.a@example.com', acquisition_channel: 'Paid Search', country: 'United States', signup_date: '2025-06-01' },
  { customer_id: 'CUST-1027', customer_name: 'Nadia Popov', email: 'nadia.p@example.com', acquisition_channel: 'Organic Search', country: 'Germany', signup_date: '2025-06-04' },
  { customer_id: 'CUST-1028', customer_name: 'Oliver Harris', email: 'oliver.h@example.com', acquisition_channel: 'Email Referral', country: 'Canada', signup_date: '2025-06-11' },
  { customer_id: 'CUST-1029', customer_name: 'Grace Kim', email: 'grace.k@example.com', acquisition_channel: 'Social Media', country: 'South Korea', signup_date: '2025-06-17' },
  { customer_id: 'CUST-1030', customer_name: 'Julian Dubois', email: 'julian.d@example.com', acquisition_channel: 'Direct', country: 'France', signup_date: '2025-06-22' },
  { customer_id: 'CUST-1031', customer_name: 'Fatima Al-Sayed', email: 'fatima.s@example.com', acquisition_channel: 'Paid Search', country: 'Saudi Arabia', signup_date: '2025-07-03' },
  { customer_id: 'CUST-1032', customer_name: 'Leo O\'Connor', email: 'leo.o@example.com', acquisition_channel: 'Organic Search', country: 'Ireland', signup_date: '2025-07-08' },
  { customer_id: 'CUST-1033', customer_name: 'Maya Lin', email: 'maya.l@example.com', acquisition_channel: 'Social Media', country: 'Singapore', signup_date: '2025-07-15' },
  { customer_id: 'CUST-1034', customer_name: 'William Turner', email: 'will.t@example.com', acquisition_channel: 'Email Referral', country: 'United States', signup_date: '2025-07-21' },
  { customer_id: 'CUST-1035', customer_name: 'Clara Becker', email: 'clara.b@example.com', acquisition_channel: 'Direct', country: 'Germany', signup_date: '2025-07-27' },
  { customer_id: 'CUST-1036', customer_name: 'Daniel Evans', email: 'daniel.e@example.com', acquisition_channel: 'Paid Search', country: 'United Kingdom', signup_date: '2025-08-02' },
  { customer_id: 'CUST-1037', customer_name: 'Elena Vasquez', email: 'elena.v@example.com', acquisition_channel: 'Organic Search', country: 'Spain', signup_date: '2025-08-09' },
  { customer_id: 'CUST-1038', customer_name: 'Arjun Sharma', email: 'arjun.s@example.com', acquisition_channel: 'Social Media', country: 'India', signup_date: '2025-08-16' },
  { customer_id: 'CUST-1039', customer_name: 'Sophie Larsson', email: 'sophie.l@example.com', acquisition_channel: 'Direct', country: 'Sweden', signup_date: '2025-08-22' },
  { customer_id: 'CUST-1040', customer_name: 'Henry Brooks', email: 'henry.b@example.com', acquisition_channel: 'Paid Search', country: 'United States', signup_date: '2025-08-28' }
];

const RAW_ORDERS = [
  { order_id: 'ORD-5001', customer_id: 'CUST-1001', order_date: '2025-01-11', category: 'Electronics', quantity: 1, unit_price: 850.00, discount_percent: 0.05, total_amount: 807.50, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5002', customer_id: 'CUST-1002', order_date: '2025-01-13', category: 'Apparel', quantity: 3, unit_price: 60.00, discount_percent: 0.10, total_amount: 162.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5003', customer_id: 'CUST-1003', order_date: '2025-01-16', category: 'Home & Living', quantity: 2, unit_price: 120.00, discount_percent: 0.00, total_amount: 240.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5004', customer_id: 'CUST-1004', order_date: '2025-01-22', category: 'Beauty', quantity: 4, unit_price: 35.00, discount_percent: 0.15, total_amount: 119.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5005', customer_id: 'CUST-1005', order_date: '2025-01-25', category: 'Fitness', quantity: 1, unit_price: 280.00, discount_percent: 0.00, total_amount: 280.00, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5006', customer_id: 'CUST-1001', order_date: '2025-02-14', category: 'Apparel', quantity: 2, unit_price: 75.00, discount_percent: 0.10, total_amount: 135.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5007', customer_id: 'CUST-1006', order_date: '2025-02-02', category: 'Electronics', quantity: 2, unit_price: 420.00, discount_percent: 0.00, total_amount: 840.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5008', customer_id: 'CUST-1007', order_date: '2025-02-06', category: 'Fitness', quantity: 1, unit_price: 190.00, discount_percent: 0.05, total_amount: 180.50, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5009', customer_id: 'CUST-1008', order_date: '2025-02-12', category: 'Beauty', quantity: 3, unit_price: 45.00, discount_percent: 0.10, total_amount: 121.50, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5010', customer_id: 'CUST-1009', order_date: '2025-02-16', category: 'Home & Living', quantity: 1, unit_price: 340.00, discount_percent: 0.00, total_amount: 340.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5011', customer_id: 'CUST-1010', order_date: '2025-02-20', category: 'Electronics', quantity: 1, unit_price: 1100.00, discount_percent: 0.10, total_amount: 990.00, payment_method: 'Bank Transfer', order_status: 'Delivered' },
  { order_id: 'ORD-5012', customer_id: 'CUST-1002', order_date: '2025-02-28', category: 'Apparel', quantity: 1, unit_price: 95.00, discount_percent: 0.00, total_amount: 95.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5013', customer_id: 'CUST-1011', order_date: '2025-03-03', category: 'Beauty', quantity: 2, unit_price: 65.00, discount_percent: 0.00, total_amount: 130.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5014', customer_id: 'CUST-1012', order_date: '2025-03-07', category: 'Fitness', quantity: 2, unit_price: 110.00, discount_percent: 0.15, total_amount: 187.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5015', customer_id: 'CUST-1013', order_date: '2025-03-14', category: 'Electronics', quantity: 1, unit_price: 650.00, discount_percent: 0.00, total_amount: 650.00, payment_method: 'UPI', order_status: 'Delivered' },
  { order_id: 'ORD-5016', customer_id: 'CUST-1014', order_date: '2025-03-18', category: 'Home & Living', quantity: 3, unit_price: 90.00, discount_percent: 0.10, total_amount: 243.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5017', customer_id: 'CUST-1015', order_date: '2025-03-24', category: 'Apparel', quantity: 4, unit_price: 45.00, discount_percent: 0.05, total_amount: 171.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5018', customer_id: 'CUST-1001', order_date: '2025-03-29', category: 'Electronics', quantity: 1, unit_price: 320.00, discount_percent: 0.00, total_amount: 320.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5019', customer_id: 'CUST-1003', order_date: '2025-03-15', category: 'Home & Living', quantity: 1, unit_price: 150.00, discount_percent: 0.00, total_amount: 150.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5020', customer_id: 'CUST-1006', order_date: '2025-03-22', category: 'Fitness', quantity: 1, unit_price: 310.00, discount_percent: 0.10, total_amount: 279.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5021', customer_id: 'CUST-1016', order_date: '2025-04-04', category: 'Beauty', quantity: 3, unit_price: 50.00, discount_percent: 0.00, total_amount: 150.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5022', customer_id: 'CUST-1017', order_date: '2025-04-10', category: 'Apparel', quantity: 2, unit_price: 85.00, discount_percent: 0.20, total_amount: 136.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5023', customer_id: 'CUST-1018', order_date: '2025-04-15', category: 'Electronics', quantity: 1, unit_price: 950.00, discount_percent: 0.05, total_amount: 902.50, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5024', customer_id: 'CUST-1019', order_date: '2025-04-20', category: 'Home & Living', quantity: 2, unit_price: 140.00, discount_percent: 0.00, total_amount: 280.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5025', customer_id: 'CUST-1020', order_date: '2025-04-26', category: 'Fitness', quantity: 1, unit_price: 450.00, discount_percent: 0.10, total_amount: 405.00, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5026', customer_id: 'CUST-1007', order_date: '2025-04-18', category: 'Fitness', quantity: 2, unit_price: 80.00, discount_percent: 0.00, total_amount: 160.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5027', customer_id: 'CUST-1010', order_date: '2025-04-22', category: 'Electronics', quantity: 2, unit_price: 120.00, discount_percent: 0.00, total_amount: 240.00, payment_method: 'Bank Transfer', order_status: 'Delivered' },
  { order_id: 'ORD-5028', customer_id: 'CUST-1021', order_date: '2025-05-03', category: 'Apparel', quantity: 3, unit_price: 70.00, discount_percent: 0.10, total_amount: 189.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5029', customer_id: 'CUST-1022', order_date: '2025-05-09', category: 'Electronics', quantity: 1, unit_price: 780.00, discount_percent: 0.00, total_amount: 780.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5030', customer_id: 'CUST-1023', order_date: '2025-05-14', category: 'Home & Living', quantity: 1, unit_price: 260.00, discount_percent: 0.15, total_amount: 221.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5031', customer_id: 'CUST-1024', order_date: '2025-05-19', category: 'Beauty', quantity: 4, unit_price: 40.00, discount_percent: 0.00, total_amount: 160.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5032', customer_id: 'CUST-1025', order_date: '2025-05-25', category: 'Fitness', quantity: 1, unit_price: 380.00, discount_percent: 0.05, total_amount: 361.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5033', customer_id: 'CUST-1001', order_date: '2025-05-10', category: 'Apparel', quantity: 2, unit_price: 110.00, discount_percent: 0.00, total_amount: 220.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5034', customer_id: 'CUST-1004', order_date: '2025-05-17', category: 'Beauty', quantity: 2, unit_price: 55.00, discount_percent: 0.00, total_amount: 110.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5035', customer_id: 'CUST-1013', order_date: '2025-05-28', category: 'Electronics', quantity: 1, unit_price: 420.00, discount_percent: 0.10, total_amount: 378.00, payment_method: 'UPI', order_status: 'Delivered' },
  { order_id: 'ORD-5036', customer_id: 'CUST-1026', order_date: '2025-06-02', category: 'Electronics', quantity: 1, unit_price: 1250.00, discount_percent: 0.05, total_amount: 1187.50, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5037', customer_id: 'CUST-1027', order_date: '2025-06-05', category: 'Fitness', quantity: 2, unit_price: 95.00, discount_percent: 0.00, total_amount: 190.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5038', customer_id: 'CUST-1028', order_date: '2025-06-12', category: 'Home & Living', quantity: 2, unit_price: 180.00, discount_percent: 0.10, total_amount: 324.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5039', customer_id: 'CUST-1029', order_date: '2025-06-18', category: 'Beauty', quantity: 5, unit_price: 30.00, discount_percent: 0.15, total_amount: 127.50, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5040', customer_id: 'CUST-1030', order_date: '2025-06-23', category: 'Apparel', quantity: 3, unit_price: 65.00, discount_percent: 0.00, total_amount: 195.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5041', customer_id: 'CUST-1006', order_date: '2025-06-14', category: 'Electronics', quantity: 1, unit_price: 600.00, discount_percent: 0.00, total_amount: 600.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5042', customer_id: 'CUST-1018', order_date: '2025-06-27', category: 'Electronics', quantity: 1, unit_price: 350.00, discount_percent: 0.00, total_amount: 350.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5043', customer_id: 'CUST-1031', order_date: '2025-07-04', category: 'Apparel', quantity: 4, unit_price: 55.00, discount_percent: 0.10, total_amount: 198.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5044', customer_id: 'CUST-1032', order_date: '2025-07-09', category: 'Electronics', quantity: 1, unit_price: 890.00, discount_percent: 0.00, total_amount: 890.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5045', customer_id: 'CUST-1033', order_date: '2025-07-16', category: 'Home & Living', quantity: 1, unit_price: 310.00, discount_percent: 0.05, total_amount: 294.50, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5046', customer_id: 'CUST-1034', order_date: '2025-07-22', category: 'Fitness', quantity: 2, unit_price: 130.00, discount_percent: 0.00, total_amount: 260.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5047', customer_id: 'CUST-1035', order_date: '2025-07-28', category: 'Beauty', quantity: 3, unit_price: 45.00, discount_percent: 0.10, total_amount: 121.50, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5048', customer_id: 'CUST-1002', order_date: '2025-07-11', category: 'Apparel', quantity: 2, unit_price: 80.00, discount_percent: 0.00, total_amount: 160.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5049', customer_id: 'CUST-1014', order_date: '2025-07-19', category: 'Home & Living', quantity: 1, unit_price: 220.00, discount_percent: 0.00, total_amount: 220.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5050', customer_id: 'CUST-1022', order_date: '2025-07-29', category: 'Electronics', quantity: 1, unit_price: 450.00, discount_percent: 0.10, total_amount: 405.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5051', customer_id: 'CUST-1036', order_date: '2025-08-03', category: 'Electronics', quantity: 1, unit_price: 980.00, discount_percent: 0.05, total_amount: 931.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5052', customer_id: 'CUST-1037', order_date: '2025-08-10', category: 'Home & Living', quantity: 2, unit_price: 160.00, discount_percent: 0.00, total_amount: 320.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5053', customer_id: 'CUST-1038', order_date: '2025-08-17', category: 'Fitness', quantity: 1, unit_price: 340.00, discount_percent: 0.10, total_amount: 306.00, payment_method: 'UPI', order_status: 'Delivered' },
  { order_id: 'ORD-5054', customer_id: 'CUST-1039', order_date: '2025-08-23', category: 'Beauty', quantity: 4, unit_price: 50.00, discount_percent: 0.15, total_amount: 170.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5055', customer_id: 'CUST-1040', order_date: '2025-08-29', category: 'Apparel', quantity: 3, unit_price: 75.00, discount_percent: 0.00, total_amount: 225.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5056', customer_id: 'CUST-1001', order_date: '2025-08-14', category: 'Electronics', quantity: 2, unit_price: 250.00, discount_percent: 0.00, total_amount: 500.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5057', customer_id: 'CUST-1010', order_date: '2025-08-20', category: 'Electronics', quantity: 1, unit_price: 560.00, discount_percent: 0.00, total_amount: 560.00, payment_method: 'Bank Transfer', order_status: 'Delivered' },
  { order_id: 'ORD-5058', customer_id: 'CUST-1026', order_date: '2025-08-26', category: 'Electronics', quantity: 1, unit_price: 400.00, discount_percent: 0.00, total_amount: 400.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5059', customer_id: 'CUST-1003', order_date: '2025-08-30', category: 'Home & Living', quantity: 2, unit_price: 95.00, discount_percent: 0.00, total_amount: 190.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5060', customer_id: 'CUST-1018', order_date: '2025-09-05', category: 'Electronics', quantity: 1, unit_price: 720.00, discount_percent: 0.05, total_amount: 684.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5061', customer_id: 'CUST-1006', order_date: '2025-09-12', category: 'Fitness', quantity: 1, unit_price: 220.00, discount_percent: 0.00, total_amount: 220.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5062', customer_id: 'CUST-1013', order_date: '2025-09-18', category: 'Beauty', quantity: 3, unit_price: 60.00, discount_percent: 0.10, total_amount: 162.00, payment_method: 'UPI', order_status: 'Delivered' },
  { order_id: 'ORD-5063', customer_id: 'CUST-1020', order_date: '2025-09-24', category: 'Fitness', quantity: 2, unit_price: 110.00, discount_percent: 0.00, total_amount: 220.00, payment_method: 'Apple Pay', order_status: 'Delivered' },
  { order_id: 'ORD-5064', customer_id: 'CUST-1001', order_date: '2025-10-04', category: 'Home & Living', quantity: 1, unit_price: 450.00, discount_percent: 0.10, total_amount: 405.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5065', customer_id: 'CUST-1026', order_date: '2025-10-12', category: 'Electronics', quantity: 1, unit_price: 680.00, discount_percent: 0.00, total_amount: 680.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5066', customer_id: 'CUST-1010', order_date: '2025-10-19', category: 'Electronics', quantity: 2, unit_price: 180.00, discount_percent: 0.05, total_amount: 342.00, payment_method: 'Bank Transfer', order_status: 'Delivered' },
  { order_id: 'ORD-5067', customer_id: 'CUST-1007', order_date: '2025-10-25', category: 'Fitness', quantity: 1, unit_price: 290.00, discount_percent: 0.00, total_amount: 290.00, payment_method: 'Debit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5068', customer_id: 'CUST-1036', order_date: '2025-11-02', category: 'Electronics', quantity: 1, unit_price: 850.00, discount_percent: 0.00, total_amount: 850.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5069', customer_id: 'CUST-1022', order_date: '2025-11-09', category: 'Apparel', quantity: 2, unit_price: 120.00, discount_percent: 0.10, total_amount: 216.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5070', customer_id: 'CUST-1001', order_date: '2025-11-20', category: 'Electronics', quantity: 1, unit_price: 920.00, discount_percent: 0.05, total_amount: 874.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5071', customer_id: 'CUST-1006', order_date: '2025-12-05', category: 'Fitness', quantity: 1, unit_price: 480.00, discount_percent: 0.10, total_amount: 432.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5072', customer_id: 'CUST-1026', order_date: '2025-12-14', category: 'Electronics', quantity: 2, unit_price: 310.00, discount_percent: 0.00, total_amount: 620.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5073', customer_id: 'CUST-1018', order_date: '2025-12-21', category: 'Electronics', quantity: 1, unit_price: 1150.00, discount_percent: 0.10, total_amount: 1035.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5074', customer_id: 'CUST-1003', order_date: '2026-01-08', category: 'Home & Living', quantity: 2, unit_price: 130.00, discount_percent: 0.00, total_amount: 260.00, payment_method: 'PayPal', order_status: 'Delivered' },
  { order_id: 'ORD-5075', customer_id: 'CUST-1010', order_date: '2026-01-15', category: 'Electronics', quantity: 1, unit_price: 750.00, discount_percent: 0.00, total_amount: 750.00, payment_method: 'Bank Transfer', order_status: 'Delivered' },
  { order_id: 'ORD-5076', customer_id: 'CUST-1036', order_date: '2026-01-22', category: 'Electronics', quantity: 1, unit_price: 620.00, discount_percent: 0.05, total_amount: 589.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5077', customer_id: 'CUST-1001', order_date: '2026-02-03', category: 'Beauty', quantity: 3, unit_price: 70.00, discount_percent: 0.00, total_amount: 210.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5078', customer_id: 'CUST-1026', order_date: '2026-02-14', category: 'Electronics', quantity: 1, unit_price: 890.00, discount_percent: 0.00, total_amount: 890.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5079', customer_id: 'CUST-1006', order_date: '2026-02-20', category: 'Fitness', quantity: 2, unit_price: 140.00, discount_percent: 0.10, total_amount: 252.00, payment_method: 'Credit Card', order_status: 'Delivered' },
  { order_id: 'ORD-5080', customer_id: 'CUST-1013', order_date: '2026-02-28', category: 'Electronics', quantity: 1, unit_price: 540.00, discount_percent: 0.00, total_amount: 540.00, payment_method: 'UPI', order_status: 'Delivered' }
];

class AnalyticsEngine {
  constructor() {
    this.customers = RAW_CUSTOMERS;
    this.orders = RAW_ORDERS.filter(o => o.order_status === 'Delivered');
  }

  filterData({ category = 'all', channel = 'all', searchQuery = '' }) {
    let filteredOrders = this.orders;
    let filteredCustomers = this.customers;

    // Filter by channel
    if (channel !== 'all') {
      const allowedCustIds = new Set(
        filteredCustomers.filter(c => c.acquisition_channel === channel).map(c => c.customer_id)
      );
      filteredOrders = filteredOrders.filter(o => allowedCustIds.has(o.customer_id));
      filteredCustomers = filteredCustomers.filter(c => c.acquisition_channel === channel);
    }

    // Filter by category
    if (category !== 'all') {
      filteredOrders = filteredOrders.filter(o => o.category === category);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchingCustIds = new Set(
        filteredCustomers.filter(c => 
          c.customer_name.toLowerCase().includes(q) || 
          c.customer_id.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
        ).map(c => c.customer_id)
      );
      filteredOrders = filteredOrders.filter(o => matchingCustIds.has(o.customer_id));
    }

    return { filteredOrders, filteredCustomers };
  }

  computeKPIs(orders, customers) {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
    const totalOrders = orders.length;
    const activeBuyerIds = new Set(orders.map(o => o.customer_id));
    const activeCustomers = activeBuyerIds.size;
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Repeat purchase rate
    const orderCountPerCust = {};
    orders.forEach(o => {
      orderCountPerCust[o.customer_id] = (orderCountPerCust[o.customer_id] || 0) + 1;
    });
    const repeatCount = Object.values(orderCountPerCust).filter(cnt => cnt > 1).length;
    const repeatRate = activeCustomers > 0 ? (repeatCount / activeCustomers) * 100 : 0;
    const clv = activeCustomers > 0 ? totalRevenue / activeCustomers : 0;

    return {
      totalRevenue,
      totalOrders,
      activeCustomers,
      aov,
      repeatRate,
      clv
    };
  }

  computeRFM(orders, customers) {
    if (orders.length === 0) return [];

    // Reference snapshot: latest order date in dataset
    const dates = orders.map(o => new Date(o.order_date).getTime());
    const maxDate = new Date(Math.max(...dates));

    const customerMap = {};
    customers.forEach(c => {
      customerMap[c.customer_id] = c;
    });

    // Aggregate R, F, M
    const rfmRaw = {};
    orders.forEach(o => {
      const id = o.customer_id;
      if (!rfmRaw[id]) {
        rfmRaw[id] = {
          customerId: id,
          customer: customerMap[id] || { customer_name: 'Unknown', country: 'N/A', acquisition_channel: 'Direct' },
          lastOrderDate: o.order_date,
          frequency: 0,
          monetary: 0
        };
      }
      rfmRaw[id].frequency += 1;
      rfmRaw[id].monetary += o.total_amount;
      if (new Date(o.order_date) > new Date(rfmRaw[id].lastOrderDate)) {
        rfmRaw[id].lastOrderDate = o.order_date;
      }
    });

    const rfmList = Object.values(rfmRaw).map(item => {
      const diffMs = maxDate - new Date(item.lastOrderDate);
      const recencyDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      return {
        ...item,
        recency: recencyDays
      };
    });

    // Score quintiles
    // Sort for R: lower recency is better (higher score)
    const sortedR = [...rfmList].sort((a, b) => a.recency - b.recency);
    const sortedF = [...rfmList].sort((a, b) => a.frequency - b.frequency);
    const sortedM = [...rfmList].sort((a, b) => a.monetary - b.monetary);

    const n = rfmList.length;
    const getScore = (idx) => Math.min(5, Math.max(1, Math.ceil(((idx + 1) / n) * 5)));

    const rScores = {};
    const fScores = {};
    const mScores = {};

    sortedR.forEach((item, idx) => {
      // invert rank so least days gets 5
      rScores[item.customerId] = 6 - getScore(idx);
    });
    sortedF.forEach((item, idx) => {
      fScores[item.customerId] = getScore(idx);
    });
    sortedM.forEach((item, idx) => {
      mScores[item.customerId] = getScore(idx);
    });

    return rfmList.map(item => {
      const r = rScores[item.customerId] || 3;
      const f = fScores[item.customerId] || 3;
      const m = mScores[item.customerId] || 3;

      let segment = 'Casual Shoppers';
      let badgeColor = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      let actionRecommendation = 'Standard promotional emails';

      if (r >= 4 && f >= 4 && m >= 4) {
        segment = 'Champions / VIP';
        badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700';
        actionRecommendation = 'Exclusive rewards & concierge access';
      } else if (r >= 3 && f >= 3) {
        segment = 'Loyal Customers';
        badgeColor = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300';
        actionRecommendation = 'Upsell premium cross-category tiers';
      } else if (r >= 4 && f <= 2) {
        segment = 'Promising New';
        badgeColor = 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300';
        actionRecommendation = 'Onboarding email series with discount';
      } else if (r <= 2 && f >= 3) {
        segment = 'At Risk (High Value Churn)';
        badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold';
        actionRecommendation = 'Urgent win-back survey & re-engagement';
      } else if (r <= 2 && f <= 2) {
        segment = 'Hibernating';
        badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
        actionRecommendation = 'Re-activation campaign or discount code';
      }

      return {
        ...item,
        rScore: r,
        fScore: f,
        mScore: m,
        rfmCombined: `${r}${f}${m}`,
        segment,
        badgeColor,
        actionRecommendation
      };
    }).sort((a, b) => b.monetary - a.monetary);
  }

  computeCohortRetention(orders) {
    // 1. Find customer first purchase month
    const firstMonthMap = {};
    orders.forEach(o => {
      const month = o.order_date.substring(0, 7); // 'YYYY-MM'
      if (!firstMonthMap[o.customer_id] || month < firstMonthMap[o.customer_id]) {
        firstMonthMap[o.customer_id] = month;
      }
    });

    // 2. Map orders to cohort and index
    const cohortMap = {}; // { 'YYYY-MM': { size: Set(), months: { 0: Set(), 1: Set(), ... } } }

    orders.forEach(o => {
      const cohort = firstMonthMap[o.customer_id];
      if (!cohort) return;

      if (!cohortMap[cohort]) {
        cohortMap[cohort] = {
          customers: new Set(),
          indices: {}
        };
      }
      cohortMap[cohort].customers.add(o.customer_id);

      const [cYear, cMonth] = cohort.split('-').map(Number);
      const [oYear, oMonth] = o.order_date.substring(0, 7).split('-').map(Number);
      const periodIdx = (oYear - cYear) * 12 + (oMonth - cMonth);

      if (periodIdx >= 0) {
        if (!cohortMap[cohort].indices[periodIdx]) {
          cohortMap[cohort].indices[periodIdx] = new Set();
        }
        cohortMap[cohort].indices[periodIdx].add(o.customer_id);
      }
    });

    // 3. Calculate percentages
    const sortedCohorts = Object.keys(cohortMap).sort().slice(0, 7);
    return sortedCohorts.map(cohort => {
      const cohortSize = cohortMap[cohort].customers.size;
      const retentionPcts = [];

      for (let i = 0; i <= 5; i++) {
        const activeInMonth = cohortMap[cohort].indices[i]?.size || 0;
        const pct = cohortSize > 0 ? ((activeInMonth / cohortSize) * 100).toFixed(1) : 0;
        retentionPcts.push({
          period: i,
          count: activeInMonth,
          pct: parseFloat(pct)
        });
      }

      return {
        cohort,
        cohortSize,
        retentionPcts
      };
    });
  }

  computeMonthlyRevenue(orders) {
    const monthly = {};
    orders.forEach(o => {
      const m = o.order_date.substring(0, 7);
      if (!monthly[m]) {
        monthly[m] = { revenue: 0, orders: 0 };
      }
      monthly[m].revenue += o.total_amount;
      monthly[m].orders += 1;
    });

    const sortedMonths = Object.keys(monthly).sort();
    return {
      labels: sortedMonths.map(m => {
        const [y, mon] = m.split('-');
        const date = new Date(y, mon - 1);
        return date.toLocaleString('default', { month: 'short', year: '2-digit' });
      }),
      revenue: sortedMonths.map(m => Math.round(monthly[m].revenue)),
      orders: sortedMonths.map(m => monthly[m].orders)
    };
  }

  computeCategoryShare(orders) {
    const catMap = {};
    orders.forEach(o => {
      if (!catMap[o.category]) {
        catMap[o.category] = { revenue: 0, count: 0 };
      }
      catMap[o.category].revenue += o.total_amount;
      catMap[o.category].count += 1;
    });

    const labels = Object.keys(catMap);
    return {
      labels,
      revenue: labels.map(l => Math.round(catMap[l].revenue)),
      aov: labels.map(l => Math.round(catMap[l].revenue / catMap[l].count))
    };
  }

  computeChannelShare(orders, customers) {
    const custChannelMap = {};
    customers.forEach(c => {
      custChannelMap[c.customer_id] = c.acquisition_channel;
    });

    const channelMap = {};
    orders.forEach(o => {
      const ch = custChannelMap[o.customer_id] || 'Direct';
      channelMap[ch] = (channelMap[ch] || 0) + o.total_amount;
    });

    const labels = Object.keys(channelMap);
    return {
      labels,
      data: labels.map(l => Math.round(channelMap[l]))
    };
  }
}
