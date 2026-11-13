# ceh-klimata-next

Сайт «Цех Климата» (airceh.ru) — вентиляция и кондиционирование. Next.js + TypeScript, статический экспорт.

Структура проекта — [Feature-Sliced Design](https://feature-sliced.design/ru/):

```
src/
├── app/                 # Next.js App Router: маршруты, layouts, глобальные стили
│   └── (main)/          # route group публичного сайта (layout: NavBar + Footer)
├── widgets/             # крупные блоки страниц (main/)
│   ├── header/  ├── navbar/  ├── about/
│   ├── footer/  └── preview-projects/
├── features/            # пользовательские сценарии (main/)
│   └── project-list/
├── entities/            # доменные сущности (main/)
│   └── project/         # api/ lib/ model/ ui/
└── shared/              # переиспользуемый код
    ├── config/          # сайт, контакты, навигация
    ├── lib/             # хуки и утилиты
    └── ui/main/         # BtnDarkMode, SocialLinks
```

- **Контент**: `content/projects.json` (алиас `@content/*`) — данные проектов читаются на этапе сборки
- **Публичный API слайсов**: только `index.ts`, глубокие импорты запрещены (проверяется `steiger`)
- **Стили**: BEM + обычный CSS рядом с компонентами, глобальные — `src/app/styles/`

## Команды

```bash
npm run dev         # запуск dev-сервера на http://127.0.0.1:3000
npm run build       # статический экспорт в out/
npm run check       # typecheck + eslint + steiger (FSD)
npm run lint:fix    # автофикс линтера
```
