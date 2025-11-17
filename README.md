📘 Personal Finance Automations – n8n + AI + Google Sheets

Two powerful automations designed to simplify personal finance management by leveraging n8n, AI (GPT-5), and Google Sheets as the central data store.

🟦 Automation 1 – Automatic Expense Classification

(Gmail → n8n → Google Sheets)

Automatically extracts, classifies, and logs bank expenses received via email (Banco Santander notifications).

🧠 Overview

This workflow reads incoming bank notifications, determines whether a transaction is an expense or an income, applies both rule-based logic and AI classification, and stores the result in a structured Google Sheets ledger.

🔷 Key Features
🔹 Real-time email ingestion (Gmail Trigger)
🔹 Expense vs Income detection
🔹 Category classification using GPT-5
🔹 Rule-based overrides (time ranges, keywords, vendors)
🔹 Automatic logging into Google Sheets
🔹 Supports categories like OCIO, COMIDA, DEPORTE, MENSUAL, etc.

🔧 Tech Stack

n8n

Gmail API

Google Sheets API

OpenAI GPT-5

Regex + Logical Rules

🗂️ Output Example (Google Sheets)
Date	Description	Amount	Category	Type
2025-11-17	MERCADONA	12.50	COMIDA	Expense
2025-11-17	Payroll Santander	1,985.00	Salary	Income
🟩 Automation 2 – Debt Tracking AI

(Telegram → n8n → Google Sheets)

Converts natural-language messages into structured debt entries.

🧠 Overview

Users send Telegram messages like:

“Álvaro owes me 5€ for dinner yesterday”

The automation extracts:

Debtor

Creditor

Amount

Reason

Date

…and logs everything in Google Sheets.

🟩 Key Features
🟢 Telegram Bot ingestion
🟢 AI entity extraction (amount, persons, reason, date)
🟢 Supports multi-person debts
🟢 Fallback mode (never breaks → stores raw messages)
🟢 Google Sheets structured output

🔧 Tech Stack

Telegram Bot API

n8n

Google Sheets API

OpenAI GPT-5

Custom rule-based fallback logic

🗂️ Output Example (Google Sheets)
Date	Debtor	Creditor	Amount	Reason
2025-11-17	Álvaro	Ángel	5.00	Dinner
2025-11-17	Dani	Ángel	10.00	Drinks
🟣 Architecture (High-Level)
Expense Automation
Gmail Trigger
      ↓
Classify Movement (IF node)
      ├── Expense → AI Category Classification → Append to Expenses Sheet
      └── Income  → Append to Income Sheet

Debt Automation
Telegram Trigger
      ↓
Detect Message Type (text/audio)
      ↓
GPT-5 AI Extraction
      ├── Success → Append Structured Row
      └── Fallback → Append Raw Log Row

🧭 Roadmap

Add voice-to-text processing for audio messages

Build Looker Studio dashboard

Add API endpoints / webhooks

Real-time sync with Notion or Firebase

Automatic monthly financial report generation

📄 License

This project is for personal use.
The automations may not be sold or commercialized without permission.

🤝 Contributions

Feel free to open issues or propose improvements!
