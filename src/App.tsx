// Example in your main App.tsx or router file
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import AuthPage from './pages/Auth/AuthPage';
import RecPage from './pages/Auth/RecPage';
import RegPage from './pages/Auth/RegPage';
import VerifyOtpPage from './pages/Auth/VerifyPage';

// import { GlobalStyle } from './styles/GlobalStyle'; // Your global styles

// Protected route component
// const ProtectedRoute = ({ children }: any) => {
//   // Check if user is authenticated
//   // This is a simple example - replace with your actual auth check logic
//   const isAuthenticated = localStorage.getItem('authToken') !== null;

//   if (!isAuthenticated) {
//     // Redirect to login page if not authenticated
//     return <Navigate to="/auth" replace />;
//   }

//   return children;
// };

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/registration" element={<RegPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/recovery" element={<RecPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <IndexPage />
          // </ProtectedRoute>
        }
      />
      {/* Add other protected routes here */}
    </Routes>
  );
}

export default App;
