import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';
import HomePage      from './pages/HomePage';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import SubscribePage from './pages/SubscribePage';
import DashboardPage from './pages/DashboardPage';
import CharitiesPage from './pages/CharitiesPage';
import CharityPage   from './pages/CharityPage';
import DrawsPage     from './pages/DrawsPage';
import AdminPage     from './pages/AdminPage';
import NotFoundPage  from './pages/NotFoundPage';

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
      style={{ borderColor:'var(--gold)', borderTopColor:'transparent' }} />
  </div>
);
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" replace />;
};
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return !user ? children : <Navigate to="/dashboard" replace />;
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/charities"     element={<CharitiesPage />} />
          <Route path="/charities/:id" element={<CharityPage />} />
          <Route path="/draws"         element={<DrawsPage />} />
          <Route path="/login"         element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register"      element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/subscribe"     element={<PrivateRoute><SubscribePage /></PrivateRoute>} />
          <Route path="/dashboard"     element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/admin/*"       element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="*"              element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
