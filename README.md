# 📬 InboxIQ
**AI-powered customer support dashboard** that helps small businesses triage incoming emails, generate smart replies, and collaborate in real time — all using modern open-source tools and AI.

## 🚀 Features

- 🤖 **AI Email Classification**  
  Automatically tags emails as **Urgent**, **Question**, **Feedback**, or **Spam** using Google Gemini API.

- 😠 **Sentiment Analysis**  
  Detects tone (e.g., **Angry**, **Neutral**, **Positive**) to help prioritize customer pain points.

- ✍️ **Smart Reply Suggestions**  
  Instantly generate response drafts in a customizable tone (e.g., **Friendly**, **Professional**).

- 👥 **Real-Time Collaboration**  
  See which emails your teammates are working on (via Supabase Realtime presence tracking).

- 📊 **Priority Inbox**  
  AI ranks emails based on urgency + sentiment. Color-coded for quick scanning.

## 🧠 Tech Stack

| Category      | Tech                        | Purpose |
|---------------|-----------------------------|---------|
| Frontend      | React, Vite, Tailwind CSS   | Fast UI dev & styling |
| Backend       | Supabase (PostgreSQL + Auth)| Database, Auth, Realtime |
| AI / NLP      | Google Gemini API / Hugging Face | Email classification, sentiment, replies |
| Hosting       | Vercel                      | Easy, free-tier deployments |
| Realtime      | Supabase Realtime           | Live updates + user presence |

## 🛠️ Setup Instructions

**Clone the repo** 
git clone https://github.com/raafiafatima/inboxiq.git
cd inboxiq

**Install Dependencies**
npm install 
