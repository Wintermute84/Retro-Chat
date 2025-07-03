# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🕹️ Retro Chat

A real-time web chat app inspired by early 2000s internet aesthetics — complete with pixelated images, sound effects, and a dial-up vibe. Built using **React**, **TailwindCSS**, and **Socket.IO**, this chat only works while you're online — just like the old days.

---

## ✨ Features

- 🎨 **Retro-futuristic UI** with themes
- 💬 Real-time messaging via WebSockets
- 🧍‍♂️ Custom avatars and usernames (stored locally)
- 🔈 Classic sound effects (message, connect, etc.)
- 🔃 Fake loading screens + boot-up sequence
- 🌌 Temporary chat rooms (create/join/leave)
- ⚡ Auto-reconnect + disconnect detection
- 👥 View users in the global lobby
- 🚫 Messages aren't stored — chat disappears if you're offline

---

## 🛠️ Technologies Used

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + Socket.IO
- **Sound:** Howler.js
- **Styling Tools:** clsx, custom themes

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- npm or yarn

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Wintermute84/Retro-Chat.git
cd retro-chat

# Install dependencies
npm install
