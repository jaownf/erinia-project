import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Bestiary from "./pages/Bestiary/Bestiary";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bestiario" element={<BestiaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function BestiaryPage() {
  return (
    <>
      <Header />
      <Bestiary />
      <Footer withBackground={false} />
    </>
  );
}
