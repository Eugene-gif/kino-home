import type { FooterSectionData } from '@/layouts/MainLayout/components/FooterApp/types.ts';

const FooterData: FooterSectionData[] = [
  {
    title: 'Меню',
    path: '',
    id: 1,
    links: [
      {
        text: 'Фильмы',
        path: '',
      },
      {
        text: 'Сериалы',
        path: '',
      },
      {
        text: 'Подборки',
        path: '',
      },
    ],
  },
  {
    title: 'Подписка',
    path: '',
    id: 2,
    links: [
      {
        text: 'Тарифный план',
        path: '',
      },
      {
        text: 'Акции',
        path: '',
      },
      {
        text: 'Подписка за баллы',
        path: '',
      },
    ],
  },
  {
    title: 'Кино и сериалы',
    path: '',
    id: 3,
    links: [
      {
        text: 'Весь каталог',
        path: '',
      },
      {
        text: 'Комедии',
        path: '',
      },
      {
        text: 'Драмы',
        path: '',
      },
      {
        text: 'Фэнтези',
        path: '',
      },
      {
        text: 'Триллеры',
        path: '',
      },
      {
        text: 'Детективы',
        path: '',
      },
    ],
  },
  {
    title: 'Сотрудничество',
    path: '',
    id: 4,
    links: [
      {
        text: 'Размещение рекламы',
        path: '',
      },
      {
        text: 'Партнерам',
        path: '',
      },
      {
        text: 'Партнерская программа',
        path: '',
      },
      {
        text: 'Пользовательское соглашение',
        path: '',
      },
      {
        text: 'Политика конфидециальности',
        path: '',
      },
    ],
  },
  {
    title: 'Вопросы и ответы',
    path: '',
    id: 5,
    links: [],
  },
  {
    title: 'Техническая поддержка',
    path: '',
    id: 6,
    links: [
      {
        text: '8 800 800 80 80',
        path: 'tel:+78008008080',
        icon: 'phone'
      },
      {
        text: 'support@mail.ru',
        path: 'mailto:support@mail.ru',
        icon: 'mail',
      },
    ],
  },
  {
    title: 'Подписывайтесь на нас',
    path: '',
    id: 7,
    links: [
      {
        text: '',
        path: '',
        icon: 'social-fb'
      },
      {
        text: '',
        path: '',
        icon: 'social-vk',
      },
      {
        text: '',
        path: '',
        icon: 'social-insta',
      },
    ],
  },
];

export { FooterData };
