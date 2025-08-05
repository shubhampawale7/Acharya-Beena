import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./context/ThemeContext";
import AnimatedBackground from "./components/common/AnimatedBackground";

// --- Layout & Routing Components ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminRoute from "./components/routing/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import ScrollToTop from "./components/common/ScrollToTop";

// --- Import All Public Page Components ---
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import SinglePostPage from "./pages/SinglePostPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";

import GlossaryPage from "./pages/GlossaryPage";
import HoroscopePage from "./pages/HoroscopePage";

// --- Import All Admin Page Components ---
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserListPage from "./pages/admin/UserListPage";

import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminUserEditPage from "./pages/admin/AdminUserEditPage ";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DashboardPage from "./pages/DashboardPage";

// --- Layout for the Main Website ---
const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-transparent">
      {theme === "dark" && <AnimatedBackground />}

      <div className="relative z-10 flex flex-col flex-grow">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

// --- Component to Define All Routes for the Main Site ---
const MainSiteRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SinglePostPage />} />

        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

        {/* Protected User Routes */}
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/book-consultation" element={<BookingPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/booking-success/:id" element={<BookingSuccessPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

// --- Component to Define All Routes for the Admin Panel ---
const AdminSiteRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="user/:id/edit" element={<AdminUserEditPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

// --- The Main App Component ---
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminSiteRoutes />} />
        <Route path="/*" element={<MainSiteRoutes />} />
      </Routes>
    </>
  );
}

export default App;
