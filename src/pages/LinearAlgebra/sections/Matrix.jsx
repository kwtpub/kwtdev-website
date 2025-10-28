import '../../../App.css'
import HeaderIcons from '../../../components/HeaderIcons';
import './Matrix.css'

function Matrix() {
  const topics = [
    {
      id: 1,
      name: 'Основы матриц',
      description: 'Определение, типы и основные операции',
      progress: 100,
      totalLessons: 5,
      completedLessons: 5,
      practiceStatus: 'completed', // completed, current, upcoming
      repetitions: [
        { interval: 'Сразу после урока', completed: true },
        { interval: 'Через 24 часа', completed: true },
        { interval: 'Через неделю', completed: true },
        { interval: 'Через месяц', completed: true }
      ]
    },
    {
      id: 2,
      name: 'Умножение матриц',
      description: 'Правила и алгоритмы умножения',
      progress: 80,
      totalLessons: 8,
      completedLessons: 6,
      practiceStatus: 'current',
      repetitions: [
        { interval: 'Сразу после урока', completed: true },
        { interval: 'Через 24 часа', completed: true },
        { interval: 'Через неделю', completed: false },
        { interval: 'Через месяц', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Определители',
      description: 'Вычисление определителей различных порядков',
      progress: 40,
      totalLessons: 6,
      completedLessons: 2,
      practiceStatus: 'upcoming',
      repetitions: [
        { interval: 'Сразу после урока', completed: true },
        { interval: 'Через 24 часа', completed: false },
        { interval: 'Через неделю', completed: false },
        { interval: 'Через месяц', completed: false }
      ]
    },
    {
      id: 4,
      name: 'Обратные матрицы',
      description: 'Нахождение обратной матрицы',
      progress: 0,
      totalLessons: 7,
      completedLessons: 0,
      practiceStatus: 'upcoming',
      repetitions: [
        { interval: 'Сразу после урока', completed: false },
        { interval: 'Через 24 часа', completed: false },
        { interval: 'Через неделю', completed: false },
        { interval: 'Через месяц', completed: false }
      ]
    }
  ]

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

  return (
    <div className="portfolio-root">
      <HeaderIcons />
      <div className="title-container">
        <h2>Матрицы</h2>
        <h4 className="description-title">Трекер обучения с практикой по кривой Эббингауза</h4>
        
        <div className="topics-container">
          {topics.map((topic) => (
            <div className="topic-block" key={topic.id}>
              <div className="topic-header">
                <div className="topic-info">
                  <h3 className="topic-title">{topic.name}</h3>
                  <p className="topic-description">{topic.description}</p>
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
