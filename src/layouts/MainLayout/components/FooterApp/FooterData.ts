import type { FooterSectionData } from '@/layouts/MainLayout/components/FooterApp/types.ts';
import { mainMenu } from '@/constants/menu';

const FooterData: FooterSectionData[] = [
  {
    title: 'Меню',
    path: '',
    id: 1,
    links: mainMenu,
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
    id: 6,
    links: [
      {
        text: 'Что такое КиноДом?',
        path: '',
      },
      {
        text: 'Почему лучше выбрать наш сервис?',
        path: '',
      },
      {
        text: 'Сколько стоит слон?',
        path: '',
      },
      {
        text: 'Для чего козе баян?',
        path: '',
      },
      {
        text: 'Почему Толя Анатолий, а Коля не Анаколий?',
        path: '',
      },
    ],
  },
  {
    title: 'Техническая поддержка',
    path: '',
    id: 7,
    links: [
      {
        text: '8 800 800 80 80',
        path: 'tel:+78008008080',
        isSimpleLink: true,
        icon: 'phone'
      },
      {
        text: 'support@mail.ru',
        path: 'mailto:support@mail.ru',
        isSimpleLink: true,
        icon: 'mail',
      },
    ],
  },
  {
    title: 'Подписывайтесь на нас',
    path: '',
    id: 8,
    links: [
      {
        text: '',
        path: 'https://www.facebook.com/',
        isSimpleLink: true,
        icon: 'fb'
      },
      {
        text: '',
        path: 'https://vk.com/',
        isSimpleLink: true,
        icon: 'vk',
      },
      {
        text: '',
        path: 'https://www.instagram.com/',
        isSimpleLink: true,
        icon: 'insta',
      },
    ],
  },
];

export { FooterData };
