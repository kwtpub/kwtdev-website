import { getStore } from '@netlify/blobs';
import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';

/**
 * Главный класс для управления прогрессом обучения (только Netlify Blobs)
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
      
      // Проверяем, что мы в браузере и есть необходимые параметры
      if (typeof window !== 'undefined' && siteID && token) {
        try {
          // Проверяем, что fetch доступен и работает корректно
          if (typeof fetch === 'function') {
            this.store = getStore({
              name: 'learning-progress',
              siteID: siteID,
              token: token
            });
            console.log('✅ Netlify Blobs инициализированы с параметрами');
          } else {
            throw new Error('Fetch API недоступен');
          }
        } catch (blobsError) {
          console.error('❌ Ошибка создания Netlify Blobs store:', blobsError);
          throw new Error('Netlify Blobs недоступны');
        }
      } else {
        console.error('❌ Параметры Netlify Blobs не найдены');
        throw new Error('Необходимы параметры VITE_NETLIFY_SITE_ID и VITE_NETLIFY_BLOBS_TOKEN');
      }
    } catch (error) {
      console.error('❌ Ошибка инициализации Netlify Blobs:', error);
      throw error;
    }
  }

  /**
   * Инициализация - загрузка данных из Blobs
   */
  async initialize() {
    if (this.isInitialized) return;
    
    if (!this.store) {
      throw new Error('Netlify Blobs не инициализированы');
    }

    try {
      // Загружаем данные из Blobs
      const data = await Promise.race([
        this.store.get('topics'),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Blobs timeout')), 5000)
        )
      ]);
      
      if (data) {
        const topicsData = JSON.parse(data);
        topicsData.forEach(topicData => {
          const topic = TopicProgress.fromJSON(topicData);
          this.topics.set(topic.topicId, topic);
        });
        console.log(`✅ Загружено ${topicsData.length} тем из Netlify Blobs`);
      } else {
        console.log('📝 Данных в Blobs нет, начинаем с пустого состояния');
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('❌ Ошибка загрузки данных из Blobs:', error);
      throw error;
    }
  }

  /**
   * Сохранение данных в Blobs
   */
  async save() {
    if (!this.store) {
      throw new Error('Netlify Blobs не инициализированы');
    }

    try {
      const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
      
      await Promise.race([
        this.store.set('topics', JSON.stringify(topicsData)),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Blobs save timeout')), 5000)
        )
      ]);
      
      console.log('✅ Данные сохранены в Netlify Blobs');
    } catch (error) {
      console.error('❌ Ошибка сохранения данных в Blobs:', error);
      throw error;
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