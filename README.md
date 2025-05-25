# 🍽️ Mess Registration Web App

A full-stack web application for mess registration and management at IIT Hyderabad. Built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Firebase authentication** and **Tailwind CSS** for a clean UI.

---

## 🚀 Features

###  Authentication
- Google Sign-In using **Firebase Auth**.
- Only allows **IIT Hyderabad email addresses** (`@iith.ac.in`).

###  User Portal
- Register for **Mess 1** or **Mess 2**.
- Switch mess by unregistering and registering again.
- View the **daily menu** based on your mess(to be updated)
- Persistent login using Firebase auth tokens.
- Limited users allowed per mess.

### 🛠️ Admin Portal
- View list of registered users under each mess.
- Admin-only access(currently handled by simple frontend)

---

##  Tech Stack

### Backend (`/server`)
- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS

### Frontend (`/client`)
- React + Vite
- Tailwind CSS
- Firebase Authentication

---


---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/AdisheshBalaji/mess-registration-app.git
cd mess-registration-app
```

---

### 2. Backend Setup (`/server`)
```bash
cd server
npm install
node .
```

> Required dependencies:
- express
- mongoose
- cors
- dotenv


---

### 3. Frontend Setup (`/client`)
```bash
cd ../client
npm install
npm run dev
```

> Required dependencies:
- react
- react-router-dom
- firebase
- axios
- tailwindcss
- vite

---




##  Firebase Configuration

- Google Sign-In enabled on Firebase.
- Domain restriction applied to allow only `@iith.ac.in` emails.
- Firebase config stored in frontend and initialized on app load.

---

## Future Improvements

- Update mess for each day based on real IITH menu.
- Enhanced admin dashboard with CRUD controls.
- Email notifications for users.

---
