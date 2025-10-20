import React from 'react';
import './CommercialProposal.css';
import GithubIcon from './components/GithubIcon';

const CommercialProposal = () => {
  return (
    <div className="commercial-proposal">
      <div className="wrap">
        <header>
          <div className="logo">KWTPUB</div>
          
        </header>

        <section className="hero">
          <div className="hero-content">
            <div class="hero-title">
            <div className="kicker">Коммерческое предложение</div>
            <div className="subtitle">Fullstack разработчик с 3-летним стажем. Быстрые минималистичные сайты и продуктовые интерфейсы. Полный цикл разработки, деплой и поддержка.</div>
            </div>
            <div className="section">
              <h2 id="services">Навыки</h2>
              <div className="list">
                <div className="muted">• Интеграция платежных систем (Stripe, PayPal, Яндекс.Касса)</div>
                <div className="muted">• Создание каталогов товаров и услуг</div>
                <div className="muted">• Система регистрации и авторизации пользователей</div>
                <div className="muted">• Разработка Telegram-ботов и автоматизация</div>
              </div>
            </div>

            <div className="section">
              <h2>Портфолио</h2>
              <div className="portfolio-grid">
                <div className="portfolio-item">
                  <h3>JWT Authentication</h3>
                  <p>Современная безопасная аутентификация с JWT токенами на Node.js. Включает регистрацию, авторизацию, защищенные маршруты, хеширование паролей, middleware для проверки токенов и обновление токенов доступа.</p>
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
                  <h3>Tommy Sinny</h3>
                  <p>Сайт бренда с уникальным дизайном. Современный интерфейс для получения паролей с креативным подходом к визуальному оформлению и интуитивной навигацией.</p>
                  <div className="portfolio-links">
                    <a href="https://tommysinny.com/password" target="_blank" rel="noopener noreferrer" className="github-btn">
                      <GithubIcon />
                      Сайт
                    </a>
                  </div>
                </div>
                
                <div className="portfolio-item">
                  <h3>DYU TOYS</h3>
                  <p>Интернет-магазин арт-игрушек на CMS Tilda с кастомным каталогом и уникальным дизайном. Разработан специальный функционал для Tilda с интеграцией платежных систем и системой управления заказами.</p>
                  <div className="portfolio-links">
                    <a href="https://dyutoys.ru" target="_blank" rel="noopener noreferrer" className="github-btn">
                      <GithubIcon />
                      Сайт
                    </a>
                  </div>
                </div>
                
                <div className="portfolio-item">
                  <h3>Tyler Thompson</h3>
                  <p>На этом сайте детальная проработка карточки товара с уникальными доработками функционала. Современный дизайн с адаптивной версткой и интерактивными элементами для демонстрации товаров.</p>
                  <div className="portfolio-links">
                    <a href="https://tylerthompson.ru/ultraarmorjacketv2" target="_blank" rel="noopener noreferrer" className="github-btn">
                      <GithubIcon />
                      Сайт
                    </a>
                  </div>
                </div>
                
                <div className="portfolio-item">
                  <h3>My Active To-Do</h3>
                  <p>Минималистичный удобный to-do. Приложение для управления задачами с чистым интерфейсом, интуитивной навигацией и возможностью отслеживания прогресса.</p>
                  <div className="portfolio-links">
                    <a href="https://github.com/kwtpub/my-active-to-d" target="_blank" rel="noopener noreferrer" className="github-btn">
                      <GithubIcon />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>Порядок сотрудничества</h2>
              <div className="cooperation-flow">
                <div className="flow-card">
                  <h3>ЗАЯВКА</h3>
                  <p>Оформи заявку на разработку или пришли мне твое техническое задание</p>
                </div>
                <div className="flow-card">
                  <h3>ПРЕДЛОЖЕНИЕ РЕШЕНИЯ</h3>
                  <p>Разработаю индивидуальное предложение, учитывая требования, и посчитаю стоимость</p>
                </div>
                <div className="flow-card">
                  <h3>СОГЛАСОВАНИЕ И РАЗРАБОТКА</h3>
                  <p>После согласования условий я организую разработку, контролируя качество и соблюдение сроков</p>
                </div>
                <div className="flow-card">
                  <h3>СОПРОВОЖДЕНИЕ И ПОДДЕРЖКА</h3>
                  <p>Даю гарантию на качество моей работы и готов решать любые возможные вопросы за тебя</p>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>Предложение по созданию сайта Vivat Boat</h2>
              <div className="project-plan">
                <div className="plan-section">
                  <h3>Структура сайта (6 страниц)</h3>
                  <div className="plan-grid">
                    <div className="plan-item">
                      <h4>Главная</h4>
                      <p>Презентация бренда и ключевых моделей</p>
                    </div>
                    <div className="plan-item">
                      <h4>О компании</h4>
                      <p>История верфи и производственные мощности</p>
                    </div>
                    <div className="plan-item">
                      <h4>Каталог лодок</h4>
                      <p>Модели с фильтрацией по типу и размеру</p>
                    </div>
                    <div className="plan-item expandable">
                      <h4>Конструктор лодок</h4>
                      <p>Интерактивный выбор модели и комплектации</p>
                      <details>
                        <summary>Подробнее</summary>
                        <p>Выбор модели, комплектации, цвета с визуализацией и расчетом стоимости</p>
                      </details>
                    </div>
                    <div className="plan-item">
                      <h4>Контакты</h4>
                      <p>Форма заказа звонка и карта</p>
                    </div>
                    <div className="plan-item">
                      <h4>Партнеры</h4>
                      <p>Информация о дилерах</p>
                    </div>
                  </div>
                </div>

                <div className="plan-section">
                  <h3>Дополнительные возможности</h3>
                  <div className="plan-grid">
                    <div className="plan-item expandable">
                      <h4>Медиа контент</h4>
                      <p>Видеообзоры и фотогалерея</p>
                      <details>
                        <summary>Подробнее</summary>
                        <p>Опционально, для наглядного представления лодок и производства</p>
                      </details>
                    </div>
                    <div className="plan-item">
                      <h4>Дизайн</h4>
                      <p>Индивидуальный современный дизайн</p>
                    </div>
                    <div className="plan-item">
                      <h4>Формы обратной связи</h4>
                      <p>Заказ звонка и заявки</p>
                    </div>
                  </div>
                </div>

                <div className="plan-section">
                  <h3>Технологии разработки</h3>
                  <div className="tech-stack">
                    <div className="tech-item">
                      <strong>Frontend:</strong> TypeScript + React, адаптивный интерфейс
                    </div>
                    <div className="tech-item">
                      <strong>Backend:</strong> Node.js с возможностью расширения
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>Сроки и стоимость</h2>
              <div className="timeline-cost">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3>Сроки разработки</h3>
                    <p>Полный цикл — до 2 недель</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3>Стоимость</h3>
                    <p>80 000 ₽ — только разработка (без дизайна)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>Условия оплаты</h2>
              <div className="payment">50% предоплата, 50% по завершению проекта</div>
            </div>
          </div>

        </section>

        <footer>
          <div>KWTPUB</div>
          <div>Рыбин Тимофей Вячеславович</div>
        </footer>
      </div>
    </div>
  );
};

export default CommercialProposal;
