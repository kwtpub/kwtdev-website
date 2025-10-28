import BuildingIcon from '../icon/BuildingIcon';
import TelegramIcon from '../icon/TelegramIcon';

function SkillsSection() {
  return (
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
  );
}

export default SkillsSection;
