import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programme from "./pages/Programme";
import Stories from "./pages/Stories";
import News from "./pages/News";
import Contact from "./pages/Contact";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Partnership from "./pages/Partnership";
import Fundraise from "./pages/Fundraise";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Toaster } from "./components/ui/sonner";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c2b2d]">
      <Header />
      <ScrollToTop />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/get-involved/donate" element={<Donate />} />
          <Route path="/get-involved/volunteer" element={<Volunteer />} />
          <Route path="/get-involved/partnership" element={<Partnership />} />
          <Route path="/get-involved/fundraise" element={<Fundraise />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

function AppRouter() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) {
    return <AdminRoutes />;
  }
  return <PublicLayout />;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <AppRouter />
            <Toaster position="top-right" />
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
