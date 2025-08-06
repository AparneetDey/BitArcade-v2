# BitArcade v2

**BitArcade v2** is a complete rework of my previous website, now featuring a modernized design and a robust tech stack using React for the frontend and Node.js for the backend. This version brings a significantly improved user experience, a more visually appealing interface, and enhanced performance.

## 🚀 Features

### **Enhanced User Authentication**
- **Secure Appwrite Integration** - Modern authentication using Appwrite v18.2.0
- **Email/Password Authentication** - Sign up and log in with email, password, and username
- **Session Management** - Secure session handling with cookies and backend validation
- **Account Verification** - Email/password verification for sensitive operations
- **Account Deletion** - Permanent account deletion with security confirmation
- **Loading States** - Smooth authentication flow with loading indicators
- **Error Handling** - Comprehensive error messages and validation feedback

### **Game Discovery & Management**
- **Real-time Search** - Search games with 700ms debounced input for optimal performance
- **Game Details** - Comprehensive game information including trailers, screenshots, and metadata
- **Genre Filtering** - Browse games by genre with dedicated genre pages
- **RAWG API Integration** - Powered by the [RAWG Video Games Database API](https://rawg.io/apidocs)
- **Similar Games** - Discover related games based on genre preferences

### **User Profile & Account Management**
- **Profile Dashboard** - View and manage user profile information
- **Account Security** - Email/password verification for account deletion
- **Session Persistence** - Stay logged in across browser sessions
- **Secure Logout** - Proper session cleanup and logout functionality

### **Page Persistence & Navigation**
- **Smart Page Tracking** - Automatically saves last visited page to localStorage
- **Refresh Recovery** - Returns users to their last page after browser refresh
- **Protected Routes** - Authentication-based route protection with loading states
- **Smooth Navigation** - Seamless page transitions with scroll-to-top functionality

### **Responsive Design & UX**
- **Mobile-First Design** - Fully responsive layout optimized for all devices
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Loading Indicators** - Spinner components for better user feedback
- **Error Boundaries** - Graceful error handling throughout the application

### **Performance Optimizations**
- **Vite Build System** - Fast development and optimized production builds
- **React Router v7** - Modern routing with data loading capabilities
- **Debounced Search** - Optimized search performance with real-time results
- **Lazy Loading** - Efficient resource loading and caching

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Modern React with hooks and functional components
- **Vite 7.0.6** - Fast build tool and development server
- **React Router 7.6.3** - Client-side routing with data loading
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Appwrite 18.2.0** - Backend-as-a-Service for authentication and data

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express 5.1.0** - Web application framework
- **Express Session** - Session management middleware
- **CORS** - Cross-origin resource sharing support

### **APIs & Services**
- **RAWG Video Games Database API** - Game data and metadata
- **Appwrite Cloud** - Authentication and user management
- **Environment Variables** - Secure configuration management

### **Development Tools**
- **ESLint** - Code quality and consistency
- **React Use** - Useful React hooks and utilities
- **DOMPurify** - XSS protection for user-generated content

## 🔧 Key Improvements

### **Authentication System**
- **Robust Auth Flow** - Fixed circular dependencies and loading states
- **Session Validation** - Backend session verification for security
- **Account Security** - Email/password verification for sensitive operations
- **Error Recovery** - Graceful handling of authentication failures

### **User Experience**
- **Page Persistence** - Users return to their last visited page after refresh
- **Loading States** - Smooth transitions during authentication and data loading
- **Protected Routes** - Intelligent route protection with loading indicators
- **Responsive Design** - Optimized for all screen sizes and devices

### **Performance & Security**
- **Debounced Search** - Optimized search performance (700ms delay)
- **Session Management** - Secure cookie-based sessions
- **Error Boundaries** - Comprehensive error handling
- **XSS Protection** - DOMPurify integration for user content

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables for Appwrite and RAWG API
4. Start the development servers:
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend (in new terminal)
   cd frontend && npm run dev
   ```

## 📁 Project Structure

```
BitArcade-v2/
├── frontend/                 # React application
│   ├── src/
│   │   ├── appwrite/        # Appwrite authentication service
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   └── conf/           # Configuration files
│   └── public/             # Static assets
├── backend/                 # Node.js server
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🔄 Recent Updates

### **Authentication Enhancements**
- ✅ Fixed circular dependency issues in auth flow
- ✅ Added loading states for better UX
- ✅ Implemented proper session validation
- ✅ Added account deletion with security verification

### **Page Persistence**
- ✅ Automatic page tracking and localStorage management
- ✅ Smart refresh recovery system
- ✅ Protected route improvements with loading states

### **Performance Optimizations**
- ✅ Debounced search implementation (700ms)
- ✅ Optimized auth state management
- ✅ Improved error handling and recovery

### **Security Improvements**
- ✅ Email/password verification for account deletion
- ✅ Enhanced session management
- ✅ XSS protection with DOMPurify

## ℹ️ About This Project

This website is a complete rework of my previous BitArcade project, featuring a modern tech stack and significantly improved user experience. The application now uses React 19 with Vite for fast development, Appwrite for secure authentication, and integrates with the RAWG API for comprehensive game data.

The result is a faster, more secure, and more maintainable application with enhanced user experience features like page persistence, smooth authentication flows, and responsive design.
