function PriceListSection() {
  return (
    <section className="projects">
      <div className="projects-container projects-border-label">
        <h2 className="projects-label">Прайс лист</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <h3>Лендинг</h3>
            <p>от 15 000 ₽</p>
            <p>Одностраничный сайт, заточенный под конкретную цель: презентацию, продажу или сбор заявок.</p>
          </div>
          
          <div className="portfolio-item">
            <h3>Корпоративный сайт</h3>
            <p>от 35 000 ₽</p>
            <p>Структурированный сайт для бизнеса с несколькими разделами, блогом и адаптивным дизайном.</p>
          </div>
          
          <div className="portfolio-item">
            <h3>E-commerce (Tilda)</h3>
            <p>от 35 000 ₽</p>
            <p>Интернет-магазин на Tilda с интеграцией оплаты и аналитики.</p>
          </div>
          
          <div className="portfolio-item">
            <h3>E-commerce (код)</h3>
            <p>от 60 000 ₽</p>
            <p>Полноценный интернет-магазин с уникальным дизайном и кастомной логикой на коде.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceListSection;
