# InterviewPrep — AI-Powered Interview Preparation Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://interview-prep-frontend-ohbr.onrender.com)

InterviewPrep is a full-stack **AI-powered interview preparation platform** that analyzes a candidate's resume against a target job description and generates a personalized interview preparation report.

The platform uses **Google Gemini LLM** to generate structured interview insights, including job match scores, technical and behavioral questions, skill-gap analysis, and a personalized preparation roadmap.

## 🚀 Features

- **User Authentication**
  - User registration and login
  - JWT-based authentication
  - HTTP-only cookie sessions
  - Protected routes
  - Secure password hashing with bcrypt
  - Token blacklisting on logout

- **Resume Analysis**
  - Upload resumes in PDF format
  - Extract resume content using PDF parsing
  - Compare resume with a target job description

- **AI-Powered Interview Preparation**
  - Google Gemini LLM integration
  - Structured JSON AI responses
  - Resume/job match score
  - Technical interview questions
  - Behavioral interview questions
  - Skill-gap analysis
  - Personalized day-wise preparation roadmap

- **Interview Reports**
  - Store generated reports in MongoDB
  - View previous interview reports
  - Retrieve reports for authenticated users

- **AI Resume Generation**
  - Generate job-tailored resumes
  - Convert generated HTML into PDF
  - Download the generated resume

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Sass
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- pdf-parse
- Puppeteer

### AI

- Google Gemini
- `@google/genai`
- Structured JSON response schemas

## 🏗️ Architecture

```text
React Frontend
      │
      ▼
Express REST API
      │
      ├── Authentication Middleware
      │
      ├── File Upload / PDF Processing
      │
      ├── AI Service
      │       │
      │       ▼
      │   Google Gemini
      │
      └── MongoDB / Mongoose
              │
              ▼
       Interview Reports
```

The backend follows a modular structure separating:

**Routes → Controllers → Middleware → Services → Models**

The frontend uses feature-based organization with separate pages, hooks, contexts, and API services.

## 🔄 How It Works

```text
1. User logs in
       ↓
2. Uploads resume PDF
       ↓
3. Provides self-description
       ↓
4. Provides target job description
       ↓
5. Backend extracts resume text
       ↓
6. Gemini analyzes the candidate against the job
       ↓
7. Structured interview report is generated
       ↓
8. Report is stored in MongoDB
       ↓
9. User views personalized preparation plan
```

## 📊 AI-Generated Report

The Gemini response is structured into specific sections rather than being returned as unstructured text.

The report includes:

- Match Score
- Technical Questions
- Behavioral Questions
- Skill Gaps
- Preparation Roadmap

This structured response allows the frontend to reliably display each part of the generated analysis.

## 🔐 Security

The application implements:

- bcrypt password hashing
- JWT authentication
- HTTP-only cookies
- Protected API routes
- User-specific report access
- Token blacklisting during logout
- Environment variables for sensitive credentials

## 💻 Local Setup

### Prerequisites

- Node.js
- MongoDB
- Google Gemini API key

### Clone the repository

```bash
git clone https://github.com/Himanshu-yarr/Interview-prep.git
cd Interview-prep
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the local frontend URL provided by Vite.

## 📁 Project Structure

```text
Interview-prep/
│
├── frontend/
│   └── src/
│       ├── features/
│       │   ├── auth/
│       │   └── interview/
│       ├── App.jsx
│       ├── app.routes.jsx
│       └── main.jsx
│
└── backend/
    ├── server.js
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        └── services/
```

## 🌐 Live Demo

**[Try InterviewPrep →](https://interview-prep-frontend-ohbr.onrender.com)**

## 👨‍💻 Author

**Himanshu Joshi**

[GitHub](https://github.com/Himanshu-yarr) · [LinkedIn](http://www.linkedin.com/in/himanshujoc)
