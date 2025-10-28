import GithubIcon from '../icon/GithubIcon';
import TelegramIcon from '../icon/TelegramIcon';
import EmailIcon from '../icon/EmailIcon';
import InstagramIcon from '../icon/InstagramIcon';

function HeaderIcons() {
  return (
    <div className="hero-icons-top">
      <div className="hero-avatar-top">
        <img src="https://res.cloudinary.com/dhx2rvn4s/image/upload/v1751044969/Pngtree_mountain_logo_design_vector_5286636_fqpzrl.jpg" alt="avatar" width={32} height={32} style={{objectFit: 'cover', borderRadius: 8}} />
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
  );
}

export default HeaderIcons;
