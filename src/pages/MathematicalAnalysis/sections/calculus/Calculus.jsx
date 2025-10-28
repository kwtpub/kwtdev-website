import '../../../../App.css'
import HeaderIcons from '../../../../components/HeaderIcons';
import './Calculus.css'
import { createProgressManager } from '../../../../services/progress';
import { useState, useEffect } from 'react';

function Calculus() {
  const [progressManager] = useState(() => createProgressManager());
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Инициализация данных
  useEffect(() => {
    const initializeData = async () => {
      try {
        await progressManager.initialize();
        
        // Создаем темы если их нет (totalLessons = 4 интервала повторений)
        const topicConfigs = [
          {
            id: 'c1',
            name: 'Вещественные числа',
            description: 'Множества, операции, свойства вещественных чисел',
            subTopics: []
          },
          {
            id: 'c2',
            name: 'Обозначения',
            description: 'Математические обозначения и символика',
            subTopics: []
          },
          {
            id: 'c3',
            name: 'Предел последовательности',
            description: 'Определение и свойства пределов последовательностей',
            subTopics: []
          },
          {
            id: 'c4',
            name: 'Функции и их пределы',
            description: 'Понятие функции, предел функции в точке и на бесконечности',
            subTopics: []
          },
          {
            id: 'c5',
            name: 'Непрерывность функции в точке',
            description: 'Определение непрерывности, точки разрыва, классификация',
            subTopics: []
          },
          {
            id: 'c6',
            name: 'Свойства функций, непрерывных на промежутках',
            description: 'Теоремы о непрерывных функциях, промежуточные значения',
            subTopics: []
          }
        ];

        topicConfigs.forEach(config => {
          // totalLessons = 4 (количество интервалов повторений)
          progressManager.getOrCreateTopic(config.id, config.name, 4, config.subTopics);
        });

        const topicsData = progressManager.getDisplayData();
        const statsData = progressManager.getStats();
        
        setTopics(topicsData);
        setStats(statsData);
        setLoading(false);
      } catch (error) {
        console.error('❌ Ошибка инициализации ProgressManager:', error);
        setLoading(false);
      }
    };

    initializeData();
  }, [progressManager]);

  // Обработчики действий
  const handleToggleRepetition = async (topicId, interval, isCompleted) => {
    try {
      let success;
      if (isCompleted) {
        success = await progressManager.uncompleteRepetition(topicId, interval);
      } else {
        success = await progressManager.completeRepetition(topicId, interval);
      }
      
      if (success) {
        const updatedTopics = progressManager.getDisplayData();
        const updatedStats = progressManager.getStats();
        setTopics(updatedTopics);
        setStats(updatedStats);
      }
    } catch (error) {
      console.error('❌ Ошибка изменения повторения:', error);
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
          <h2>Основы математического анализа</h2>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-container">
        <h2>Основы математического анализа</h2>
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
                  <p className="topic-description">Тема по математическому анализу</p>
                </div>
                <div className="topic-status">
                  <span className={`status-badge ${getStatusClass(topic.practiceStatus)}`}>
                    {getStatusText(topic.practiceStatus)}
                  </span>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-info-header">
                  <h4 className="progress-title">Прогресс повторений</h4>
                  <div className="progress-stats">
                    <span className="progress-count">{topic.completedLessons}/{topic.totalLessons}</span>
                    <span className="progress-percentage">{topic.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${topic.progress}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="practice-section">
                <h4 className="practice-title">Нажмите когда выполните повторение</h4>
                <div className="repetitions-grid">
                  {topic.repetitions.map((rep, index) => (
                    <button
                      key={index}
                      className={`repetition-card ${rep.completed ? 'completed' : 'pending'}`}
                      onClick={() => handleToggleRepetition(topic.id, rep.key, rep.completed)}
                      title={rep.completed ? 'Нажмите чтобы отменить' : 'Нажмите чтобы отметить как выполненное'}
                    >
                      <div className="repetition-icon">
                        {rep.completed ? '✓' : '○'}
                      </div>
                      <div className="repetition-info">
                        <span className="repetition-label">{rep.interval}</span>
                        <span className="repetition-status">
                          {rep.completed ? 'Выполнено' : 'Не выполнено'}
                        </span>
                      </div>
                    </button>
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

export default Calculus;

