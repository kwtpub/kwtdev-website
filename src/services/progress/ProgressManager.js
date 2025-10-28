import { getStore } from '@netlify/blobs';
import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';

/**
 * Главный класс для управления прогрессом обучения
 */
export class ProgressManager {
  constructor() {
    this.scheduler = new RepetitionScheduler();
    this.topics = new Map();
    this.isInitialized = false;
    this.store = null;
    
    // Инициализируем хранилище с правильными параметрами
    this.initializeStore();
  }

  /**
   * Инициализация хранилища с параметрами
   */
  initializeStore() {
    try {
      // Получаем параметры из переменных окружения
      const siteID = import.meta.env.VITE_NETLIFY_SITE_ID || process.env.NETLIFY_SITE_ID;
      const token = import.meta.env.VITE_NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN;
      
      if (siteID && token) {
        this.store = getStore({
          name: 'learning-progress',
          siteID: siteID,
          token: token
        });
        console.log('✅ Netlify Blobs инициализированы с параметрами');
      } else {
        console.warn('⚠️ Параметры Netlify Blobs не найдены, используем localStorage');
        this.store = null;
      }
    } catch (error) {
      console.error('❌ Ошибка инициализации Netlify Blobs:', error);
      this.store = null;
    }
  }

  /**
   * Инициализация - загрузка данных из хранилища
   */
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Проверяем доступность Blobs
      if (!this.store) {
        console.warn('Netlify Blobs не настроены, используем localStorage');
        this.loadFromLocalStorage();
        this.isInitialized = true;
        return;
      }

      const data = await this.store.get('topics');
      if (data) {
        const topicsData = JSON.parse(data);
        topicsData.forEach(topicData => {
          const topic = TopicProgress.fromJSON(topicData);
          this.topics.set(topic.topicId, topic);
        });
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Ошибка загрузки данных прогресса:', error);
      // Fallback на localStorage
      this.loadFromLocalStorage();
      this.isInitialized = true;
    }
  }

  /**
   * Fallback на localStorage для локальной разработки
   */
  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('learning-progress');
      if (data) {
        const topicsData = JSON.parse(data);
        topicsData.forEach(topicData => {
          const topic = TopicProgress.fromJSON(topicData);
          this.topics.set(topic.topicId, topic);
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error);
    }
  }

  /**
   * Сохранение данных в хранилище
   */
  async save() {
    try {
      const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
      
      if (this.store) {
        // Используем Netlify Blobs
        await this.store.set('topics', JSON.stringify(topicsData));
      } else {
        // Fallback на localStorage
        localStorage.setItem('learning-progress', JSON.stringify(topicsData));
      }
    } catch (error) {
      console.error('Ошибка сохранения данных прогресса:', error);
      // Fallback на localStorage
      try {
        const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
        localStorage.setItem('learning-progress', JSON.stringify(topicsData));
      } catch (localError) {
        console.error('Ошибка сохранения в localStorage:', localError);
      }
    }
  }

  /**
   * Создать или получить тему
   */
  getOrCreateTopic(topicId, topicName, totalLessons = 0) {
    if (!this.topics.has(topicId)) {
      const topic = new TopicProgress(topicId, topicName, totalLessons);
      this.topics.set(topicId, topic);
      this.save(); // Автосохранение
    }
    return this.topics.get(topicId);
  }

  /**
   * Завершить урок
   */
  async completeLesson(topicId) {
    const topic = this.topics.get(topicId);
    if (topic && topic.completeLesson()) {
      await this.save();
      return true;
    }
    return false;
  }

  /**
   * Завершить повторение
   */
  async completeRepetition(topicId, interval) {
    const topic = this.topics.get(topicId);
    if (topic && topic.completeRepetition(interval)) {
      await this.save();
      return true;
    }
    return false;
  }

  /**
   * Получить все темы
   */
  getAllTopics() {
    return Array.from(this.topics.values());
  }

  /**
   * Получить тему по ID
   */
  getTopic(topicId) {
    return this.topics.get(topicId);
  }

  /**
   * Получить данные для отображения всех тем
   */
  getDisplayData() {
    return Array.from(this.topics.values()).map(topic => topic.getDisplayData());
  }

  /**
   * Получить темы, готовые к повторению
   */
  getTopicsReadyForRepetition() {
    return this.scheduler.getTopicsReadyForRepetition(this.getAllTopics());
  }

  /**
   * Получить статистику
   */
  getStats() {
    return this.scheduler.getRepetitionStats(this.getAllTopics());
  }

  /**
   * Получить рекомендации
   */
  getRecommendations() {
    return this.scheduler.getStudyRecommendations(this.getAllTopics());
  }

  /**
   * Получить время до следующего повторения для темы
   */
  getTimeUntilNextRepetition(topicId) {
    const topic = this.topics.get(topicId);
    if (!topic) return null;
    return this.scheduler.getTimeUntilNextRepetition(topic);
  }

  /**
   * Проверить, нужно ли повторение для темы
   */
  needsRepetition(topicId) {
    const topic = this.topics.get(topicId);
    return topic ? topic.needsRepetition() : false;
  }

  /**
   * Получить следующий интервал для темы
   */
  getNextRepetitionInterval(topicId) {
    const topic = this.topics.get(topicId);
    return topic ? topic.getNextRepetitionInterval() : null;
  }

  /**
   * Сбросить прогресс темы (для тестирования)
   */
  async resetTopic(topicId) {
    this.topics.delete(topicId);
    await this.save();
  }

  /**
   * Сбросить весь прогресс (для тестирования)
   */
  async resetAll() {
    this.topics.clear();
    await this.save();
  }

  /**
   * Экспорт данных
   */
  exportData() {
    return {
      topics: Array.from(this.topics.values()).map(topic => topic.toJSON()),
      stats: this.getStats(),
      recommendations: this.getRecommendations(),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Импорт данных
   */
  async importData(data) {
    try {
      if (data.topics && Array.isArray(data.topics)) {
        this.topics.clear();
        data.topics.forEach(topicData => {
          const topic = TopicProgress.fromJSON(topicData);
          this.topics.set(topic.topicId, topic);
        });
        await this.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка импорта данных:', error);
      return false;
    }
  }
}
