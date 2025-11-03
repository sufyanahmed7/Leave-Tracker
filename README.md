# 🏖️ Leave Tracker – Leave Counter

A modern web app that helps organizations and employees **track and manage their leave records** — including **casual**, **medical**, and **annual** leaves.
Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Material UI**, and **Clerk Authentication**.

---

## 🚀 Features

* 🔐 **Clerk Authentication** – secure login and user management
* 📊 **Automatic Leave Tracking** – fetch and update leave data by user ID
* 🧠 **Smart Counters** – track casual, medical, and annual leave usage
* 💾 **MongoDB + Express API** – connected backend for managing leave data
* 💻 **Responsive UI** – modern design built using TailwindCSS & MUI
* ⚡ **PWA Support** – integrated with **Next-PWA**; manifest, icons, and service worker are automatically generated for caching and offline functionality

---

## 🧱 Tech Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| **Frontend**       | Next.js (App Router) + TypeScript |
| **UI**             | TailwindCSS + Material UI         |
| **Authentication** | Clerk                             |
| **Backend**        | Express + MongoDB                 |
| **Hosting**        | Vercel / Render / MongoDB Atlas   |
| **PWA**            | Next-PWA                          |

---

## 🗂️ Folder Structure

```bash
/backend
  └── src/
      ├── models/Leave.js
      ├── routes/leaves.js

/frontend
  ├── app/api/leaves/[userId]/route.ts
  ├── app/components/features/pwa/ServiceWorkerRegister.tsx
  ├── app/components/leave/LeaveCounter.tsx
  ├── app/components/leave/LeaveHistoryModal.tsx
  ├── app/components/leave/LeaveSummaryCard.tsx
  ├── app/components/leave/LeaveTypeCard.tsx
  ├── app/components/leave/loading.tsx
  ├── app/components/leave/ResetConfirmDialog.tsx
  ├── app/dashboard/page.tsx
  ├── app/lib/constants/leave.constants.ts
  ├── app/lib/hooks/useLeaveManager.ts
  ├── app/lib/types/leave.types.ts
  ├── app/lib/utils/leave.utils.ts
  ├── app/services/leave.service.ts
  ├── app/signin/[[...signin]]/page.tsx
  └── app/signup/[[...signup]]/page.tsx
```

---

## 👨‍💻 Contributors

| Name       | Role              | Description                                                                                      |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| **Sufyan** | Software Engineer | App founder; developed the core UI and architecture. [GitHub](https://github.com/sufyanahmed7)   |
| **Haris**  | Software Engineer | Implemented authentication, fixed bugs, and improved UI. [GitHub](https://github.com/harrisrais) |
| **Ammar**  | Software Engineer | Integrated full PWA functionality. [GitHub](https://github.com/MuhammadAmmarAtique)              |

---

## 📜 License

This project is licensed under the **MIT License**.


