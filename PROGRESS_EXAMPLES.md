# Примеры использования Progress API

## Быстрый тест в консоли браузера

Откройте https://kwt.pub и консоль браузера (F12), затем выполните:

### 1. Создание и увеличение прогресса

```javascript
// Импортируем (если не используется в компоненте)
import { createProgressManager } from './services/progress';

// Создаем менеджер
const pm = createProgressManager();
await pm.initialize();

// Создаем топик
pm.getOrCreateTopic('test-topic', 'Тестовый топик', 10);

// Добавляем прогресс
await pm.completeLesson('test-topic');  // +1
await pm.completeLesson('test-topic');  // +2
await pm.completeLesson('test-topic');  // +3

// Проверяем
const topic = pm.getTopic('test-topic');
console.log(`Прогресс: ${topic.completedLessons}/10`);
// Выведет: Прогресс: 3/10
```

### 2. Уменьшение прогресса

```javascript
// Убавляем прогресс
await pm.uncompleteLesson('test-topic');  // -1
await pm.uncompleteLesson('test-topic');  // -2

// Проверяем
const topic = pm.getTopic('test-topic');
console.log(`Прогресс: ${topic.completedLessons}/10`);
// Выведет: Прогресс: 1/10
```

### 3. Полный цикл

```javascript
const pm = createProgressManager();
await pm.initialize();

// Создаем топик "Матрицы"
pm.getOrCreateTopic('matrices', 'Матрицы', 5);

// Завершаем 3 урока
for (let i = 0; i < 3; i++) {
  await pm.completeLesson('matrices');
}

// Проверяем прогресс
let topic = pm.getTopic('matrices');
console.log('После добавления:', topic.completedLessons); // 3

// Отменяем 1 урок
await pm.uncompleteLesson('matrices');

// Проверяем снова
topic = pm.getTopic('matrices');
console.log('После отмены:', topic.completedLessons); // 2

// Получаем процент прогресса
console.log('Прогресс:', topic.getProgressPercentage() + '%'); // 40%
```

## Интеграция в существующий компонент

Если у вас уже есть компонент (например, Matrix.jsx):

```jsx
import { useState, useEffect } from 'react';
import { createProgressManager } from '../../services/progress';

function Matrix() {
  const [progress, setProgress] = useState(0);
  const [manager] = useState(() => createProgressManager());
  const topicId = 'linear-algebra-matrices';
  const totalLessons = 10;

  useEffect(() => {
    // Инициализация при загрузке компонента
    manager.initialize().then(() => {
      const topic = manager.getOrCreateTopic(
        topicId,
        'Линейная алгебра - Матрицы',
        totalLessons
      );
      setProgress(topic.completedLessons);
    });
  }, []);

  const increaseProgress = async () => {
    const success = await manager.completeLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      setProgress(topic.completedLessons);
      console.log('✅ Урок добавлен');
    } else {
      console.log('⚠️ Все уроки уже завершены');
    }
  };

  const decreaseProgress = async () => {
    const success = await manager.uncompleteLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      setProgress(topic.completedLessons);
      console.log('✅ Урок убран');
    } else {
      console.log('⚠️ Прогресс уже 0');
    }
  };

  return (
    <div>
      <h2>Матрицы</h2>
      
      <div className="progress-bar">
        <p>Прогресс: {progress}/{totalLessons} уроков</p>
        <div className="bar" style={{ width: `${(progress/totalLessons)*100}%` }}></div>
      </div>

      <div className="controls">
        <button 
          onClick={increaseProgress}
          disabled={progress >= totalLessons}
        >
          ➕ Добавить урок
        </button>
        
        <button 
          onClick={decreaseProgress}
          disabled={progress <= 0}
        >
          ➖ Убавить урок
        </button>
      </div>

      {/* Ваш контент урока */}
      <div className="lesson-content">
        {/* ... */}
      </div>
    </div>
  );
}
```

## Кнопки с иконками

```jsx
function ProgressControls({ topicId, progress, totalLessons, onUpdate }) {
  const [manager] = useState(() => createProgressManager());

  const handleIncrease = async () => {
    const success = await manager.completeLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      onUpdate(topic.completedLessons);
    }
  };

  const handleDecrease = async () => {
    const success = await manager.uncompleteLesson(topicId);
    if (success) {
      const topic = manager.getTopic(topicId);
      onUpdate(topic.completedLessons);
    }
  };

  return (
    <div className="progress-controls">
      <button 
        onClick={handleDecrease}
        disabled={progress === 0}
        className="btn-decrease"
        title="Убавить прогресс"
      >
        ➖
      </button>

      <span className="progress-text">
        {progress} / {totalLessons}
      </span>

      <button 
        onClick={handleIncrease}
        disabled={progress >= totalLessons}
        className="btn-increase"
        title="Добавить прогресс"
      >
        ➕
      </button>
    </div>
  );
}
```

## CSS для кнопок

```css
.progress-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.progress-controls button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #4CAF50;
  background: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.progress-controls button:hover:not(:disabled) {
  background: #4CAF50;
  transform: scale(1.1);
}

.progress-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
}

.progress-text {
  font-size: 18px;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
}
```

## Проверка ограничений

```javascript
async function safeUpdateProgress(topicId, action) {
  const topic = manager.getTopic(topicId);
  
  if (!topic) {
    console.error('❌ Топик не найден');
    return false;
  }

  if (action === 'increase') {
    if (topic.completedLessons >= topic.totalLessons) {
      console.warn('⚠️ Все уроки уже завершены');
      return false;
    }
    return await manager.completeLesson(topicId);
  }

  if (action === 'decrease') {
    if (topic.completedLessons <= 0) {
      console.warn('⚠️ Прогресс уже равен 0');
      return false;
    }
    return await manager.uncompleteLesson(topicId);
  }

  return false;
}

// Использование
await safeUpdateProgress('matrices', 'increase');
await safeUpdateProgress('matrices', 'decrease');
```

