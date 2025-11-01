# Интеграция Mobile Landing

## Описание

Mobile Landing успешно интегрирован как отдельная страница на основном сайте.

## Что было сделано

1. **Установлены зависимости:**
   - framer-motion (для анимаций)
   - react-icons (для иконок)
   - tailwindcss (для стилизации)

2. **Структура проекта:**
   - `/src/landing/config/` - конфигурационные файлы лендинга
   - `/src/landing/components/ui/` - UI компоненты (DeviceToggle, RatingStars, Lightbox)
   - `/src/landing/components/sections/` - секции лендинга (AppHero, Features, Screenshots, Reviews, FAQ)
   - `/src/pages/Landing.jsx` - основная страница лендинга

3. **Настройки:**
   - Tailwind CSS настроен с поддержкой dark mode
   - Добавлена поддержка переключения темы через localStorage
   - Скопированы все ресурсы (скриншоты, иконки) в `/public/`

4. **Маршрутизация:**
   - Лендинг доступен по пути: `/#/landing`
   - Добавлена ссылка в разделе "Портфолио" на главной странице

## Доступ к лендингу

- **URL:** `/#/landing`
- **Из портфолио:** Нажмите на карточку "Mobile Landing" в разделе портфолио

## Настройка контента

Для изменения контента лендинга редактируйте файлы в `/src/landing/config/`:

- `appInfo.ts` - название приложения, описание, логотип, ссылки на магазины
- `features.ts` - список функций приложения
- `screenshots.ts` - пути к скриншотам для iPhone и iPad
- `reviews.ts` - отзывы пользователей
- `faq.ts` - часто задаваемые вопросы

## Технологии

- React
- React Router
- Tailwind CSS
- Framer Motion
- React Icons

