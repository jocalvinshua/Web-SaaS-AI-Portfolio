# 🚀 AI-Powered Resume Builder

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)

A modern resume-building platform that combines minimalist design templates with the power of Generative AI to help you craft a professional and impactful resume effortlessly.

# ✨ Key Features

🤖 AI Summary Enhancer
Transform a simple profile summary into a compelling professional narrative using Gemini 3 Flash.

📑 Dynamic Templates
Choose from clean, modern, and ATS-friendly layouts, including the Minimal Image Template.

⚡ Real-time Editing
Instantly preview your resume as you type with a seamless live editing experience.

🎨 Custom Accent Colors
Personalize your resume with custom theme colors to match your personal branding.

# 🛠️ Tech Stack
- Frontend: React.js + Vite
- Styling: Tailwind CSS + Lucide React Icons
- AI Integration: @google/genai (Gemini 3 Flash Preview)
- State Management: React Context API + Reducer
- Notifications: React Toastify

# 🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/jocalvinshua/resume-builder-ai.git
cd resume-builder-ai
```
2. Install Dependencies
```
npm install
```
3. Environment Configuration
Create a .env file in both client and server directories.

📁 Client (```/client/.env```)
```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_BACKEND_URL=http://localhost:3000
```

📁 Server (```/server/.env```)
```
PORT=4000
MONGO_URI=YOUR_MONGODB_URI
FRONTEND_URL=http://localhost:5173

JWT_SECRET=YOUR_SECRET_KEY
NODE_ENV=development

CLOUDINARY_NAME=YOUR_CLOUDINARY_DIRECTORY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

4. Run the Application
```
npm run dev
```


# 📸 Template Preview
This application supports multiple professional layouts. One of the highlights is the Minimal Image Template, designed with a clean sidebar for contact information and skills, combined with a strong visual profile section.

📈 Development Roadmap
✅ Gemini AI integration for profile summaries
✅ Export resume to PDF
✅ AI-powered skill suggestions
✅ ATS score checker

# 💡 Future Improvements
Multi-language resume support
Cover letter generator
Resume sharing via public link
Advanced AI career recommendations

# 🤝 Contributing
Contributions are welcome! Feel free to fork this repository, submit issues, or create pull requests to improve the project.
