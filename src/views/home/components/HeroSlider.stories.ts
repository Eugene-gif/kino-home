import type { Meta, StoryObj } from '@storybook/vue3-vite';
import placeholderImage from '@/assets/images/no-image.webp';
import HeroSlider from './HeroSlider.vue';

const heroItems = [
  { id: 1, title: 'Интерстеллар', rating: '8.7', imageUrl: placeholderImage, genreNames: ['Фантастика', 'Драма'], date: '2014' },
  { id: 2, title: 'Дюна', rating: '8.0', imageUrl: placeholderImage, genreNames: ['Фантастика'], date: '2021' },
  { id: 3, title: 'Прибытие', rating: '7.9', imageUrl: placeholderImage, genreNames: ['Фантастика', 'Драма'], date: '2016' },
  { id: 4, title: 'Начало', rating: '8.4', imageUrl: placeholderImage, genreNames: ['Фантастика', 'Триллер'], date: '2010' },
];

const meta = {
  title: 'Views/Home/HeroSlider',
  component: HeroSlider,
  args: { heroItems },
  parameters: { layout: 'fullscreen' },
  decorators: [
    () => ({ template: '<div style="padding:32px;min-height:620px"><story /></div>' }),
  ],
} satisfies Meta<typeof HeroSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
