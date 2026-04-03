# УралМеталлРесурс — B2B сайт оптоволоконных кабелей

Многостраничный B2B сайт для ООО «ПКП УралМеталлРесурс» — поставщика оптоволоконных кабелей из Китая.

## Технологии

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (иконки)
- Nodemailer (отправка форм)

## Локальный запуск

```bash
# Установите зависимости
npm install

# Скопируйте файл окружения
cp .env.local.example .env.local

# Заполните переменные окружения (см. раздел ниже)

# Запустите dev-сервер
npm run dev
```

Сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Настройка Яндекс SMTP

Для работы формы обратной связи необходимо настроить отправку писем через Яндекс:

1. Перейдите в [Яндекс ID](https://id.yandex.ru/)
2. Откройте раздел **Безопасность** → **Пароли приложений**
3. Создайте новый пароль приложения для «Почта»
4. Впишите данные в `.env.local`:

```
YANDEX_EMAIL=ваш_email@yandex.ru
YANDEX_APP_PASSWORD=сгенерированный_пароль
```

## Деплой на Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Импортируйте репозиторий из GitHub
3. В разделе **Settings → Environment Variables** добавьте:
   - `YANDEX_EMAIL` — ваш email на Яндексе
   - `YANDEX_APP_PASSWORD` — пароль приложения из Яндекс ID
4. Нажмите **Deploy**

## Структура проекта

```
/app
  layout.tsx              — общий layout с Header и Footer
  page.tsx                — Главная
  /about/page.tsx         — О компании
  /catalog/page.tsx       — Каталог
  /catalog/[slug]/page.tsx — Страница продукта
  /contacts/page.tsx      — Контакты
  /api/contact/route.ts   — API отправки формы
  sitemap.ts              — Автогенерация sitemap.xml
  robots.ts               — robots.txt

/components
  Header.tsx
  Footer.tsx
  ContactForm.tsx
  ProductCard.tsx

/lib
  products.ts             — Данные о продуктах
```

## Переменные окружения

| Переменная | Описание |
|---|---|
| `YANDEX_EMAIL` | Email-адрес Яндекс для отправки писем |
| `YANDEX_APP_PASSWORD` | Пароль приложения из Яндекс ID |
