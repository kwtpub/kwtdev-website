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
import BotStickerLoveYou from './BotStickerLoveYou.jsx'
import BotStickerComp from './BotStickerComp.jsx'

function Portfolio() {
  return (
    <div className="portfolio-root">
      <div className="hero-icons-top">
        <div className="hero-avatar-top">
          <img src="https://res.cloudinary.com/dhx2rvn4s/image/upload/v1751044969/Pngtree_mountain_logo_design_vector_5286636_fqpzrl.jpg" alt="avatar" width={56} height={56} style={{objectFit: 'cover', borderRadius: 16}} />
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
                <h1>STUDIO <span className="accent">KWTPUB</span></h1>
              </div>
              <p className="desc">Fullstack разработчик с 3-летним стажем — быстрые, минималистичные сайты и продуктовые интерфейсы. Широкий спектр возможностей и навыков: полный цикл разработки, деплой и поддержка.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="tech-row">
        <section className="technologies-container technologies-border-label">
          <h2 className="technologies-label">Навыки</h2>
          <section className="technologies">
            <div className="services-list">
              <div className="service-item">• Интеграция платежных систем (Stripe, PayPal, Яндекс.Касса)</div>
              <div className="service-item">• Создание каталогов товаров и услуг</div>
              <div className="service-item">• Система регистрации и авторизации пользователей</div>
              <div className="service-item">• Разработка Telegram ботов и автоматизация</div>
            </div>
          </section>
        </section>
        <section className="tech-side">
          <div className="tech-side-block"><span className="tech-side-status"><BuildingIcon /> Building Telegram Auto Post Bot</span></div>
          <a href="https://t.me/kwtd6v">
            <div className="tech-side-block">
              <span className="tech-side-status">
                <TelegramIcon />
                <span className="tech-side-labels">
                  Telegram
                  <span className="tech-side-online">online</span>
                </span>
              </span>
            </div>
          </a>
        </section>
      </div>
    

             {/* Portfolio Section */}
             <section className="projects">
               <div className="projects-container projects-border-label">
                 <h2 className="projects-label">Портфолио</h2>
                 <div className="portfolio-grid">
                   <div className="portfolio-item">
                     <h3>JWT Authentication</h3>
                     <p>Система аутентификации с JWT токенами на Node.js. Включает регистрацию, авторизацию и защищенные маршруты.</p>
                     <div className="portfolio-links">
                       <a href="https://github.com/kwtpub/JWT-authentication" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         GitHub
                       </a>
                     </div>
                   </div>
                   
                   <div className="portfolio-item">
                     <h3>Book Library</h3>
                     <p>Веб-приложение для управления библиотекой книг с современным интерфейсом и функционалом каталогизации.</p>
                     <div className="portfolio-links">
                       <a href="https://github.com/kwtpub/book-library" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         GitHub
                       </a>
                     </div>
                   </div>
                   
                   <div className="portfolio-item">
                     <h3>Tommy Sinny Password</h3>
                     <p>Сайт для получения паролей с современным дизайном и интуитивным интерфейсом.</p>
                     <div className="portfolio-links">
                       <a href="https://tommysinny.com/password" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         Сайт
                       </a>
                     </div>
                   </div>
                   
                   <div className="portfolio-item">
                     <h3>DYU TOYS</h3>
                     <p>Интернет-магазин арт-игрушек с каталогом товаров, корзиной покупок и системой оформления заказов.</p>
                     <div className="portfolio-links">
                       <a href="https://dyutoys.ru" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         Сайт
                       </a>
                     </div>
                   </div>
                   
                   <div className="portfolio-item">
                     <h3>Tyler Thompson</h3>
                     <p>Портфолио-сайт с современным дизайном и адаптивной версткой для демонстрации работ.</p>
                     <div className="portfolio-links">
                       <a href="https://tylerthompson.ru" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         Сайт
                       </a>
                     </div>
                   </div>
                   
                   <div className="portfolio-item">
                     <h3>My Active To-Do</h3>
                     <p>Приложение для управления задачами с интуитивным интерфейсом и возможностью отслеживания прогресса.</p>
                     <div className="portfolio-links">
                       <a href="https://github.com/kwtpub/my-active-to-d" target="_blank" rel="noopener noreferrer" className="github-btn">
                         <GithubIcon />
                         GitHub
                       </a>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

             {/* Cooperation Process Section */}
             <section className="projects">
               <div className="projects-container projects-border-label">
                 <h2 className="projects-label">Порядок сотрудничества</h2>
                 <div className="cooperation-flow">
                   <div className="flow-card">
                     <h3>ЗАЯВКА</h3>
                     <p>Оформите заявку на разработку или пришлите нам ваше техническое задание</p>
                   </div>
                   <div className="flow-card">
                     <h3>ПРЕДЛОЖЕНИЕ РЕШЕНИЯ</h3>
                     <p>Разработаем индивидуальное предложение, учитывая требования, и посчитаем стоимость</p>
                   </div>
                   <div className="flow-card">
                     <h3>СОГЛАСОВАНИЕ И РАЗРАБОТКА</h3>
                     <p>После согласования условий мы организуем разработку, контролируя качество и соблюдение сроков</p>
                   </div>
                   <div className="flow-card">
                     <h3>СОПРОВОЖДЕНИЕ И ПОДДЕРЖКА</h3>
                     <p>Даём гарантию на качество нашей работы и готовы решать любые возможные вопросы за Вас</p>
                   </div>
                 </div>
               </div>
             </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Рыбин Тимофей Вячеславович (@kwtpub)</p>
      </footer>
    </div>
  );
}

export default Portfolio;
