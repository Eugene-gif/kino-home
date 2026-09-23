# Storybook

Storybook подключён к Vue 3 + Vite через `@storybook/vue3-vite`. Конфигурация использует alias `@` из приложения, глобальные стили, Pinia, memory-router, toast и `floating-vue`. Внешние вызовы Supabase и YouTube-плеер заменены локальными заглушками только внутри Storybook, поэтому stories не требуют секретов из `.env` и не отправляют запросы к этим сервисам.

## Stories

- `ButtonApp`: обычная кнопка, иконка, загрузка, disabled и RouterLink.
- `CardApp`: фильм, сериал и слот избранного.
- `FooterApp`, `HeaderApp`, `LoaderApp`: основные состояния.
- Inputs: `InputApp`, `InputPassword`, `InputSearch`, `LabelApp`, `FormField`, `VisibilitySwitch` — пустые/заполненные и интерактивные состояния там, где это полезно.
- Modals: открытый поиск со слотами и открытый видеоплеер.
- `ReviewItem`: короткий и длинный отзыв.
- `SingleSliderList`: список карточек и skeleton-состояние.
- `FavoriteList`: заполненный и пустой список.
- `HeroCard`, `HeroSlider`: основные состояния главного экрана.

## Команды

```bash
npm run storybook
npm run build-storybook
```

Локальный Storybook запускается на порту `6006`; статическая сборка создаётся в `storybook-static`.
