import GithubIcon from '../icon/GithubIcon';

function PortfolioSection() {
  return (
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
            <p>Веб-приложение с самописным движком. Для опросмотра работы обязательно введите что-то в поиск</p>
            <div className="portfolio-links">
              <a href="https://book-library11.netlify.app" target="_blank" rel="noopener noreferrer" className="github-btn">
                <GithubIcon />
                GitHub
              </a>
            </div>
          </div>
          
          <div className="portfolio-item">
            <h3>Tommy Sinny</h3>
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
            <h3>My Active To-Do</h3>
            <p>Приложение для управления задачами с интуитивным интерфейсом и возможностью отслеживания прогресса.</p>
            <div className="portfolio-links">
              <a href="https://to-do-kwt.netlify.app" target="_blank" rel="noopener noreferrer" className="github-btn">
                <GithubIcon />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
