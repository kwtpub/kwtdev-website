import '../../../../App.css'
import HeaderIcons from '../../../../components/HeaderIcons';
import './Matrix.css'
import { ProgressManager } from '../../../../services/progress';
import { useState, useEffect } from 'react';

function Matrix() {
  const [progressManager] = useState(() => new ProgressManager());
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Инициализация данных
  useEffect(() => {
    const initializeData = async () => {
      await progressManager.initialize();
      
      // Создаем темы если их нет
      const topicConfigs = [
        { id: 1, name: 'Основы матриц', description: 'Определение, типы и основные операции', totalLessons: 5 },
        { id: 2, name: 'Умножение матриц', description: 'Правила и алгоритмы умножения', totalLessons: 8 },
        { id: 3, name: 'Определители', description: 'Вычисление определителей различных порядков', totalLessons: 6 },
        { id: 4, name: 'Обратные матрицы', description: 'Нахождение обратной матрицы', totalLessons: 7 }
      ];

      topicConfigs.forEach(config => {
        progressManager.getOrCreateTopic(config.id, config.name, config.totalLessons);
      });

      const topicsData = progressManager.getDisplayData();
      const statsData = progressManager.getStats();
      
      setTopics(topicsData);
      setStats(statsData);
      setLoading(false);
    };

    initializeData();
  }, [progressManager]);

  // Обработчики действий
  const handleCompleteLesson = async (topicId) => {
    const success = await progressManager.completeLesson(topicId);
    if (success) {
      const updatedTopics = progressManager.getDisplayData();
      const updatedStats = progressManager.getStats();
      setTopics(updatedTopics);
      setStats(updatedStats);
    }
  };

  const handleCompleteRepetition = async (topicId, interval) => {
    const success = await progressManager.completeRepetition(topicId, interval);
    if (success) {
      const updatedTopics = progressManager.getDisplayData();
      const updatedStats = progressManager.getStats();
      setTopics(updatedTopics);
      setStats(updatedStats);
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Завершено'
      case 'current': return 'Текущая практика'
      case 'upcoming': return 'Предстоит'
      default: return 'Не начато'
    }
  }

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed'
      case 'current': return 'status-current'
      case 'upcoming': return 'status-upcoming'
      default: return 'status-default'
    }
  }

  if (loading) {
    return (
      <div className="portfolio-root">
        <HeaderIcons />
        <div className="title-container">
          <h2>Матрицы</h2>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-container">
        <h2>Матрицы</h2>
        <h4 className="description-title">Трекер обучения с практикой по кривой Эббингауза</h4>
        
        {stats && (
          <div className="stats-container">
            <div className="stat-card">
              <h3>Статистика</h3>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="stat-number">{stats.total}</span>
                  <span className="stat-label">Всего тем</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.completed}</span>
                  <span className="stat-label">Завершено</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.inProgress}</span>
                  <span className="stat-label">В процессе</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.readyForRepetition}</span>
                  <span className="stat-label">Готовы к повторению</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="topics-container">
          {topics.map((topic) => (
            <div className="topic-block" key={topic.id}>
              <div className="topic-header">
                <div className="topic-info">
                  <h3 className="topic-title">{topic.name}</h3>
                  <p className="topic-description">Тема по линейной алгебре</p>
                </div>
                <div className="topic-status">
                  <span className={`status-badge ${getStatusClass(topic.practiceStatus)}`}>
                    {getStatusText(topic.practiceStatus)}
                  </span>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${topic.progress}%`}}
                    ></div>
                  </div>
                  <span className="progress-percentage">{topic.progress}%</span>
                </div>
                <div className="lessons-info">
                  <span className="lessons-text">{topic.completedLessons}/{topic.totalLessons} уроков</span>
                  <button 
                    className="complete-lesson-btn"
                    onClick={() => handleCompleteLesson(topic.id)}
                    disabled={topic.completedLessons >= topic.totalLessons}
                  >
                    Завершить урок
                  </button>
                </div>
              </div>

              <div className="practice-section">
                <h4 className="practice-title">Практика по кривой Эббингауза</h4>
                <div className="repetitions-grid">
                  {topic.repetitions.map((rep, index) => (
                    <div 
                      key={index} 
                      className={`repetition-item ${rep.completed ? 'completed' : 'pending'}`}
                    >
                      <div className="repetition-circle">
                        {rep.completed && <span className="checkmark">✓</span>}
                      </div>
                      <span className="repetition-label">{rep.interval}</span>
                      {!rep.completed && topic.needsRepetition && (
                        <button 
                          className="complete-repetition-btn"
                          onClick={() => handleCompleteRepetition(topic.id, rep.key)}
                        >
                          ✓
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matrix;
