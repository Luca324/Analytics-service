# Analytics-service

## Инструкция по запуску

### Запуск бэкенда
1. Скачать [бэкенд](https://github.com/etozhenerk/shri2025-back)
2. перейти в папку бэкенда и запустить его:
```bash
npm run start
```

### Запуск фронтенда
#### Запуск в режиме разработки
```bash
npm install   # установка зависимостей
npm run dev   # запуск сервера 
```
сервер появится здесь http://localhost:5173/
#### Запуск в продакшен
```bash
npm install   # установка зависимостей
npm run build
npm run preview   # запуск сервера 
```
сервис появится здесь http://localhost:4173/

## Архитектура проекта

### Компоненты
- Страницы: `/pages` (основные страницы приложения)
- UI-компоненты: `/components/UI` (переиспользуемые компоненты: кнопки, ссылки и т.д.)
- Остальные компоненты: `/components`

### Слои приложения
1. **API слой**: `API.js` - взаимодействие с бэкендом
2. **Слой данных**: `store/index.js` - управление состоянием через Zustand
3. **UI слой**: напрямую взаимодействует с API и хранилищем

### Особенности
- Все хранилища Zustand находятся в одном файле из-за их небольшого размера
- Отсутствует отдельный слой бизнес-логики ввиду простоты сервиса
```
