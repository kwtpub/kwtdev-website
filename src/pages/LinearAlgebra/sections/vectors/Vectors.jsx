import '../../../../App.css'
import HeaderIcons from '../../../../components/HeaderIcons';
import './Vectors.css'
import { createProgressManager } from '../../../../services/progress';
import { useState, useEffect } from 'react';

function Vectors() {
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
            id: 'v1',
            name: '2.1. Понятие вектора и линейные операции',
            description: 'Основные понятия и операции с векторами',
            subTopics: [
              { id: 'v1-1', name: 'Понятие геометрического вектора' },
              { id: 'v1-2', name: 'Линейные операции с векторами' },
              { id: 'v1-3', name: 'Свойства линейных операций с векторами' },
              { id: 'v1-4', name: 'Линейные комбинации векторов' },
              { id: 'v1-5', name: 'Линейно независимые и линейно зависимые векторы' },
              { id: 'v1-6', name: 'Линейные комбинации двух векторов' },
              { id: 'v1-7', name: 'Линейные комбинации трех векторов' },
              { id: 'v1-8', name: 'Линейная зависимость четырех векторов' },
              { id: 'v1-9', name: 'Понятие базиса. Координаты вектора' }
            ]
          },
          {
            id: 'v2',
            name: '2.2. Скалярное произведение векторов',
            description: 'Определение и свойства скалярного произведения',
            subTopics: [
              { id: 'v2-1', name: 'Угол между векторами. Проекция вектора на ось' },
              { id: 'v2-2', name: 'Определение скалярного произведения' },
              { id: 'v2-3', name: 'Алгебраические свойства скалярного произведения' },
              { id: 'v2-4', name: 'Геометрические свойства скалярного произведения' },
              { id: 'v2-5', name: 'Выражение скалярного произведения через координаты' }
            ]
          },
          {
            id: 'v3',
            name: '2.3. Векторное и смешанное произведения',
            description: 'Векторное и смешанное произведения векторов',
            subTopics: [
              { id: 'v3-1', name: 'Ориентация тройки векторов' },
              { id: 'v3-2', name: 'Векторное произведение двух векторов' },
              { id: 'v3-3', name: 'Смешанное произведение трех векторов и его свойства' },
              { id: 'v3-4', name: 'Алгебраические свойства векторного произведения' },
              { id: 'v3-5', name: 'Вычисление в ортонормированном базисе' }
            ]
          },
          {
            id: 'v4',
            name: '2.4. Условия коллинеарности, ортогональности и компланарности',
            description: 'Условия взаимного расположения векторов',
            subTopics: [
              { id: 'v4-1', name: 'Условия коллинеарности' },
              { id: 'v4-2', name: 'Условия ортогональности' },
              { id: 'v4-3', name: 'Условия компланарности' }
            ]
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

  const handleToggleSubTopicTheory = async (topicId, subTopicId) => {
    try {
      await progressManager.toggleSubTopicTheory(topicId, subTopicId);
      const updatedTopics = progressManager.getDisplayData();
      setTopics(updatedTopics);
    } catch (error) {
      console.error('❌ Ошибка изменения теории:', error);
    }
  };

  const handleToggleSubTopicPractice = async (topicId, subTopicId) => {
    try {
      await progressManager.toggleSubTopicPractice(topicId, subTopicId);
      const updatedTopics = progressManager.getDisplayData();
      setTopics(updatedTopics);
    } catch (error) {
      console.error('❌ Ошибка изменения практики:', error);
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
          <h2>Векторы</h2>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-container">
        <h2>Векторы</h2>
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

              {topic.subTopics && topic.subTopics.length > 0 && (
                <div className="subtopics-section">
                  <h4 className="subtopics-title">Подпункты темы</h4>
                  <div className="subtopics-list">
                    {topic.subTopics.map((subTopic) => (
                      <div key={subTopic.id} className="subtopic-item">
                        <div className="subtopic-name">{subTopic.name}</div>
                        <div className="subtopic-checkboxes">
                          <button
                            className={`subtopic-checkbox ${subTopic.theory.completed ? 'checked' : ''}`}
                            onClick={() => handleToggleSubTopicTheory(topic.id, subTopic.id)}
                            title="Теория"
                          >
                            <span className="checkbox-icon">{subTopic.theory.completed ? '✓' : ''}</span>
                            <span className="checkbox-label">Теория</span>
                          </button>
                          <button
                            className={`subtopic-checkbox ${subTopic.practice.completed ? 'checked' : ''}`}
                            onClick={() => handleToggleSubTopicPractice(topic.id, subTopic.id)}
                            title="Практика"
                          >
                            <span className="checkbox-icon">{subTopic.practice.completed ? '✓' : ''}</span>
                            <span className="checkbox-label">Практика</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vectors;

