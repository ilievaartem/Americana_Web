# Americana English landing

Сучасний адаптивний лендинг для мовного центру Americana. React + TypeScript + Tailwind CSS + Vite.

## Локальний запуск

```bash
npm install
npm run dev
```

## Production-збірка

```bash
npm run build
npm run preview
```

Або у Docker (production Nginx):

```bash
docker compose up --build
```

Сайт буде доступний на `http://localhost:8080`.

## Форма заявок

Додайте `VITE_LEAD_ENDPOINT` у `.env`, якщо є CRM або webhook. Endpoint має приймати JSON методом POST. Без endpoint форма безпечно відкриває поштовий застосунок користувача з уже заповненою заявкою.

## Перевірки

```bash
npx playwright install chromium
npm run test:e2e
```
