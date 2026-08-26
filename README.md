# Full-Stack Authentication Flow

This repository contains a fully decoupled web application demonstrating secure client-server data transmission. It was built specifically to highlight clear API routing, payload handling, and visible data logging for debugging and inspection.

## 🏗 Architecture
The project is split into two distinct directories:
*   **/frontend**: A Single Page Application (SPA) built with React, Vite, and Tailwind CSS.
*   **/backend**: A REST API built with Node.js and Express.

## ✨ Key Features
*   **Explicit Data Logging:** Utilizes Axios interceptors on the frontend and Express middleware on the backend to clearly trace data payloads from the browser console to the server terminal.
*   **React Router Navigation:** Smooth client-side routing between `/login` and `/signup` without page reloads.
*   **CORS Configured:** Secure cross-origin resource sharing implemented to allow isolated frontend and backend communication.
*   **Responsive UI:** Styled entirely with Tailwind CSS utility classes.

## 🛠 Tech Stack
**Frontend:** React, Vite, Tailwind CSS, Axios, React Router DOM  
**Backend:** Node.js, Express, CORS

## 🚀 Local Setup Instructions

### 1. Start the Backend Server
Open a terminal and navigate to the project root:
```bash
cd backend
npm install
npm start
```
*The server will run on http://localhost:5000*

### 2. Start the Frontend Application
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The application will run on http://localhost:5173 (or as indicated by Vite)*

## 🌍 Environment Variables
If running locally, ensure you have a `.env` file in the `frontend` folder pointing to your backend URL:
`VITE_API_URL=http://localhost:5000`

## ☁️ Deployment
*   **Frontend** is configured for deployment on Vercel (includes `vercel.json` for React Router support).
*   **Backend** is configured for deployment on Render.
