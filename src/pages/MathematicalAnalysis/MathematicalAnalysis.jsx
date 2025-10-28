import '../../App.css'
import HeaderIcons from '../../components/HeaderIcons';
import './MathematicalAnalysis.css'
import { useState, useEffect } from 'react';
import { createProgressManager } from '../../services/progress';

function MathematicalAnalysis() {
  const [progressManager] = useState(() => createProgressManager());
  const [differentialProgress, setDifferentialProgress] = useState({ progress: 0, totalLessons: 0, completedLessons: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        await progressManager.initialize();
        
        // Получаем все топики
        const allTopics = progressManager.getAllTopics();
        
        // Фильтруем топики по Differential (id: d1-d8)
        const differentialTopics = allTopics.filter(t => typeof t.topicId === 'string' && t.topicId.startsWith('d'));
        
        // Считаем прогресс для Differential
        const differentialCompletedIntervals = differentialTopics.reduce((sum, topic) => sum + topic.completedLessons, 0);
        const differentialTotalIntervals = differentialTopics.reduce((sum, topic) => sum + topic.totalLessons, 0);
        const differentialOverallProgress = differentialTotalIntervals > 0 ? Math.round((differentialCompletedIntervals / differentialTotalIntervals) * 100) : 0;
        
        setDifferentialProgress({
          progress: differentialOverallProgress,
          totalLessons: differentialTopics.length,
          completedLessons: differentialTopics.filter(t => t.completedLessons === t.totalLessons).length
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
      name: 'Дифференциальное исчисление', 
      link: 'differential', 
      progress: differentialProgress.progress, 
      totalLessons: differentialProgress.totalLessons, 
      completedLessons: differentialProgress.completedLessons
    },
    {id: 2, name: 'Интегральное исчисление', link: 'integral', progress: 0, totalLessons: 0, completedLessons: 0},
  ]

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-contaiter">
        <h2>Математический анализ</h2>
        <h4 className="description-title">Трекер обучения с практикой по кривой Эббингауза</h4>
        
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

export default MathematicalAnalysis;

