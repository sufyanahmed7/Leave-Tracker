# Leave-Tracker – Pixako Leave Counter

A modern web app that helps Pixako employees track and manage their leave records.  
Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Material UI**, and **Clerk Authentication**.

## 🚀 Features

- 🔐 **Clerk Authentication** – secure login & user management  
- 📊 **Auto leave tracking** – fetch and update leaves by user ID  
- 🧠 **Smart counters** – casual, medical, and annual leave progress  
- 💾 **MongoDB + Express API** – connected backend for leave data  
- 🎨 **Responsive UI** – built using TailwindCSS & MUI components  

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js (App Router) + TypeScript |
| UI | TailwindCSS + Material UI |
| Auth | Clerk |
| Backend | Express + MongoDB |
| Hosting | Vercel / Render / MongoDB Atlas |

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/Leave-Tracker.git
cd Leave-Tracker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
```bash
Create a .env.local file and add:

NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4️⃣ Run the app
```bash
npm run dev
Visit http://localhost:3000
```

### 🧑‍💼 Folder Structure
```bash
/backend
  └── src/
      ├── models/Leave.js
      ├── routes/leaves.js
/frontend
  ├── app/
  ├── components/
  └── LeaveCounter.tsx
```

### 🧑‍💻 Contributors

| Name       | Role              |
| ---------- | ----------------- |
| **Ammar**  | Software Engineer |
| **Sufyan** | Software Engineer |
| **Haris**  | Software Engineer |

### 📜 License

This project is licensed under the MIT License.

---

### 💡 Future Improvements

- Add leave approval flow for managers
- Integrate calendar-based leave planning
- Mobile-first dashboard

---
