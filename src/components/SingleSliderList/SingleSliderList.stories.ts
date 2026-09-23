import type { Meta, StoryObj } from '@storybook/vue3-vite';
import placeholderImage from '@/assets/images/no-image.webp';
import SingleSliderList from './SingleSliderList.vue';

const items = [
  { id: 1, title: 'Начало', rating: '8.4', imageUrl: placeholderImage, genreStringNames: 'Фантастика', mediaType: 'movie' },
  { id: 2, title: 'Прибытие', rating: '7.9', imageUrl: placeholderImage, genreStringNames: 'Драма', mediaType: 'movie' },
  { id: 3, title: 'Тьма', rating: '8.7', imageUrl: placeholderImage, genreStringNames: 'Детектив', mediaType: 'tv' },
  { id: 4, title: 'Разделение', rating: '8.5', imageUrl: placeholderImage, genreStringNames: 'Триллер', mediaType: 'tv' },
  { id: 5, title: 'Дюна', rating: '8.0', imageUrl: placeholderImage, genreStringNames: 'Фантастика', mediaType: 'movie' },
];

const meta = {
  title: 'Components/SingleSliderList',
  component: SingleSliderList,
  args: {
    title: 'Популярное',
    items,
    loading: false,
  },
  decorators: [
    () => ({ template: '<div style="width:min(1280px, 90vw)"><story /></div>' }),
  ],
} satisfies Meta<typeof SingleSliderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {};

export const Skeletons: Story = {
  args: { title: 'Загрузка подборки', items: [] },
};
