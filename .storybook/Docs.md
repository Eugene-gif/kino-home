# Storybook

Storybook подключён к Vue 3 + Vite через `@storybook/vue3-vite`. Конфигурация использует alias `@` из приложения, глобальные стили, Pinia, memory-router, toast и `floating-vue`. Внешние вызовы Supabase и YouTube-плеер заменены локальными заглушками только внутри Storybook, поэтому stories не требуют секретов из `.env` и не отправляют запросы к этим сервисам.

## Stories

- `ButtonApp`: обычная кнопка, иконка, загрузка, disabled и RouterLink.
- `CardApp`: фильм, сериал и слот избранного.
- `FooterApp`, `LoaderApp`: основные состояния.
- `HeaderApp`: гость и авторизованный пользователь. Авторизованное состояние показывает ссылку «Избранное», аватар и профильное меню с именем, почтой и выходом.
- Inputs: `InputApp`, `InputPassword`, `InputSearch`, `LabelApp`, `FormField`, `VisibilitySwitch` — пустые/заполненные и интерактивные состояния там, где это полезно.
- Modals: поиск и видеоплеер с управляемым через Controls prop `isOpen`; закрытие окна синхронизирует Controls.
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
