
import '../../App.css'
import HeaderIcons from '../../components/HeaderIcons';
import './LinearAlgebra.css'
import { useState, useEffect } from 'react';
import { createProgressManager } from '../../services/progress';

function LinearAlgebra() {
  const [progressManager] = useState(() => createProgressManager());
  const [matrixProgress, setMatrixProgress] = useState({ progress: 0, totalLessons: 0, completedLessons: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        await progressManager.initialize();
        
        // Получаем все топики и считаем общий прогресс для Matrix
        const allTopics = progressManager.getAllTopics();
        const totalTopics = allTopics.length;
        const completedIntervals = allTopics.reduce((sum, topic) => sum + topic.completedLessons, 0);
        const totalIntervals = allTopics.reduce((sum, topic) => sum + topic.totalLessons, 0);
        const overallProgress = totalIntervals > 0 ? Math.round((completedIntervals / totalIntervals) * 100) : 0;
        
        setMatrixProgress({
          progress: overallProgress,
          totalLessons: totalTopics,
          completedLessons: allTopics.filter(t => t.completedLessons === t.totalLessons).length
        });
        
        setLoading(false);
      } catch (error) {
        console.error('❌ Ошибка загрузки прогресса:', error);
        setLoading(false);
      }
    };
    
    loadProgress();
  }, [progressManager]);

  const sections = [
    {
      id: 1, 
      name: 'Matrix', 
      link: 'matrix', 
      progress: matrixProgress.progress, 
      totalLessons: matrixProgress.totalLessons, 
      completedLessons: matrixProgress.completedLessons
    },
    {id: 2, name: 'Vectors', link: 'vectors', progress: 0, totalLessons: 0, completedLessons: 0},
    {id: 3, name: 'Determinants', link: 'determinants', progress: 0, totalLessons: 0, completedLessons: 0},
    {id: 4, name: 'Linear Transformations', link: 'transformations', progress: 0, totalLessons: 0, completedLessons: 0},
  ]

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-contaiter">
        <h2>Трекер обучения</h2>
        <h4 className="description-title">Применяя кривую Эббингауза</h4>
        
        {loading && (
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>Загрузка прогресса...</p>
        )}
        
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

