import '../App.css';
import HeaderIcons from '../components/HeaderIcons';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import PriceListSection from '../components/PriceListSection';
import PortfolioSection from '../components/PortfolioSection';
import CooperationSection from '../components/CooperationSection';
import Footer from '../components/Footer';

function Portfolio() {
  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <HeroSection />
      <SkillsSection />
      <PriceListSection />
      <PortfolioSection />
      <CooperationSection />
      <Footer />
    </div>
  );
}

export default Portfolio;
