# KWT Dev Website

Персональный веб-сайт с портфолио, навыками и учебными материалами по программированию.

## Технологии

- **Frontend**: React + Vite
- **Роутинг**: React Router
- **Хранилище**: Netlify Blobs (для отслеживания прогресса обучения)
- **Анимация**: Lottie React

## Быстрый старт

### Установка

```bash
npm install
```

### Настройка Netlify Blobs

Для работы с системой отслеживания прогресса нужно настроить Netlify Blobs:

**📖 См. [QUICKSTART.md](./QUICKSTART.md) - инструкция на 5 минут**

Подробная документация: [SETUP_BLOBS.md](./SETUP_BLOBS.md)

### Запуск разработки

```bash
npm run dev
```

### Тестирование Netlify Blobs

```bash
npm run test-blobs
```

## Структура проекта

```
src/
├── components/         # React компоненты
├── pages/             # Страницы приложения
├── services/          # Бизнес-логика
│   └── progress/      # Система отслеживания прогресса
├── icon/              # SVG иконки
└── stickers/          # Анимированные стикеры
```

## Деплой

Проект автоматически деплоится на Netlify при пуше в main ветку.

Убедитесь, что переменные окружения настроены в Netlify Dashboard:
- `SITE_ID`
- `NETLIFY_BLOBS_TOKEN`
