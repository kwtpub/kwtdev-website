# API для работы с прогрессом

## Импорт

```javascript
import { createProgressManager } from './services/progress';

// Создаем менеджер прогресса
const progressManager = createProgressManager();

// Инициализируем (загружаем данные из Netlify Blobs)
await progressManager.initialize();
```

## Основные методы

### 1. Создание или получение топика

```javascript
// Создает топик если его нет, или возвращает существующий
const topic = progressManager.getOrCreateTopic(
  'linear-algebra',      // ID топика
  'Линейная алгебра',   // Название
  10                     // Общее количество уроков
);
```

### 2. Увеличение прогресса (добавить урок)

```javascript
// Завершить урок (прогресс +1)
const success = await progressManager.completeLesson('linear-algebra');

if (success) {
  console.log('✅ Урок завершен');
} else {
  console.log('❌ Не удалось завершить урок (возможно, все уроки уже пройдены)');
}
```

### 3. Уменьшение прогресса (убавить урок)

```javascript
// Отменить последний урок (прогресс -1)
const success = await progressManager.uncompleteLesson('linear-algebra');

if (success) {
  console.log('✅ Урок отменен');
} else {
  console.log('❌ Не удалось отменить урок (возможно, прогресс уже 0)');
}
```

### 4. Работа с повторениями

```javascript
// Интервалы повторений
const intervals = ['immediate', '1day', '3days', '1week', '2weeks', '1month'];

// Завершить повторение
await progressManager.completeRepetition('linear-algebra', '1day');

// Отменить повторение
await progressManager.uncompleteRepetition('linear-algebra', '1day');
```

## Получение данных

### Получить топик

```javascript
const topic = progressManager.getTopic('linear-algebra');

if (topic) {
  console.log('Завершено уроков:', topic.completedLessons);
  console.log('Всего уроков:', topic.totalLessons);
  console.log('Прогресс:', topic.getProgressPercentage() + '%');
}
```

### Получить все топики

```javascript
const allTopics = progressManager.getAllTopics();

allTopics.forEach(topic => {
  console.log(`${topic.topicName}: ${topic.completedLessons}/${topic.totalLessons}`);
});
```

### Получить статистику

```javascript
const stats = progressManager.getStats();

console.log('Всего топиков:', stats.totalTopics);
console.log('Завершено топиков:', stats.completedTopics);
console.log('Общий прогресс:', stats.overallProgress + '%');
```

## Пример использования в React компоненте

```jsx
import { useEffect, useState } from 'react';
import { createProgressManager } from './services/progress';

function LessonProgress({ topicId, topicName, totalLessons }) {
  const [progress, setProgress] = useState(0);
  const [manager] = useState(() => createProgressManager());

  useEffect(() => {
    // Инициализация
    manager.initialize().then(() => {
      const topic = manager.getOrCreateTopic(topicId, topicName, totalLessons);
      setProgress(topic.completedLessons);
    });
  }, []);

  const handleComplete = async () => {
    const success = await manager.completeLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      setProgress(topic.completedLessons);
    }
  };

  const handleUncomplete = async () => {
    const success = await manager.uncompleteLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      setProgress(topic.completedLessons);
    }
  };

  return (
    <div>
      <h3>{topicName}</h3>
      <p>Прогресс: {progress}/{totalLessons}</p>
      
      <button onClick={handleComplete}>
        ➕ Добавить урок
      </button>
      
      <button onClick={handleUncomplete} disabled={progress === 0}>
        ➖ Убавить урок
      </button>
    </div>
  );
}
```

## Пример с обработкой ошибок

```javascript
async function updateProgress(topicId, action) {
  try {
    let success;
    
    if (action === 'increase') {
      success = await progressManager.completeLesson(topicId);
      if (!success) {
        console.warn('⚠️ Все уроки уже завершены');
        return;
      }
    } else if (action === 'decrease') {
      success = await progressManager.uncompleteLesson(topicId);
      if (!success) {
        console.warn('⚠️ Прогресс уже равен 0');
        return;
      }
    }
    
    // Получаем обновленные данные
    const topic = progressManager.getTopic(topicId);
    console.log('✅ Прогресс обновлен:', topic.completedLessons);
    
  } catch (error) {
    console.error('❌ Ошибка обновления прогресса:', error);
  }
}

// Использование
await updateProgress('linear-algebra', 'increase');  // Добавить
await updateProgress('linear-algebra', 'decrease');  // Убавить
```

## Дополнительные методы

### Сброс прогресса

```javascript
// Сбросить один топик
await progressManager.resetTopic('linear-algebra');

// Сбросить весь прогресс
await progressManager.resetAll();
```

### Экспорт/Импорт данных

```javascript
// Экспорт
const data = progressManager.exportData();
console.log(JSON.stringify(data, null, 2));

// Импорт
await progressManager.importData(data);
```

## Важно

- Все методы изменения данных (`completeLesson`, `uncompleteLesson`, и т.д.) автоматически сохраняют изменения в Netlify Blobs
- Методы возвращают `true` при успехе и `false` при неудаче
- Прогресс нельзя убавить ниже 0
- Прогресс нельзя увеличить выше totalLessons

