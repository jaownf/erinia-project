import Header from "./components/Header";
import Hero from "./components/Hero";
import FirstTransition from "./components/FirstTransition";
import DownloadSection from "./components/DownloadSection";
import NewsSection from "./components/NewsSection";
import AboutSection from "./components/AboutSection";
import CardsSection from "./components/CardsSection";
import Footer from "./components/Footer";

// Composição das seções da página
export default function App() {
  return (
    <div className="app-root">
      <Header />
      <Hero />
      <FirstTransition />
      <section id="next-section" className="next-section">
        <DownloadSection />
        <NewsSection />
        <AboutSection />
        <CardsSection />
      </section>
      <Footer />
    </div>
  );
}
