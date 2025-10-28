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
          console.warn('⚠️ Ошибка создания Netlify Blobs store:', blobsError);
          console.log('🔄 Переключаемся на localStorage из-за проблем с Blobs');
          this.store = null;
        }
      } else {
        console.warn('⚠️ Параметры Netlify Blobs не найдены или не в браузере, используем localStorage');
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

      // Пытаемся загрузить данные из Blobs с улучшенной обработкой ошибок
      try {
        const data = await Promise.race([
          this.store.get('topics'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Blobs timeout')), 3000)
          )
        ]);
        
        if (data) {
          const topicsData = JSON.parse(data);
          topicsData.forEach(topicData => {
            const topic = TopicProgress.fromJSON(topicData);
            this.topics.set(topic.topicId, topic);
          });
          console.log('✅ Данные загружены из Netlify Blobs');
        }
      } catch (blobsError) {
        console.warn('⚠️ Ошибка загрузки из Blobs, переключаемся на localStorage:', blobsError.message);
        // Отключаем Blobs для будущих операций
        this.store = null;
        this.loadFromLocalStorage();
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Ошибка инициализации ProgressManager:', error);
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
        // Используем Netlify Blobs с улучшенной обработкой ошибок
        try {
          await Promise.race([
            this.store.set('topics', JSON.stringify(topicsData)),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Blobs save timeout')), 3000)
            )
          ]);
          console.log('✅ Данные сохранены в Netlify Blobs');
        } catch (blobsError) {
          console.warn('⚠️ Ошибка сохранения в Blobs, переключаемся на localStorage:', blobsError.message);
          // Отключаем Blobs для будущих операций
          this.store = null;
          localStorage.setItem('learning-progress', JSON.stringify(topicsData));
          console.log('✅ Данные сохранены в localStorage (fallback)');
        }
      } else {
        // Используем localStorage
        localStorage.setItem('learning-progress', JSON.stringify(topicsData));
        console.log('✅ Данные сохранены в localStorage');
      }
    } catch (error) {
      console.error('Ошибка сохранения данных прогресса:', error);
      // Последний fallback на localStorage
      try {
        const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
        localStorage.setItem('learning-progress', JSON.stringify(topicsData));
        console.log('✅ Данные сохранены в localStorage (final fallback)');
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
