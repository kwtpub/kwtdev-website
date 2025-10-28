import './University.css'
import '../App.css'
import HeaderIcons from '../components/HeaderIcons';

function University() {
  const subjects = [
    {id: 1, name: "Linear algebra", link: "linear-algebra"},
    {id: 2, name: "Mathematical analysis", link: "mathematical-analysis"}
  ]
  return (
    
    <div className="portfolio-root">


      <HeaderIcons />
      
      <div className="university__body">
        <h2 className="title-university">Links</h2>
        <div className="list-items-subjects">
        {subjects.map((subject) => (
            <a className="item-subject" href={`/#university/${subject.link}`} key={subject.id}>{subject.name}</a>
        ))}
        </div>
      </div>


  </div>);
}

export default University; 

