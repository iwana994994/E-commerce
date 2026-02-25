## 🚨 Inventory Automation (Low Stock Alerts) — n8n + Gmail

When an order is successfully paid via Stripe, the backend:
1) Saves the order
2) Decreases product stock atomically (`$inc`)
3) If stock falls to/below the configured `lowStockThreshold`, it triggers an automation workflow (n8n webhook)
4) n8n sends an email notification to the admin (Gmail node)

### Why this is cool (for real-world apps)
- Prevents overselling (stock never goes negative)
- Alerts the admin automatically when inventory is low
- Demonstrates real automation integration (not just CRUD)

---

### 🛒 1) Real checkout → order created
<img width="1887" height="711" alt="Screenshot (303)" src="https://github.com/user-attachments/assets/c47db1fb-e61b-4d84-baa4-ac99aa258f2d" />
<img width="1920" height="696" alt="Screenshot (304)" src="https://github.com/user-attachments/assets/aafe7a05-bae8-48bd-9275-895eb8ab9d1f" />

---

### 📦 2) Low stock threshold logic
Example: Stock = 2, Low Stock Threshold = 1  
When a purchase reduces stock to 1, the automation is triggered.

<img width="1920" height="811" alt="Screenshot (307)" src="https://github.com/user-attachments/assets/10916609-8537-4393-9ca3-199cd58a9998" />


---

### 🤖 3) n8n workflow (Webhook → Gmail)
The backend sends data to n8n via webhook:
`productId, name, stock, lowStockThreshold, time`

<img width="753" height="539" alt="Screenshot (305)" src="https://github.com/user-attachments/assets/3d75ab1a-bfcd-4bef-8ea6-e713fd4587c1" />


---

### ✉️ 4) Admin email alert received
<img width="786" height="289" alt="Screenshot (306)" src="https://github.com/user-attachments/assets/ee820838-26f1-4bcf-a86d-490032768a76" />
