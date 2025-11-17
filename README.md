<h1 align="center">💸 Personal Finance Automations – n8n + AI + Google Sheets</h1>

<p align="center">
Two full end-to-end automations built with <b>n8n</b>, <b>GPT-5</b>, and <b>Google Sheets</b>  
to make personal finance management effortless, intelligent, and fully automated. ⚡
</p>

---

## 🧠 Overview  
This repository includes two automations:

- **Automatic Expense Classification** (Gmail → n8n → Sheets)  
- **Debt & Owed Money Tracker** (Telegram → n8n → Sheets)

Both workflows combine **rule-based logic**, **AI extraction**, and **clean data storage**.

---

## 🟦 Automation 1 – Automatic Expense Classification  
<h3>Gmail → n8n → Google Sheets</h3>

> Processes bank emails, detects expense/income, applies AI categorization, and logs everything cleanly in Sheets.

### 🔷 Key Features  
- Real-time Gmail ingestion  
- Expense vs Income detection  
- **GPT-5** AI categorization (OCIO, COMIDA, DEPORTE, MENSUAL…)  
- Vendor keyword matching (BAR, PUB, KFC, BASIC-FIT, etc.)  
- Time-based rules (23:00–06:00 → OCIO)  
- Automatic Google Sheets logging  

### 🗂 Output Example  
| Date | Description | Amount | Category | Type |
|------|-------------|--------|----------|------|
| 2025-11-17 | MERCADONA | 12.50 | COMIDA | Expense |
| 2025-11-17 | Payroll | 1985.00 | Salary | Income |

---

## 🟩 Automation 2 – Debt Tracking AI  
<h3>Telegram → n8n → Google Sheets</h3>

> Reads natural-language messages like:  
> **"Álvaro owes me 5€ for dinner"**  
> Extracts all fields and logs structured debt entries.

### 🔷 Key Features  
- Telegram bot ingestion (text & audio-ready)  
- **GPT-5 entity extraction:** debtor, creditor, reason, date, amount  
- Supports multi-person debts  
- Fallback (never fails — logs raw text)  
- Outputs structured rows to Google Sheets  

### 🗂 Output Example  
| Date | Debtor | Creditor | Amount | Reason |
|------|--------|----------|--------|--------|
| 2025-11-17 | Álvaro | Ángel | 5.00 | Dinner |
| 2025-11-17 | Dani | Ángel | 10.00 | Drinks |

---

## 🟣 Architecture  
### 🟦 Expense Classification  


This project is for personal, non-commercial use.
You may not sell or commercialize these automations without permission.

🤝 Contributions

Issues and pull requests are welcome. Feel free to collaborate!
