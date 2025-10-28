import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';
import { SimpleProgressManager } from './SimpleProgressManager.js';
import { ProgressManager } from './ProgressManager.js';

export { TopicProgress, RepetitionScheduler, SimpleProgressManager, ProgressManager };

// Функция создания менеджера с поддержкой Netlify Blobs
export function createProgressManager() {
  try {
    // Проверяем доступность переменных окружения для Blobs
    const siteID = import.meta.env.VITE_NETLIFY_SITE_ID;
    const token = import.meta.env.VITE_NETLIFY_BLOBS_TOKEN;
    
    // Проверяем, что мы на Netlify (есть переменные окружения)
    if (siteID && token && typeof window !== 'undefined') {
      console.log('🔄 Используем ProgressManager с Netlify Blobs');
      return new ProgressManager();
    } else {
      console.log('🔄 Используем SimpleProgressManager с localStorage');
      return new SimpleProgressManager();
    }
  } catch (error) {
    console.warn('⚠️ Ошибка создания ProgressManager, используем SimpleProgressManager:', error);
    return new SimpleProgressManager();
  }
}
