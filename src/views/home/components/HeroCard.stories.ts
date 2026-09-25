import type { Meta, StoryObj } from '@storybook/vue3-vite';
import placeholderImage from '@/assets/images/no-image.webp';
import HeroCard from './HeroCard.vue';

const meta = {
  title: 'Views/Home/HeroCard',
  component: HeroCard,
  args: {
    id: 157336,
    title: 'Интерстеллар',
    rating: '8.7',
    imageUrl: placeholderImage,
    genreNames: ['Фантастика', 'Драма'],
    date: '6 ноября 2014',
  },
} satisfies Meta<typeof HeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
