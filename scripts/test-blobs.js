// Скрипт для проверки конфигурации Netlify Blobs
// Запустите: npm run test-blobs

// Загружаем переменные окружения из .env.local
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

import { getStore } from '@netlify/blobs';

async function testBlobs() {
  console.log('🔍 Тестирование Netlify Blobs...');
  
  // Получаем параметры из переменных окружения
  const siteID = process.env.VITE_NETLIFY_SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.VITE_NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN;
  
  if (!siteID || !token) {
    console.error('❌ Не найдены параметры Netlify Blobs:');
    console.log('   VITE_NETLIFY_SITE_ID:', siteID ? '✅' : '❌');
    console.log('   VITE_NETLIFY_BLOBS_TOKEN:', token ? '✅' : '❌');
    console.log('\n💡 Создайте файл .env.local с параметрами:');
    console.log('   VITE_NETLIFY_SITE_ID=ваш-site-id');
    console.log('   VITE_NETLIFY_BLOBS_TOKEN=ваш-blobs-token');
    return;
  }
  
  try {
    // Создаем хранилище с параметрами
    const store = getStore({
      name: 'learning-progress',
      siteID: siteID,
      token: token
    });
    console.log('✅ Хранилище создано с параметрами');
    
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
    console.log('2. Проверьте переменные окружения VITE_NETLIFY_SITE_ID и VITE_NETLIFY_BLOBS_TOKEN');
    console.log('3. Убедитесь, что Blobs включены в настройках сайта');
    console.log('4. Используйте netlify dev для локальной разработки');
  }
}

// Проверяем, запущен ли скрипт напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  testBlobs();
}

export { testBlobs };
