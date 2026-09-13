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

## Деплой на Netlify

У репозиторії є `netlify.toml`, тому Netlify автоматично збирає сайт із `dist` і серверну функцію з `netlify/functions`. Функція доступна на `POST /api/leads`, тобто React використовує ту саму адресу локально та в production.

У **Project configuration → Environment variables** задайте:

```ini
EMAIL_TRANSPORT=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-address@gmail.com
SMTP_PASS=your-16-character-google-app-password
SMTP_FROM=Americana Website <your-address@gmail.com>
LEAD_RECIPIENT=recipient@gmail.com
SECRETS_SCAN_OMIT_KEYS=SMTP_HOST,EMAIL_TRANSPORT,LEAD_RECIPIENT,SMTP_USER,SMTP_FROM
```

Позначайте як секрет лише `SMTP_PASS`. Для Gmail також можна використати порт `587` разом із `SMTP_SECURE=false`. Після зміни змінних запустіть новий deploy.

## Перевірки

```bash
npx playwright install chromium
npm run test:e2e
```
