# Сброс прогресса для обновления структуры данных

Если после обновления кода не видны новые поля (например, подпункты), нужно сбросить данные в Netlify Blobs.

## Способ 1: Через консоль браузера (рекомендуется)

1. Откройте https://kwt.pub
2. Откройте консоль браузера (F12)
3. Выполните:

```javascript
// Получаем менеджер прогресса
const { createProgressManager } = await import('./src/services/progress/index.js');
const pm = createProgressManager();
await pm.initialize();

// Сбрасываем все данные
await pm.resetAll();

console.log('✅ Данные сброшены! Перезагрузите страницу.');
```

4. Перезагрузите страницу (F5)

## Способ 2: Временный код в компоненте

Добавьте временную кнопку в Matrix.jsx:

```jsx
// В компоненте Matrix, после других обработчиков
const handleResetAll = async () => {
  if (window.confirm('Сбросить весь прогресс?')) {
    await progressManager.resetAll();
    window.location.reload();
  }
};

// В JSX, перед topics-container
<button onClick={handleResetAll} style={{padding: '10px', margin: '20px'}}>
  🗑️ Сбросить весь прогресс
</button>
```

После сброса удалите эту кнопку.

## Способ 3: Через Netlify Dashboard

1. Откройте [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт
3. **Storage** → **Blobs**
4. Найдите blob с ключом `topics`
5. Удалите его
6. Перезагрузите сайт

## Что произойдет после сброса?

- ✅ Все топики пересоздадутся с новой структурой
- ✅ Появятся подпункты у первого топика
- ❌ Весь прогресс повторений будет потерян (начнете заново)

## Альтернатива: Миграция данных

Если хотите сохранить прогресс, выполните в консоли:

```javascript
const pm = createProgressManager();
await pm.initialize();

// Экспортируем старые данные
const backup = pm.exportData();
console.log('Backup:', backup);
// Скопируйте это в безопасное место

// Сбрасываем
await pm.resetAll();

// Перезагрузите страницу - данные пересоздадутся с новой структурой
```

