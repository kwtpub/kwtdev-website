import React from 'react';
import './CommercialProposal.css';

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
            <div className="subtitle">Fullstack разработчик с 3-летним стажем — быстрые, минималистичные сайты и продуктовые интерфейсы. Широкий спектр возможностей и навыков: полный цикл разработки, деплой и поддержка.</div>
            </div>
            <div className="section">
              <h2 id="services">Навыки</h2>
              <div className="list">
                <div className="muted">• Интеграция платежных систем (Stripe, PayPal, Яндекс.Касса)</div>
                <div className="muted">• Создание каталогов товаров и услуг</div>
                <div className="muted">• Система регистрации и авторизации пользователей</div>
                <div className="muted">• Разработка Telegram ботов и автоматизация</div>
              </div>
            </div>

            <div className="section">
              <h2>Порядок сотрудничества</h2>
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

            <div className="section">
              <h2>Предложение по созданию сайта для производства лодок Vivat Boat</h2>
              <div className="project-plan">
                <div className="plan-section">
                  <h3>Структура сайта (6 страниц)</h3>
                  <div className="plan-grid">
                    <div className="plan-item">
                      <h4>Главная</h4>
                      <p>Презентация бренда и ключевых моделей лодок, акцент на качество и преимущества</p>
                    </div>
                    <div className="plan-item">
                      <h4>О компании</h4>
                      <p>Информация о верфи, истории и производственных мощностях</p>
                    </div>
                    <div className="plan-item">
                      <h4>Каталог лодок</h4>
                      <p>Полный перечень моделей с фильтрацией по типу, размеру и комплектации</p>
                    </div>
                    <div className="plan-item expandable">
                      <h4>Конструктор лодок</h4>
                      <p>Интерактивный модуль выбора модели, комплектации, цвета с визуализацией</p>
                      <details>
                        <summary>Подробнее</summary>
                        <p>Пользователь выбирает модель, комплектацию, цвет и видит визуализацию лодки. Итоговая стоимость отображается для справки, без возможности онлайн-оплаты.</p>
                      </details>
                    </div>
                    <div className="plan-item">
                      <h4>Контакты</h4>
                      <p>Форма «Заказать звонок» и карта с расположением верфи</p>
                    </div>
                    <div className="plan-item">
                      <h4>Партнеры</h4>
                      <p>Информация о партнерах и дилерах</p>
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
                      <p>Индивидуальный современный дизайн по запросу клиента</p>
                    </div>
                    <div className="plan-item">
                      <h4>Формы обратной связи</h4>
                      <p>Заказ звонка и отправка заявки</p>
                    </div>
                  </div>
                </div>

                <div className="plan-section">
                  <h3>Технологии разработки</h3>
                  <div className="tech-stack">
                    <div className="tech-item">
                      <strong>Frontend:</strong> TypeScript + React, адаптивный и современный интерфейс
                    </div>
                    <div className="tech-item">
                      <strong>Backend:</strong> Node.js, с возможностью последующего расширения функционала
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
                    <p>Полный цикл — до 2 недель, включая тестирование и развёртывание</p>
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
              <div className="payment">50% предоплата, 50% по завершении проекта (возможна гибкая схема).</div>
            </div>
          </div>

        </section>

        <footer>
          <div>KWTPUB — студия разработки и дизайна</div>
          <div>Рыбин Тимофей Вячеславович • timofei@kwtpub.dev</div>
        </footer>
      </div>
    </div>
  );
};

export default CommercialProposal;
