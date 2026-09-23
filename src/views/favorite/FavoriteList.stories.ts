import type { Meta, StoryObj } from '@storybook/vue3-vite';
import placeholderImage from '@/assets/images/no-image.webp';
import FavoriteList from './FavoriteList.vue';

const items = [
  {
    id: 'favorite-1',
    content_id: 550,
    has_watched: true,
    content: {
      id: 550,
      title: 'Бойцовский клуб',
      overview: 'История человека, который ищет способ изменить свою жизнь.',
      rating: '8.4',
      backdropPath: placeholderImage,
      genres: 'Драма, триллер',
      countries: 'США',
      director: 'Дэвид Финчер',
      actors: 'Эдвард Нортон, Брэд Питт',
      mediaType: 'movie' as const,
    },
  },
  {
    id: 'favorite-2',
    content_id: 1396,
    has_watched: false,
    content: {
      id: 1396,
      title: 'Во все тяжкие',
      overview: 'Криминальная драма о школьном учителе химии.',
      rating: '8.9',
      backdropPath: placeholderImage,
      genres: 'Драма, криминал',
      countries: 'США',
      director: 'Винс Гиллиган',
      actors: 'Брайан Крэнстон, Аарон Пол',
      mediaType: 'tv' as const,
    },
  },
];

const meta = {
  title: 'Views/Favorite/FavoriteList',
  component: FavoriteList,
  args: { items },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FavoriteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {};

export const Empty: Story = {
  args: { items: [] },
};
