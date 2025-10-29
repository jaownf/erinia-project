import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Bestiary from "./pages/Bestiary/Bestiary";
import History from "./pages/History/History";
import Community from "./pages/Community/Community";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bestiario" element={<BestiaryPage />} />
          <Route path="/historia" element={<HistoryPage />} />
          <Route path="/comunidade" element={<CommunityPage />} />
        </Routes>
        <Footer withBackground={false} />
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
