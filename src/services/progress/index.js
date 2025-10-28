export { TopicProgress } from './TopicProgress.js';
export { RepetitionScheduler } from './RepetitionScheduler.js';
export { ProgressManager } from './ProgressManager.js';
export { LocalProgressManager } from './LocalProgressManager.js';

// Автоматический выбор менеджера в зависимости от доступности Blobs
export function createProgressManager() {
  try {
    // Проверяем доступность переменных окружения для Blobs
    const siteID = import.meta.env.VITE_NETLIFY_SITE_ID;
    const token = import.meta.env.VITE_NETLIFY_BLOBS_TOKEN;
    
    if (siteID && token && typeof window !== 'undefined') {
      console.log('🔄 Используем ProgressManager с Netlify Blobs');
      return new ProgressManager();
    } else {
      console.log('🔄 Используем LocalProgressManager с localStorage');
      return new LocalProgressManager();
    }
  } catch (error) {
    console.warn('⚠️ Ошибка создания ProgressManager, используем LocalProgressManager:', error);
    return new LocalProgressManager();
  }
}
