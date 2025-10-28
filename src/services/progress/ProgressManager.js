import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';
import { getStore } from '@netlify/blobs';

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
      const siteID = import.meta.env.VITE_NETLIFY_SITE_ID;
      const token = import.meta.env.VITE_NETLIFY_BLOBS_TOKEN;
      
      // Проверяем, что мы в браузере и есть необходимые параметры
      if (typeof window !== 'undefined' && siteID && token) {
        this.store = getStore({
          name: 'learning-progress',
          siteID: siteID,
          token: token
        });
        console.log('✅ Netlify Blobs хранилище инициализировано');
      } else {
        console.warn('⚠️ Параметры Netlify Blobs не найдены, работаем без сохранения');
        console.log('VITE_NETLIFY_SITE_ID:', siteID ? '✅' : '❌');
        console.log('VITE_NETLIFY_BLOBS_TOKEN:', token ? '✅' : '❌');
      }
    } catch (error) {
      console.error('❌ Ошибка инициализации Netlify Blobs:', error);
      // Не бросаем ошибку, чтобы приложение продолжило работать
    }
  }

  /**
   * Инициализация - загрузка данных из Blobs
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Если хранилище не настроено, работаем только в памяти
      if (!this.store) {
        console.log('📝 Работаем без облачного хранилища (только в памяти)');
        this.isInitialized = true;
        return;
      }

      // Загружаем данные из Blobs
      const data = await Promise.race([
        this.store.get('topics', { type: 'text' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
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
      console.warn('⚠️ Ошибка загрузки из Blobs, работаем в памяти:', error.message);
      this.isInitialized = true; // Продолжаем работу без облачного хранилища
    }
  }

  /**
   * Сохранение данных в Blobs
   */
  async save() {
    // Если хранилище не настроено, пропускаем сохранение
    if (!this.store) {
      console.log('💾 Данные хранятся только в памяти (Blobs не настроен)');
      return;
    }

    try {
      const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
      
      await Promise.race([
        this.store.set('topics', JSON.stringify(topicsData)),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        )
      ]);
      
      console.log('✅ Данные сохранены в Netlify Blobs');
    } catch (error) {
      console.warn('⚠️ Ошибка сохранения в Blobs:', error.message);
      // Не бросаем ошибку, данные остаются в памяти
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