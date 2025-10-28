/**
 * Класс для управления прогрессом отдельной темы
 */
export class TopicProgress {
  constructor(topicId, topicName, totalLessons = 0) {
    this.topicId = topicId;
    this.topicName = topicName;
    this.totalLessons = totalLessons;
    this.completedLessons = 0;
    this.lastStudied = null;
    this.repetitions = {
      immediate: { completed: false, completedAt: null },
      day1: { completed: false, completedAt: null },
      week1: { completed: false, completedAt: null },
      month1: { completed: false, completedAt: null }
    };
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Завершить урок
   */
  completeLesson() {
    if (this.completedLessons < this.totalLessons) {
      this.completedLessons++;
      this.lastStudied = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      
      // Автоматически отмечаем первое повторение как завершенное
      if (!this.repetitions.immediate.completed) {
        this.competitions.immediate.completed = true;
        this.repetitions.immediate.completedAt = new Date().toISOString();
      }
      
      return true;
    }
    return false;
  }

  /**
   * Завершить повторение по интервалу
   */
  completeRepetition(interval) {
    if (this.repetitions[interval]) {
      this.repetitions[interval].completed = true;
      this.repetitions[interval].completedAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  /**
   * Получить прогресс в процентах
   */
  getProgressPercentage() {
    if (this.totalLessons === 0) return 0;
    return Math.round((this.completedLessons / this.totalLessons) * 100);
  }

  /**
   * Получить статус практики
   */
  getPracticeStatus() {
    const { immediate, day1, week1, month1 } = this.repetitions;
    
    if (month1.completed) return 'completed';
    if (week1.completed) return 'current';
    if (day1.completed) return 'current';
    if (immediate.completed) return 'current';
    return 'upcoming';
  }

  /**
   * Проверить, нужно ли делать повторение
   */
  needsRepetition() {
    const now = new Date();
    const lastStudied = this.lastStudied ? new Date(this.lastStudied) : null;
    
    if (!lastStudied) return false;

    const { immediate, day1, week1, month1 } = this.repetitions;
    
    // Проверяем интервалы по порядку
    if (!immediate.completed) return true;
    
    const day1Time = new Date(lastStudied.getTime() + 24 * 60 * 60 * 1000);
    if (!day1.completed && now >= day1Time) return true;
    
    const week1Time = new Date(lastStudied.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (!week1.completed && now >= week1Time) return true;
    
    const month1Time = new Date(lastStudied.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (!month1.completed && now >= month1Time) return true;
    
    return false;
  }

  /**
   * Получить следующий интервал для повторения
   */
  getNextRepetitionInterval() {
    const { immediate, day1, week1, month1 } = this.repetitions;
    
    if (!immediate.completed) return 'immediate';
    if (!day1.completed) return 'day1';
    if (!week1.completed) return 'week1';
    if (!month1.completed) return 'month1';
    return null;
  }

  /**
   * Получить данные для отображения
   */
  getDisplayData() {
    return {
      id: this.topicId,
      name: this.topicName,
      progress: this.getProgressPercentage(),
      totalLessons: this.totalLessons,
      completedLessons: this.completedLessons,
      practiceStatus: this.getPracticeStatus(),
      repetitions: [
        { 
          interval: 'Сразу после урока', 
          completed: this.repetitions.immediate.completed,
          key: 'immediate'
        },
        { 
          interval: 'Через 24 часа', 
          completed: this.repetitions.day1.completed,
          key: 'day1'
        },
        { 
          interval: 'Через неделю', 
          completed: this.repetitions.week1.completed,
          key: 'week1'
        },
        { 
          interval: 'Через месяц', 
          completed: this.repetitions.month1.completed,
          key: 'month1'
        }
      ],
      needsRepetition: this.needsRepetition(),
      nextInterval: this.getNextRepetitionInterval()
    };
  }

  /**
   * Сериализация для сохранения
   */
  toJSON() {
    return {
      topicId: this.topicId,
      topicName: this.topicName,
      totalLessons: this.totalLessons,
      completedLessons: this.completedLessons,
      lastStudied: this.lastStudied,
      repetitions: this.repetitions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Десериализация из сохраненных данных
   */
  static fromJSON(data) {
    const topic = new TopicProgress(data.topicId, data.topicName, data.totalLessons);
    topic.completedLessons = data.completedLessons || 0;
    topic.lastStudied = data.lastStudied;
    topic.repetitions = data.repetitions || topic.repetitions;
    topic.createdAt = data.createdAt || topic.createdAt;
    topic.updatedAt = data.updatedAt || topic.updatedAt;
    return topic;
  }
}
