📘 Personal Finance Automations – n8n + AI + Google Sheets

Two complete automations designed to simplify and centralize personal finance management using n8n, AI (GPT-5) and Google Sheets.

🟦 Automation 1 – Automatic Expense Classification
(Gmail → n8n → Google Sheets)

Automatically extracts, classifies, and logs bank expenses received via email notifications.

🧠 Overview

This workflow processes incoming bank emails, determines whether each movement is an expense or an income, applies rule-based logic + AI classification, and logs everything into Google Sheets.

🔷 Key Features
🔹 Real-time email ingestion (Gmail Trigger)
🔹 Automatic Expense vs Income detection
🔹 AI category classification using GPT-5
🔹 Rule-based overrides (hour rules, vendors, keywords)
🔹 Google Sheets logging in structured format
🔹 Supports categories like OCIO, COMIDA, DEPORTE, MENSUAL, etc.

🔧 Tech Stack

n8n

Gmail API

Google Sheets API

OpenAI GPT-5

Custom rule-based classification

🗂️ Output Example
Date	Description	Amount	Category	Type
2025-11-17	MERCADONA	12.50	COMIDA	Expense
2025-11-17	Payroll Santander	1,985.00	Salary	Income
🟩 Automation 2 – Debt Tracking AI
(Telegram → n8n → Google Sheets)

Converts natural-language messages into structured debt records.

🧠 Overview

A Telegram bot receives natural-language messages like:

“Álvaro owes me 5€ for dinner yesterday.”

The automation extracts all entities and logs them in a debt ledger.

🟩 Key Features
🟢 Telegram Bot ingestion (text + future audio support)
🟢 AI-based extraction: amount, debtor, creditor, reason, date
🟢 Supports multi-person debts
🟢 Fallback mode for unrecognized messages
🟢 Google Sheets structured records

🔧 Tech Stack

Telegram Bot API

n8n

Google Sheets API

OpenAI GPT-5

Fallback rule-based parser

🗂️ Output Example
Date	Debtor	Creditor	Amount	Reason
2025-11-17	Álvaro	Ángel	5.00	Dinner
2025-11-17	Dani	Ángel	10.00	Drinks
🟣 Architecture Overview
🟦 Expense Classification
Gmail Trigger
        ↓
Classify Movement (IF node)
        ├── Expense → AI Category Classification → Append to Expenses Sheet
        └── Income  → Append to Income Sheet

🟩 Debt Tracking
Telegram Trigger
        ↓
Detect Message Type (text/audio)
        ↓
GPT-5 AI Extraction
        ├── Success → Append Structured Row
        └── Fallback → Append Raw Log Row

🧭 Roadmap

Voice-to-text support for audio messages

Looker Studio dashboard

Notion / Firebase real-time sync

Monthly financial report generator

Export endpoints (REST API)

📄 License

This project is for personal, non-commercial use.
You may not sell or commercialize these automations without permission.

🤝 Contributions

Issues and pull requests are welcome. Feel free to collaborate!
