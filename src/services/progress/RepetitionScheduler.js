/**
 * Класс для планирования повторений по кривой Эббингауза
 */
export class RepetitionScheduler {
  constructor() {
    this.intervals = {
      immediate: { name: 'Сразу после урока', hours: 0 },
      day1: { name: 'Через 24 часа', hours: 24 },
      week1: { name: 'Через неделю', hours: 24 * 7 },
      month1: { name: 'Через месяц', hours: 24 * 30 }
    };
  }

  /**
   * Получить следующий интервал для повторения
   */
  getNextInterval(topicProgress) {
    const { immediate, day1, week1, month1 } = topicProgress.repetitions;
    
    if (!immediate.completed) return 'immediate';
    if (!day1.completed) return 'day1';
    if (!week1.completed) return 'week1';
    if (!month1.completed) return 'month1';
    return null;
  }

  /**
   * Проверить, готово ли повторение
   */
  isRepetitionReady(topicProgress, interval) {
    if (!topicProgress.lastStudied) return false;
    
    const lastStudied = new Date(topicProgress.lastStudied);
    const now = new Date();
    const intervalHours = this.intervals[interval].hours;
    const nextRepetitionTime = new Date(lastStudied.getTime() + intervalHours * 60 * 60 * 1000);
    
    return now >= nextRepetitionTime;
  }

  /**
   * Получить время до следующего повторения
   */
  getTimeUntilNextRepetition(topicProgress) {
    const nextInterval = this.getNextInterval(topicProgress);
    if (!nextInterval || !topicProgress.lastStudied) return null;

    const lastStudied = new Date(topicProgress.lastStudied);
    const intervalHours = this.intervals[nextInterval].hours;
    const nextRepetitionTime = new Date(lastStudied.getTime() + intervalHours * 60 * 60 * 1000);
    const now = new Date();
    
    const diffMs = nextRepetitionTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return { ready: true, timeString: 'Готово к повторению' };
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    let timeString = '';
    if (days > 0) timeString += `${days}д `;
    if (hours > 0) timeString += `${hours}ч `;
    if (minutes > 0) timeString += `${minutes}м`;
    
    return { 
      ready: false, 
      timeString: timeString.trim() || 'Менее минуты',
      nextInterval: nextInterval
    };
  }

  /**
   * Получить все темы, готовые к повторению
   */
  getTopicsReadyForRepetition(topics) {
    return topics.filter(topic => {
      const nextInterval = this.getNextInterval(topic);
      return nextInterval && this.isRepetitionReady(topic, nextInterval);
    });
  }

  /**
   * Получить статистику повторений
   */
  getRepetitionStats(topics) {
    const stats = {
      total: topics.length,
      completed: 0,
      inProgress: 0,
      upcoming: 0,
      readyForRepetition: 0
    };

    topics.forEach(topic => {
      const status = topic.getPracticeStatus();
      switch (status) {
        case 'completed':
          stats.completed++;
          break;
        case 'current':
          stats.inProgress++;
          break;
        case 'upcoming':
          stats.upcoming++;
          break;
      }

      if (topic.needsRepetition()) {
        stats.readyForRepetition++;
      }
    });

    return stats;
  }

  /**
   * Получить рекомендации по изучению
   */
  getStudyRecommendations(topics) {
    const recommendations = [];
    
    // Темы, готовые к повторению
    const readyTopics = this.getTopicsReadyForRepetition(topics);
    if (readyTopics.length > 0) {
      recommendations.push({
        type: 'repetition',
        priority: 'high',
        message: `${readyTopics.length} тем готовы к повторению`,
        topics: readyTopics.map(t => t.topicName)
      });
    }

    // Темы с низким прогрессом
    const lowProgressTopics = topics.filter(t => t.getProgressPercentage() < 30);
    if (lowProgressTopics.length > 0) {
      recommendations.push({
        type: 'study',
        priority: 'medium',
        message: `${lowProgressTopics.length} тем требуют внимания`,
        topics: lowProgressTopics.map(t => t.topicName)
      });
    }

    return recommendations;
  }
}
