const resume = `ALEX MORGAN
Full Stack Developer
alex.morgan@example.com | +1 (555) 019-2834 | San Francisco, CA
https://alexmorgan.dev | linkedin.com/in/alexmorgan-dev | github.com/alexmorgan-dev

PROFESSIONAL SUMMARY
Full Stack Developer with 3+ years of experience building scalable web applications using the MERN stack. Proficient in designing RESTful APIs, optimizing database queries, and integrating AI services to enhance user experience.

TECHNICAL SKILLS

Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3

Frontend: React.js, Redux Toolkit, Tailwind CSS, Next.js

Backend: Node.js, Express.js, REST APIs, GraphQL

Databases: MongoDB, PostgreSQL, Redis

Tools & Cloud: Git, Docker, AWS (S3), Postman, Vercel

WORK EXPERIENCE

Software Engineer — TechWave Solutions (San Francisco, CA)
Jan 2024 – Present

Architected and implemented responsive frontend interfaces using React and Tailwind CSS, increasing mobile user engagement by 25%.

Designed and maintained backend microservices with Node.js and Express, handling over 100k daily API requests.

Integrated third-party AI APIs to automate content generation workflows for end users.

Junior Web Developer — Nexus Web Labs (Austin, TX)
Jun 2022 – Dec 2023

Developed reusable React UI components and managed global application state using Redux Toolkit.

Optimized MongoDB aggregations and index strategies, reducing API response times by 30%.

Collaborated with cross-functional teams to deliver sprint objectives using Agile methodologies.

PROJECTS

AI Resume Builder | React, Node.js, Express, MongoDB, Tailwind CSS

Full-stack web application that dynamically generates polished resumes based on user inputs and AI recommendations.

Implemented secure JWT user authentication and automated media management with Cloudinary.

Constructed structured JSON schema validation to sanitize input data before streaming to AI models.

DevConnect Community | React, Node.js, Socket.io, PostgreSQL

Real-time social portal for software engineers to share posts, collaborate on projects, and message each other.

Integrated WebSockets via Socket.io for instantaneous messaging and activity notifications.

EDUCATION

Bachelor of Science in Computer Science (GPA: 3.8)
University of California, Berkeley (Aug 2018 – May 2022)

CERTIFICATIONS

AWS Certified Developer – Associate (Amazon Web Services, Sep 2023)

MongoDB Certified Developer Associate (MongoDB, Mar 2023)`

const selfDescription = `Full Stack Developer specializing in the MERN stack and AI API integrations, dedicated to building fast, scalable web applications that deliver seamless user experiences.

Resume Profile Summary (Short & Direct)
Full Stack Developer with 3+ years of experience building responsive web applications using React, Node.js, Express, and MongoDB. Proven track record of optimizing backend API performance, designing database schemas, and integrating AI services to enhance product functionality. Passionate about writing clean, maintainable JavaScript/TypeScript code.

LinkedIn "About" Section (Professional Narrative)
I’m a Full Stack Developer passionate about turning complex ideas into scalable digital products. Specialized in the MERN stack (MongoDB, Express, React, Node.js), my work bridges responsive frontend interfaces with robust backend architectures.

Over my career, I’ve engineered backend microservices handling over 100k daily requests, integrated generative AI APIs to automate workflow processes, and optimized database queries to cut response times by 30%. I thrive in collaborative, Agile environments where I can build production-ready software and continuously adopt modern web technologies.

Portfolio "About Me" Section (Conversational)
Hi, I'm Alex! I’m a software engineer based in San Francisco with a background in Computer Science. My primary focus is full-stack web development—building intuitive user interfaces on the frontend and pairing them with high-performance services on the backend.

When I’m not shipping code or designing RESTful APIs, I’m building side projects with generative AI models, optimizing database performance, or exploring new open-source developer tools. Whether crafting sleek React components or architecting MongoDB schemas, I enjoy solving tricky technical problems from the ground up.
`

const jobDescription = `Senior Full Stack Developer (MERN Stack)

Company: NextGen Innovations | Location: San Francisco, CA (Hybrid) | Employment Type: Full-time

Role Overview

We are seeking an experienced Full Stack Developer to lead the engineering and scaling of our core SaaS platform. In this role, you will work across the entire software stack—building responsive React frontends, engineering robust Node.js microservices, and optimizing database infrastructure.

Key Responsibilities

Architect and implement scalable web application features using React, Tailwind CSS, Node.js, and Express.

Design, test, and maintain secure RESTful APIs capable of handling high concurrent traffic.

Manage and optimize MongoDB schemas, indexes, and aggregation pipelines for maximum query performance.

Integrate generative AI APIs (e.g., Gemini, OpenAI) and third-party web services into backend workflows.

Enforce code quality, perform code reviews, and write unit/integration tests using Jest or Cypress.

Collaborate closely with product managers, UI/UX designers, and DevOps teams within an Agile framework.

Required Qualifications

3+ years of professional full-stack development experience using the MERN stack.

Advanced proficiency in JavaScript (ES6+), TypeScript, React, Node.js, and Express.

Hands-on experience with asynchronous programming, state management (Redux/Zustand), and REST architecture.

Strong understanding of MongoDB database modeling, security, and performance tuning.

Demonstrated experience with secure authentication standards (JWT, OAuth 2.0).

Bachelor's degree in Computer Science, Engineering, or equivalent practical experience.

Preferred Qualifications

Experience integrating LLMs or AI API pipelines into production web software.

Familiarity with cloud platforms (AWS S3, EC2) and containerization tools (Docker).

Knowledge of CI/CD workflows and automated deployment pipelines (Vercel, GitHub Actions).`

module.exports = {
  resume, selfDescription, jobDescription
}