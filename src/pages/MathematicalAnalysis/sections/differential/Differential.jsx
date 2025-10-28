import '../../../../App.css'
import HeaderIcons from '../../../../components/HeaderIcons';
import './Differential.css'
import { createProgressManager } from '../../../../services/progress';
import { useState, useEffect } from 'react';

function Differential() {
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
            id: 'd1',
            name: '§ 1. Вещественные числа',
            description: 'Основы теории вещественных чисел',
            subTopics: [
              { id: 'd1-1', name: 'Свойства вещественных чисел' },
              { id: 'd1-2', name: 'Обозначения' }
            ]
          },
          {
            id: 'd2',
            name: '§ 2. Верхние и нижние грани множеств',
            description: 'Свойства ограниченных множеств',
            subTopics: [
              { id: 'd2-1', name: 'Свойства верхних и нижних граней множеств' },
              { id: 'd2-2', name: 'Сечения в множестве вещественных чисел' }
            ]
          },
          {
            id: 'd3',
            name: '§ 3. Предел последовательности',
            description: 'Теория пределов последовательностей',
            subTopics: [
              { id: 'd3-1', name: 'Определение предела последовательности и некоторые его свойства' },
              { id: 'd3-2', name: 'Пределы монотонных последовательностей' },
              { id: 'd3-3', name: 'Теорема Больцано—Вейерштрасса и критерий Коши' },
              { id: 'd3-4', name: 'Бесконечно малые и бесконечно большие последовательности' },
              { id: 'd3-5', name: 'Свойства пределов, связанные с арифметическими операциями над последовательностями' },
              { id: 'd3-6', name: 'Изображение вещественных чисел бесконечными десятичными дробями' },
              { id: 'd3-7', name: 'Счетность рациональных чисел. Несчетность вещественных чисел' },
              { id: 'd3-8', name: 'Верхний и нижний пределы последовательностей' }
            ]
          },
          {
            id: 'd4',
            name: '§ 4. Функции и их пределы',
            description: 'Понятие функции и предельные переходы',
            subTopics: [
              { id: 'd4-1', name: 'Понятие функции' },
              { id: 'd4-2', name: 'Способы задания функции' },
              { id: 'd4-3', name: 'Элементарные функции и их классификация' },
              { id: 'd4-4', name: 'Первое определение предела функции' },
              { id: 'd4-5', name: 'Второе определение предела функции' },
              { id: 'd4-6', name: 'Свойства пределов функций' },
              { id: 'd4-7', name: 'Бесконечно малые и бесконечно большие функции' },
              { id: 'd4-8', name: 'Пределы монотонных функций' },
              { id: 'd4-9', name: 'Критерий Коши существования предела функции' }
            ]
          },
          {
            id: 'd5',
            name: '§ 5. Непрерывность функции в точке',
            description: 'Определение и свойства непрерывных функций',
            subTopics: [
              { id: 'd5-1', name: 'Точки непрерывности и точки разрыва функции' },
              { id: 'd5-2', name: 'Свойство функций, непрерывных в точке' }
            ]
          },
          {
            id: 'd6',
            name: '§ 6. Свойства функций, непрерывных на промежутках',
            description: 'Теоремы о непрерывных функциях',
            subTopics: [
              { id: 'd6-1', name: 'Ограниченность непрерывных функций. Достижимость экстремальных значений' },
              { id: 'd6-2', name: 'Промежуточные значения непрерывной функции' },
              { id: 'd6-3', name: 'Обратные функции' }
            ]
          },
          {
            id: 'd7',
            name: '§ 7. Непрерывность элементарных функций',
            description: 'Исследование непрерывности основных функций',
            subTopics: [
              { id: 'd7-1', name: 'Многочлены и рациональные функции' },
              { id: 'd7-2', name: 'Показательная, логарифмическая и степенная функции' },
              { id: 'd7-3', name: 'Тригонометрические и обратные тригонометрические функции' }
            ]
          },
          {
            id: 'd8',
            name: '§ 8. Сравнение функций. Вычисление пределов',
            description: 'Методы вычисления пределов',
            subTopics: [
              { id: 'd8-1', name: 'Некоторые замечательные пределы' },
              { id: 'd8-2', name: 'Сравнение функций' },
              { id: 'd8-3', name: 'Эквивалентные функции' },
              { id: 'd8-4', name: 'Метод выделения главной части функции. Применение к вычислению пределов' }
            ]
          }
        ];

        topicConfigs.forEach(config => {
          // totalLessons = 4 (количество интервалов повторений)
          progressManager.getOrCreateTopic(config.id, config.name, 4, config.subTopics);
        });

        // Получаем только темы по дифференциальному исчислению (id начинается с 'd')
        const allTopics = progressManager.getAllTopics();
        const differentialTopics = allTopics.filter(t => typeof t.topicId === 'string' && t.topicId.startsWith('d'));
        const topicsData = differentialTopics.map(t => t.getDisplayData());
        
        // Считаем статистику только для тем дифф. исчисления
        const statsData = {
          total: differentialTopics.length,
          completed: differentialTopics.filter(t => t.completedLessons === t.totalLessons).length,
          inProgress: differentialTopics.filter(t => t.completedLessons > 0 && t.completedLessons < t.totalLessons).length,
          readyForRepetition: differentialTopics.filter(t => t.needsRepetition()).length
        };
        
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
        // Получаем только темы по дифф. исчислению
        const allTopics = progressManager.getAllTopics();
        const differentialTopics = allTopics.filter(t => typeof t.topicId === 'string' && t.topicId.startsWith('d'));
        const updatedTopics = differentialTopics.map(t => t.getDisplayData());
        const updatedStats = {
          total: differentialTopics.length,
          completed: differentialTopics.filter(t => t.completedLessons === t.totalLessons).length,
          inProgress: differentialTopics.filter(t => t.completedLessons > 0 && t.completedLessons < t.totalLessons).length,
          readyForRepetition: differentialTopics.filter(t => t.needsRepetition()).length
        };
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
      const allTopics = progressManager.getAllTopics();
      const differentialTopics = allTopics.filter(t => typeof t.topicId === 'string' && t.topicId.startsWith('d'));
      const updatedTopics = differentialTopics.map(t => t.getDisplayData());
      setTopics(updatedTopics);
    } catch (error) {
      console.error('❌ Ошибка изменения теории:', error);
    }
  };

  const handleToggleSubTopicPractice = async (topicId, subTopicId) => {
    try {
      await progressManager.toggleSubTopicPractice(topicId, subTopicId);
      const allTopics = progressManager.getAllTopics();
      const differentialTopics = allTopics.filter(t => typeof t.topicId === 'string' && t.topicId.startsWith('d'));
      const updatedTopics = differentialTopics.map(t => t.getDisplayData());
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
          <h2>Дифференциальное исчисление функций одного переменного</h2>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-container">
        <h2>Дифференциальное исчисление функций одного переменного</h2>
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

export default Differential;

