import './University.css'
import GithubIcon from '../icon/GithubIcon';
import TelegramIcon from '../icon/TelegramIcon';
import EmailIcon from '../icon/EmailIcon';
import InstagramIcon from '../icon/InstagramIcon';
import BuildingIcon from '../icon/BuildingIcon';
import BotSticker from '../stickers/BotSticker';
import '../App.css'

function University() {
  const subjects = [
    {id: 1, name: "Linear algebra", link: "#linear-algebra"},
    {id: 2, name: "Mathematical analysis", link: "/#mathematical-analysis"}
  ]
  return (
    
    <div className="portfolio-root">


         {/* Header */}
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
      
      <div className="university__body">
        <h2 className="title-university">Links</h2>
        <div className="list-items-subjects">
        {subjects.map((subject) => (
            <a className="item-subject" href={subject.link} key={subject.id}>{subject.name}</a>
        ))}
        </div>
      </div>


  </div>);
}

export default University; 

