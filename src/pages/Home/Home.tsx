import Header from "../../components/common/Header";
import Hero from "./Hero";
import FirstTransition from "./FirstTransition";
import NewsSection from "./NewsSection";
import AboutSection from "./AboutSection";
import CardsSection from "./CardsSection";
import LastTransition from "./LastTransition";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FirstTransition />
      <section id="next-section" className="next-section">
        <NewsSection />
        <AboutSection />
        <CardsSection />
      </section>
    </>
  );
}
