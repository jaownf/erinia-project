import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Bestiary from "./pages/Bestiary/Bestiary";
import History from "./pages/History/History";
import Community from "./pages/Community/Community";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

// Componente para rolar para o topo quando a rota mudar
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="site-wrapper">
      <div className="app-root">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bestiario" element={<BestiaryPage />} />
          <Route path="/historia" element={<HistoryPage />} />
          <Route path="/comunidade" element={<CommunityPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </div>
        <Footer withBackground={true} />
      </div>
    </Router>
  );
}

function BestiaryPage() {
  return <Bestiary />;
}

function HistoryPage() {
  return <History />;
}

function CommunityPage() {
  return <Community />;
}

