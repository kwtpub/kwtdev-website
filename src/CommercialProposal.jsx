import React from 'react';
import './CommercialProposal.css';

const CommercialProposal = () => {
  return (
    <div className="commercial-proposal">
      <div className="wrap">
        <header>
          <div className="logo">VOID</div>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#cases">Cases</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="cta-btn" href="mailto:hello@voidlab.ru">Get in touch</a>
        </header>

        <section className="hero">
          <div className="hero-content">
            <div className="kicker">Коммерческое предложение</div>
            <h1 className="title">STUDIO VOIDLAB</h1>
            <div className="subtitle">1 разработчик + 1 дизайнер — быстрые, минималистичные сайты и продуктовые интерфейсы. Полный цикл: дизайн, разработка, деплой и поддержка.</div>

            <div className="section">
              <h2 id="services">Услуги</h2>
              <div className="list">
                <div className="muted">• Дизайн продукта и прототипы</div>
                <div className="muted">• Вёрстка и программирование (React/Next.js, TypeScript)</div>
                <div className="muted">• UX/UI-дизайн и дизайн-системы</div>
                <div className="muted">• Доработка, интеграции и поддержка</div>
              </div>
            </div>

            <div className="section">
              <h2>Пакеты</h2>
              <div className="packages">
                <div className="card">
                  <h3>Базовый</h3>
                  <div className="price">40 000 ₽</div>
                  <p>До 3 страниц, адаптивный дизайн</p>
                </div>
                <div className="card">
                  <h3>Стандартный</h3>
                  <div className="price">80 000 ₽</div>
                  <p>До 5 страниц и базовые интеграции</p>
                </div>
                <div className="card">
                  <h3>Премиум</h3>
                  <div className="price">150 000 ₽</div>
                  <p>Весь сайт — дизайн, frontend, backend, деплой</p>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>Условия оплаты</h2>
              <div className="payment">50% предоплата, 50% по завершении проекта (возможна гибкая схема).</div>
            </div>
          </div>

          <div className="hero-side">
            <div className="green-pill">JUST DO IT</div>
            <a className="cta-btn" href="mailto:hello@voidlab.ru">Связаться</a>
          </div>
        </section>

        <footer>
          <div>VoidLab — студия разработки и дизайна</div>
          <div>ИНН: 1234567890 • hello@voidlab.ru</div>
        </footer>
      </div>
    </div>
  );
};

export default CommercialProposal;
