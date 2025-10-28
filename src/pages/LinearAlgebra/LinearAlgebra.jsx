
import '../../App.css'
import HeaderIcons from '../../components/HeaderIcons';
import './LinearAlgebra.css'

function LinearAlgebra() {
  const sections = [
    {id: 1, name: 'Matrix', link: 'matrix', progress: 75, totalLessons: 12, completedLessons: 9},
    {id: 2, name: 'Vectors', link: 'vectors', progress: 45, totalLessons: 8, completedLessons: 3},
    {id: 3, name: 'Determinants', link: 'determinants', progress: 20, totalLessons: 6, completedLessons: 1},
    {id: 4, name: 'Linear Transformations', link: 'transformations', progress: 0, totalLessons: 10, completedLessons: 0},
  ]

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-contaiter">
        <h2>Трекер обучения</h2>
        <h4 className="description-title">Применяя кривую Эббингауза</h4>
        
        <div className="sections-container">
          {sections.map((section) => (
            <a 
              href={`/#university/${section.link}`} 
              className="section-block" 
              key={section.id}
            >
              <div className="section-header">
                <h3 className="section-title">{section.name}</h3>
                <span className="section-progress-text">{section.completedLessons}/{section.totalLessons}</span>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${section.progress}%`}}
                  ></div>
                </div>
                <span className="progress-percentage">{section.progress}%</span>
              </div>
              
              <div className="section-stats">
                <div className="stat-item">
                  <span className="stat-label">Всего уроков:</span>
                  <span className="stat-value">{section.totalLessons}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Завершено:</span>
                  <span className="stat-value">{section.completedLessons}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Осталось:</span>
                  <span className="stat-value">{section.totalLessons - section.completedLessons}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinearAlgebra; 

