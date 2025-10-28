import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import TicketForm from './components/TicketForm';
import { initializeSampleData } from './utils/localStorage';
import '../src/index.css';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects to tickets if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? <Navigate to="/tickets" /> : children;
};

function App() {
  const { user } = useAuth();

  // Initialize sample data on app start
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordForm />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/:id/edit"
            element={
              <ProtectedRoute>
                <TicketForm isEdit={true} />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={<Navigate to={user ? "/tickets" : "/login"} />}
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={<Navigate to={user ? "/tickets" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
