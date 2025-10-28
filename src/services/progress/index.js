export { TopicProgress } from './TopicProgress.js';
export { RepetitionScheduler } from './RepetitionScheduler.js';
export { SimpleProgressManager } from './SimpleProgressManager.js';

// Простая функция создания менеджера без динамических импортов
export function createProgressManager() {
  console.log('🔄 Используем SimpleProgressManager с localStorage');
  return new SimpleProgressManager();
}
