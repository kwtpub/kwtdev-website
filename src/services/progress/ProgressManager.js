import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';

/**
 * Главный класс для управления прогрессом обучения (только Netlify Blobs через Edge Function)
 */
export class ProgressManager {
  constructor() {
    this.scheduler = new RepetitionScheduler();
    this.topics = new Map();
    this.isInitialized = false;
    this.apiUrl = '/api/blobs';
    this.useBlobsAPI = false;
    
    // Проверяем доступность API
    this.checkAPI();
  }

  /**
   * Проверка доступности Blobs API
   */
  async checkAPI() {
    try {
      if (typeof window !== 'undefined') {
        // Проверяем, что мы не на localhost (где Edge Functions не работают)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.log('📝 Локальная разработка: работаем в режиме памяти');
          this.useBlobsAPI = false;
        } else {
          // На продакшене используем Edge Function API
          this.useBlobsAPI = true;
          console.log('✅ Используем Netlify Blobs через Edge Function');
        }
      }
    } catch (error) {
      console.warn('⚠️ Ошибка проверки API:', error.message);
      this.useBlobsAPI = false;
    }
  }

  /**
   * Инициализация - загрузка данных из Blobs
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Если API не доступен, работаем только в памяти
      if (!this.useBlobsAPI) {
        console.log('📝 Работаем без облачного хранилища (только в памяти)');
        this.isInitialized = true;
        return;
      }

      // Загружаем данные через Edge Function
      const response = await fetch(`${this.apiUrl}?key=topics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        const topicsData = JSON.parse(result.data);
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
    // Если API не доступен, пропускаем сохранение
    if (!this.useBlobsAPI) {
      console.log('💾 Данные хранятся только в памяти');
      return;
    }

    try {
      const topicsData = Array.from(this.topics.values()).map(topic => topic.toJSON());
      
      const response = await fetch(`${this.apiUrl}?key=topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: JSON.stringify(topicsData)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Данные сохранены в Netlify Blobs');
      }
    } catch (error) {
      console.warn('⚠️ Ошибка сохранения в Blobs:', error.message);
      // Не бросаем ошибку, данные остаются в памяти
    }
  }

  /**
   * Создать или получить тему
   */
  getOrCreateTopic(topicId, topicName, totalLessons = 0, subTopics = []) {
    if (!this.topics.has(topicId)) {
      const topic = new TopicProgress(topicId, topicName, totalLessons, subTopics);
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
   * Отменить урок (убавить прогресс)
   */
  async uncompleteLesson(topicId) {
    const topic = this.topics.get(topicId);
    if (topic && topic.uncompleteLesson()) {
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
   * Отменить повторение
   */
  async uncompleteRepetition(topicId, interval) {
    const topic = this.topics.get(topicId);
    if (topic && topic.uncompleteRepetition(interval)) {
      await this.save();
      return true;
    }
    return false;
  }

  /**
   * Переключить теорию подпункта
   */
  async toggleSubTopicTheory(topicId, subTopicId) {
    const topic = this.topics.get(topicId);
    if (topic && topic.toggleSubTopicTheory(subTopicId)) {
      await this.save();
      return true;
    }
    return false;
  }

  /**
   * Переключить практику подпункта
   */
  async toggleSubTopicPractice(topicId, subTopicId) {
    const topic = this.topics.get(topicId);
    if (topic && topic.toggleSubTopicPractice(subTopicId)) {
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