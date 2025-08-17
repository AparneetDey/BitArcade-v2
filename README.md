# 🎮 BitArcade v2

**BitArcade v2** is a modern gaming discovery platform that connects gamers with their next favorite game. Built with cutting-edge technologies, it offers a seamless experience for exploring, discovering, and learning about video games from retro classics to modern masterpieces.

![BitArcade v2](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.6-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Appwrite](https://img.shields.io/badge/Appwrite-18.2.0-red?style=for-the-badge&logo=appwrite)

## ✨ Features

### 🎯 **Game Discovery & Search**
- **Real-time Search** - Lightning-fast search with 700ms debounced input for optimal performance
- **Comprehensive Game Database** - Powered by the RAWG Video Games Database API with 500,000+ games
- **Advanced Filtering** - Browse games by genre, platform, release year, and rating
- **Similar Games** - Intelligent recommendations based on genre preferences
- **Game Details** - Rich game information including trailers, screenshots, ratings, and metadata

### 🔐 **Secure Authentication System**
- **Modern Appwrite Integration** - Enterprise-grade authentication using Appwrite v18.2.0
- **Email/Password Authentication** - Secure signup and login with email verification
- **Session Management** - Robust session handling with backend validation
- **Account Security** - Email/password verification for sensitive operations
- **Account Management** - Profile dashboard with account deletion capabilities
- **Loading States** - Smooth authentication flow with intuitive loading indicators

### 🎨 **User Experience**
- **Responsive Design** - Mobile-first approach optimized for all devices
- **Page Persistence** - Smart page tracking with localStorage and refresh recovery
- **Protected Routes** - Authentication-based route protection with loading states
- **Smooth Navigation** - Seamless page transitions with scroll-to-top functionality
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Loading Indicators** - Comprehensive spinner components for better user feedback

### 🚀 **Performance & Optimization**
- **Vite Build System** - Ultra-fast development and optimized production builds
- **React Router v7** - Modern routing with data loading capabilities
- **Debounced Search** - Optimized search performance with real-time results
- **Lazy Loading** - Efficient resource loading and intelligent caching
- **Error Boundaries** - Graceful error handling throughout the application

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Latest React with hooks and functional components
- **Vite 7.0.6** - Next-generation build tool for lightning-fast development
- **React Router 7.6.3** - Modern client-side routing with data loading
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for rapid UI development
- **Appwrite 18.2.0** - Backend-as-a-Service for authentication and data management

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express 5.1.0** - Fast, unopinionated web framework
- **Express Session** - Session management middleware
- **CORS** - Cross-origin resource sharing support
- **Nodemon** - Development server with auto-restart

### **APIs & Services**
- **RAWG Video Games Database API** - Comprehensive game data and metadata
- **Appwrite Cloud** - Authentication and user management services
- **Environment Variables** - Secure configuration management

### **Development Tools**
- **ESLint 9.30.1** - Code quality and consistency enforcement
- **React Use 17.6.0** - Useful React hooks and utilities
- **DOMPurify 3.2.6** - XSS protection for user-generated content

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Appwrite account and project setup
- RAWG API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BitArcade-v2.git
   cd BitArcade-v2
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both frontend and backend directories:
   
   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```
   
   **Backend (.env)**
   ```env
   PORT=5000
   APPWRITE_ENDPOINT=your_appwrite_endpoint
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   RAWG_API_KEY=your_rawg_api_key
   SESSION_SECRET=your_session_secret
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (Terminal 1)
   cd backend && npm run dev
   
   # Start frontend server (Terminal 2)
   cd frontend && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
BitArcade-v2/
├── frontend/                    # React application
│   ├── src/
│   │   ├── appwrite/           # Appwrite authentication service
│   │   │   └── auth.js         # Authentication utilities
│   │   ├── components/         # Reusable React components
│   │   │   ├── Button.jsx      # Custom button component
│   │   │   ├── Game.jsx        # Game card component
│   │   │   ├── GameDetails.jsx # Game details display
│   │   │   ├── GenreList.jsx   # Genre filtering component
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   ├── ScrollToTop.jsx # Scroll behavior
│   │   │   ├── Search.jsx      # Search functionality
│   │   │   ├── Spinner.jsx     # Loading indicators
│   │   │   └── useScreenSize.jsx # Responsive utilities
│   │   ├── pages/              # Page components
│   │   │   ├── Authentication.jsx # Login/Signup pages
│   │   │   ├── GamePreview.jsx # Game detail page
│   │   │   ├── Genres.jsx      # Genre browsing page
│   │   │   ├── Home.jsx        # Home page
│   │   │   └── Profile.jsx     # User profile page
│   │   ├── conf/               # Configuration files
│   │   │   └── conf.js         # App configuration
│   │   ├── App.jsx             # Main application component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Application entry point
│   ├── public/                 # Static assets
│   │   ├── *.svg               # Icon assets
│   │   ├── *.png               # Image assets
│   │   ├── robots.txt          # SEO configuration
│   │   └── sitemap.xml         # Site map
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
├── backend/                    # Node.js server
│   ├── server.js               # Express server setup
│   ├── sitemap-generator.js    # Sitemap generation utility
│   └── package.json            # Backend dependencies
├── package.json                # Root package configuration
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation
```

## 🔧 Key Features Implementation

### **Authentication Flow**
- **Secure Session Management** - Backend session validation with Appwrite integration
- **Protected Routes** - Authentication-based access control with loading states
- **Account Security** - Email/password verification for sensitive operations
- **Error Recovery** - Graceful handling of authentication failures

### **Game Discovery System**
- **RAWG API Integration** - Real-time game data fetching with error handling
- **Debounced Search** - Optimized search performance (700ms delay)
- **Genre Filtering** - Dynamic genre-based game discovery
- **Similar Games** - Intelligent recommendations based on game genres

### **User Experience Enhancements**
- **Page Persistence** - Automatic page tracking and localStorage management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Loading States** - Comprehensive loading indicators throughout the app
- **Error Boundaries** - Graceful error handling and user feedback

## 🚀 Deployment

### **Vercel Deployment**
The project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

The `vercel.json` configuration handles:
- Build command: `npm run build`
- Output directory: `frontend/dist`
- Framework detection: Vite
- SPA routing with fallback to `index.html`
- Asset caching headers for optimal performance

### **Manual Deployment**
```bash
# Build the application
npm run build

# The built files will be in frontend/dist/
```

## 🔄 Recent Updates

### **v2.0.0 - Complete Rewrite**
- ✅ **Modern Tech Stack** - Upgraded to React 19, Vite 7, and Tailwind CSS 4
- ✅ **Enhanced Authentication** - Robust Appwrite integration with session management
- ✅ **Improved Performance** - Debounced search, lazy loading, and optimized builds
- ✅ **Better UX** - Page persistence, loading states, and responsive design
- ✅ **Security Enhancements** - XSS protection, secure sessions, and error boundaries

### **Authentication System**
- ✅ Fixed circular dependency issues in auth flow
- ✅ Added comprehensive loading states for better UX
- ✅ Implemented proper session validation with backend
- ✅ Added account deletion with security verification

### **Performance Optimizations**
- ✅ Debounced search implementation (700ms delay)
- ✅ Optimized auth state management
- ✅ Improved error handling and recovery
- ✅ Enhanced caching and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RAWG Video Games Database API** - For providing comprehensive game data
- **Appwrite** - For the excellent backend-as-a-service platform
- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

If you have any questions or need help with the project, please:

1. Check the [Issues](https://github.com/AparneetDey/BitArcade-v2/issues) page
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainer directly

---

**Made with ❤️ by Aparneet Dey**

*BitArcade v2 - Where gaming discovery meets modern web development*
