import { TopicProgress } from './TopicProgress.js';
import { RepetitionScheduler } from './RepetitionScheduler.js';
import { ProgressManager } from './ProgressManager.js';

export { TopicProgress, RepetitionScheduler, ProgressManager };

// Функция создания менеджера (только Netlify Blobs)
export function createProgressManager() {
  console.log('🔄 Используем ProgressManager с Netlify Blobs');
  return new ProgressManager();
}
