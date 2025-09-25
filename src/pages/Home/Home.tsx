import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Hero from "./Hero";
import FirstTransition from "./FirstTransition";
import DownloadSection from "./DownloadSection";
import NewsSection from "./NewsSection";
import AboutSection from "./AboutSection";
import CardsSection from "./CardsSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FirstTransition />
      <section id="next-section" className="next-section">
        <DownloadSection />
        <NewsSection />
        <AboutSection />
        <CardsSection />
      </section>
      <Footer withBackground={true} />
    </>
  );
}
