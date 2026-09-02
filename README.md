# Americana English landing

Сучасний адаптивний лендинг для мовного центру Americana. React + TypeScript + Tailwind CSS + Vite.

## Локальний запуск

```powershell
npm install
Copy-Item .env.example .env
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

## Відправлення заявок на Gmail

Форма надсилає заявки через серверний endpoint `POST /api/leads`. Тестовий одержувач уже заданий як `aartemiliev@gmail.com`.

1. Скопіюйте `.env.example` у `.env`.
2. Увімкніть двоетапну перевірку Google для пошти-відправника.
3. Створіть Google App Password.
4. Заповніть `SMTP_USER`, `SMTP_PASS` і `SMTP_FROM` у `.env`.

`SMTP_USER` — Gmail-відправник, `SMTP_PASS` — його App Password, `SMTP_FROM` має містити ту саму адресу. `LEAD_RECIPIENT` — адреса, куди приходять заявки. Після зміни `.env` повністю перезапустіть dev-сервер. У консолі має з’явитися `SMTP connection verified`.

Пароль не потрапляє у frontend або Git. Для автоматичних тестів використовується mock-транспорт — реальні листи не надсилаються.

## Перевірки

```bash
npx playwright install chromium
npm run test:e2e
```
