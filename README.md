# ceh-klimata-next

Сайт «Цех Климата» (airceh.ru) — вентиляция и кондиционирование. Next.js + TypeScript, статический экспорт.

Структура проекта — [Feature-Sliced Design](https://feature-sliced.design/ru/):

```
src/
├── app/                    # маршруты, layouts, глобальные стили, иконки, OG, sitemap, robots
│   ├── (site)/             # публичный сайт: главная, услуги, о компании, проекты, блог, контакты
│   └── styles/             # токены и стили страниц
├── widgets/                # блоки страниц: шапка, подвал, первый экран, «до и после», услуги, этапы…
├── features/
│   └── photo-viewer/       # фотоотчёт: сетка превью и просмотр на весь экран
├── entities/
│   ├── project/            # объекты: данные, фото, карточка, характеристики
│   ├── post/               # статьи блога
│   └── service/            # услуги
└── shared/                 # конфиг (контакты, навигация), утилиты, UI-кит
```

- **Объекты**: `content/projects.json` + фото в `public/img/projects/<folder>/full|thumb/NN.webp`. Новый объект — запись в JSON и папка с фото; сетка на главной и в «Проектах» перестраивается сама.
- **Статьи**: `content/posts.json`, блоки `p`, `h2`, `ul`, `project`.
- **Контакты**: `src/shared/config/contacts.ts`. Форм и сбора данных на сайте нет — только телефон, мессенджеры и почта.
- **Дизайн**: продукт описан в `PRODUCT.md`, визуальная система — в `DESIGN.md`.

## Фото

Фото с объекта конвертируются в WebP с учётом EXIF-поворота:

```bash
ffmpeg -i 12.jpg tmp.png
cwebp -q 72 -m 6 tmp.png -o full/12.webp
cwebp -q 66 -m 6 -resize 720 0 tmp.png -o thumb/12.webp
```

## Команды

```bash
npm run dev         # dev-сервер на http://127.0.0.1:3000
npm run build       # статический экспорт в out/
npm run check       # typecheck + eslint + steiger (FSD)
npm run lint:fix    # автофикс линтера
```
