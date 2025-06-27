import './App.css';
import GithubIcon from './components/GithubIcon';
import TelegramIcon from './components/TelegramIcon';
import EmailIcon from './components/EmailIcon';
import InstagramIcon from './components/InstagramIcon';
import BuildingIcon from './components/BuildingIcon';
import BotSticker from './BotSticker';
import PythonIcon from './components/PythonIcon';
import JSIcon from './components/JSIcon';
import TSIcon from './components/TSIcon';
import NodeIcon from './components/NodeIcon';
import ReactIcon from './components/ReactIcon';
import TailwindIcon from './components/TailwindIcon';
import GitIcon from './components/GitIcon';
import PostgresIcon from './components/PostgresIcon';
import MongoIcon from './components/MongoIcon';
import LinuxIcon from './components/LinuxIcon';
import NeovimIcon from './components/NeovimIcon';
import BotStickerCopy from './BotSticker copy';
import BotStickerComp from './BotStickerComp.jsx'
import BotStickerLoveYou from './BotStickerLoveYou.jsx';


function App() {
  return (
    <div className="portfolio-root">
      <div className="hero-icons-top">
        <div className="hero-avatar-top">
          <img src="/src/assets/—Pngtree—mountain logo design vector_5286636.png" alt="avatar" width={56} height={56} style={{objectFit: 'cover', borderRadius: 16}} />
        </div>
        <a href="https://github.com/kwtpub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <span className="icon"><GithubIcon /></span>
        </a>
        <a href="#" aria-label="Telegram">
          <span className="icon"><TelegramIcon /></span>
        </a>
        <a href="#" aria-label="Email">
          <span className="icon"><EmailIcon /></span>
        </a>
        <a href="#" aria-label="Instagram">
          <span className="icon"><InstagramIcon /></span>
        </a>
      </div>
      {/* Hero Section */}
      <section className="hero hero-row">
        <div className="hero-main-bordered">
          <div className="hero-main-flex">
            <BotSticker width={110} height={110} />
            <div className="hero-main-content">
              <div className="hero-title-row">
                <h1>Hey, I'm <span className="accent">Timofei</span></h1>
              </div>
              <p className="desc">Full Stack developer from Russia. I love building modern web apps and automating processes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <div className="tech-row">
        <section className="technologies-container technologies-border-label">
          <h2 className="technologies-label">Technologies</h2>
          <section className="technologies">
            <div className="tech-row">
              <ul className="tech-list">
                <li aria-label="React"><ReactIcon className="tech-icon" /></li>
                <li aria-label="Node.js"><JSIcon className="tech-icon" /></li>
                <li aria-label="Python"><PythonIcon className="tech-icon" /></li>
                <li aria-label="CSS"><TSIcon className="tech-icon" /></li>
                <li aria-label="PostgreSQL"><PostgresIcon className="tech-icon" /></li>
                <li aria-label="MongoDB"><MongoIcon className="tech-icon" /></li>
                <li aria-label="Docker"><NodeIcon className="tech-icon" /></li>
                <li aria-label="Linux"><LinuxIcon className="tech-icon" /></li>
                <li aria-label="Tailwind"><TailwindIcon className="tech-icon" /></li>
                <li aria-label="Git"><GitIcon className="tech-icon" /></li>
                <li aria-label="Neovim"><NeovimIcon className="tech-icon" /></li>
              </ul>
            </div>
          </section>
        </section>
        <section className="tech-side">
          <div className="tech-side-block"><span className="tech-side-status"><BuildingIcon /> Building Telegram Auto Post Bot</span></div>
          <a
            href="https://t.me/kwtd6v"
            target="_blank"
            rel="noopener noreferrer"
            className="tech-side-block"
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            aria-label="Online in Telegram"
          >
            <span className="tech-side-status">
              <TelegramIcon />
              <span className="tech-side-labels">
                Telegram
                <span className="tech-side-online">online</span>
              </span>
            </span>
          </a>
        </section>
      </div>
    

      {/* Projects Section */}
      <section className="projects">
        <div className="projects-container projects-border-label">
          <h2 className="projects-label">Projects</h2>
          <div className="project-list">
            <div className="project-card">
              <div style={{display:'flex',alignItems:'center',gap:'0.5em',marginBottom:'0.5rem'}}>
                <span className="icon"><BotStickerLoveYou width={30} height={30} /></span>
                <h4 className="accent" style={{margin:0}}>Telegram Auto Post Bot</h4>
              </div>
              <p>Multifunctional Telegram bot for automating car sale ads management.</p>
              <a href="https://github.com/kwtpub/Telegram-Auto-Post-Bot" target="_blank" rel="noopener noreferrer" className="github-btn">
                <span className="github-btn-icon" style={{display:'inline-flex',alignItems:'center',marginRight:'0.5em'}}>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </span>
                GitHub
              </a>
            </div>
            <div className="project-card">
              <div style={{display:'flex',alignItems:'center',gap:'0.5em',marginBottom:'0.5rem'}}>
                <span className="icon"><BotStickerCopy width={30} height={30}/></span>
                <h4 className="accent" style={{margin:0}}>processing-calc</h4>
              </div>
              <p>JavaScript calculator for data processing.</p>
              <a href="https://github.com/kwtpub/processing-calc" target="_blank" rel="noopener noreferrer" className="github-btn">
                <span className="github-btn-icon" style={{display:'inline-flex',alignItems:'center',marginRight:'0.5em'}}>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </span>
                GitHub
              </a>
            </div>
            <div className="project-card">
              <div style={{display:'flex',alignItems:'center',gap:'0.5em',marginBottom:'0.5rem'}}>
                <span className="icon"><BotStickerComp width={30} height={30} /></span>
                <h4 className="accent" style={{margin:0}}>liana_v_ch</h4>
              </div>
              <p>Personal service website built with React.</p>
              <a href="https://github.com/kwtpub/liana_v_ch" target="_blank" rel="noopener noreferrer" className="github-btn">
                <span className="github-btn-icon" style={{display:'inline-flex',alignItems:'center',marginRight:'0.5em'}}>
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Timofei (@kwtpub)</p>
      </footer>
    </div>
  );
}

export default App;
