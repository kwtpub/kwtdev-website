// Скрипт для проверки конфигурации Netlify Blobs
// Запустите: node scripts/test-blobs.js

import { getStore } from '@netlify/blobs';

async function testBlobs() {
  console.log('🔍 Тестирование Netlify Blobs...');
  
  try {
    // Создаем хранилище
    const store = getStore('learning-progress');
    console.log('✅ Хранилище создано:', store);
    
    // Тест записи
    console.log('📝 Тестируем запись...');
    await store.set('test-key', JSON.stringify({
      message: 'Hello from Netlify Blobs!',
      timestamp: new Date().toISOString()
    }));
    console.log('✅ Запись успешна');
    
    // Тест чтения
    console.log('📖 Тестируем чтение...');
    const data = await store.get('test-key');
    const parsedData = JSON.parse(data);
    console.log('✅ Чтение успешно:', parsedData);
    
    // Тест удаления
    console.log('🗑️ Тестируем удаление...');
    await store.delete('test-key');
    console.log('✅ Удаление успешно');
    
    console.log('🎉 Все тесты прошли успешно! Netlify Blobs настроены корректно.');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании Blobs:', error);
    console.log('\n💡 Возможные решения:');
    console.log('1. Убедитесь, что проект связан с Netlify: netlify link');
    console.log('2. Проверьте переменную окружения NETLIFY_BLOBS_TOKEN');
    console.log('3. Убедитесь, что Blobs включены в настройках сайта');
    console.log('4. Используйте netlify dev для локальной разработки');
  }
}

// Проверяем, запущен ли скрипт напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  testBlobs();
}

export { testBlobs };
