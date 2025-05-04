# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Portfolio App

## 📖 Project Description

Portfolio App is a web application designed to showcase projects and technologies used by a developer. It provides an interactive and dynamic way to filter projects based on technologies. The application includes a contact form for inquiries and feedback.

## 🏗️ Technical Architecture

The application follows a **client-server** architecture:

1. **Frontend:** Built with React for dynamic UI rendering.
2. **Backend:** Uses Strapi as a headless CMS to manage projects and technologies.
3. **Database:** Strapi utilizes a database (e.g., SQLite, PostgreSQL, MongoDB) to store data.
4. **Email Service:** EmailJS is integrated for form submission notifications.
5. **Hosting & Deployment:** The frontend can be deployed on **Vercel, Netlify**, or any static hosting provider, while the Strapi backend can be deployed on **Heroku, DigitalOcean**, or a dedicated server.

## 🚀 Technologies Used

- **Frontend**
  - React 19.1.0
  - React Router
  - CSS for styling
- **Backend**
  - Strapi (Headless CMS)
  - Node.js with Express
- **Database**
  - SQLite / PostgreSQL / MongoDB (depending on configuration)
- **APIs & Services**
  - EmailJS (for email notifications)
  - REST API (Strapi-based)
- **Deployment**
  - Vercel / Netlify (Frontend)
  - Heroku / DigitalOcean / Local server (Backend)

## ⚙️ Installation Guide

### Prerequisites:

- Node.js & npm installed
- Strapi requires a database (SQLite by default)

### Steps:

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/portfolio-app.git
   ```



- Install dependencies
  cd portfolio-app
  npm install
- Set up environment variables
- Create a .env file and define:
  VITE_TEMPLATE_ID=your_template_id
  VITE_SERVICE_ID=your_service_id
  VITE_PUBLIC_KEY=your_public_key
- Run the backend (Strapi)
  cd backend
  npm run develop
- Run the frontend
  cd frontend
  npm run dev

- Open http://localhost:3000 to view the app.
  🚀 Deployment Guide
  Frontend Deployment
- Build the React App
  npm run build
- Deploy to Netlify/Vercel
- Upload the build/ folder or link your GitHub repository.
  Backend Deployment (Strapi)
- Configure database settings in config/database.js.
- Deploy on Heroku/DigitalOcean:
  git push heroku main

🗂️ Database Structure (Strapi Tables)
The backend uses Strapi collections:

- Projects
- title: String
- description: Text
- cover: Image
- url: String (GitHub link)
- technologies: Relationship (Many-to-Many with Technologies)
- Technologies
- name: String
- icon: Image
- projects: Relationship (Many-to-Many with Projects)
- Contact Messages
- name: String
- email: String
- subject: String
- message: Text

Feel free to modify this README.md file to fit your specific requirements! Let me know if you need any adjustments. 🚀😃
