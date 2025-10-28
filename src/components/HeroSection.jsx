import BotSticker from '../stickers/BotSticker';

function HeroSection() {
  return (
    <section className="hero hero-row">
      <div className="hero-main-bordered">
        <div className="hero-main-flex">
          <BotSticker width={110} height={110} />
          <div className="hero-main-content">
            <div className="hero-title-row">
              <h1>KWTPUB</h1>
            </div>
            <p className="desc">Fullstack разработчик с 3х-летним стажем — быстрые, минималистичные сайты и продуктовые интерфейсы. Широкий спектр возможностей и навыков: полный цикл разработки, деплой и поддержка.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
