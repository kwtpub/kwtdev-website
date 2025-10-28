import '../../../../App.css'
import HeaderIcons from '../../../../components/HeaderIcons';
import './Matrix.css'
import { createProgressManager } from '../../../../services/progress';
import { useState, useEffect } from 'react';

function Matrix() {
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
            id: 1,
            name: '1.1. Матрицы, действия над матрицами',
            description: 'Основные понятия, операции и свойства',
            subTopics: [
              { id: '1-1', name: 'Основные понятия' },
              { id: '1-2', name: 'Операции с матрицами' },
              { id: '1-3', name: 'Свойства операций' },
              { id: '1-4', name: 'Матричная форма записи системы линейных уравнений' }
            ]
          },
          {
            id: 2,
            name: '1.2. Определители и их свойства',
            description: 'Вычисление и применение определителей',
            subTopics: [
              { id: '2-1', name: 'Понятие определителя. Миноры и алгебраические дополнения' },
              { id: '2-2', name: 'Свойства определителей' }
            ]
          },
          {
            id: 3,
            name: '1.3. Системы линейных уравнений. Правило Крамера',
            description: 'Методы решения систем линейных уравнений',
            subTopics: [
              { id: '3-1', name: 'Множество решений системы линейных уравнений' },
              { id: '3-2', name: 'Правило Крамера' }
            ]
          },
          {
            id: 4,
            name: '1.4. Метод обратной матрицы',
            description: 'Решение систем через обратную матрицу',
            subTopics: [
              { id: '4-1', name: 'Обратная матрица. Существование обратной матрицы' },
              { id: '4-2', name: 'Решение систем линейных уравнений и матричных уравнений' }
            ]
          },
          {
            id: 5,
            name: '1.5. Метод Гаусса',
            description: 'Метод Гаусса и его применение',
            subTopics: [
              { id: '5-1', name: 'Элементарные преобразования уравнений системы' },
              { id: '5-2', name: 'Метод Гаусса в произвольных системах линейных уравнений' },
              { id: '5-3', name: 'Ранг матрицы. Теорема Кронекера-Капелли' },
              { id: '5-4', name: 'Однородные системы' }
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
        // Можно показать пользователю сообщение об ошибке
      }
    };

    initializeData();
  }, [progressManager]);

  // Обработчики действий
  const handleToggleRepetition = async (topicId, interval, isCompleted) => {
    try {
      let success;
      if (isCompleted) {
        // Если уже завершено - отменяем
        success = await progressManager.uncompleteRepetition(topicId, interval);
      } else {
        // Если не завершено - завершаем
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

  // ВРЕМЕННАЯ функция для сброса прогресса (удалить после обновления)
  const handleResetProgress = async () => {
    if (window.confirm('⚠️ Это сбросит весь прогресс и обновит структуру данных. Продолжить?')) {
      try {
        await progressManager.resetAll();
        console.log('✅ Прогресс сброшен. Перезагрузка...');
        window.location.reload();
      } catch (error) {
        console.error('❌ Ошибка сброса:', error);
      }
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
        
        {/* ВРЕМЕННАЯ КНОПКА - удалить после обновления структуры */}
        <button 
          onClick={handleResetProgress}
          style={{
            padding: '10px 20px',
            marginBottom: '20px',
            background: 'rgba(255, 100, 100, 0.2)',
            border: '1px solid rgba(255, 100, 100, 0.5)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          🗑️ Сбросить прогресс (обновить структуру)
        </button>
        
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

export default Matrix;
