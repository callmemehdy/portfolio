import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home({ onAdminClick, showAdminButton = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAdminClick={onAdminClick} showAdminButton={showAdminButton} />
      
      <main className="flex-1 pt-20">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
