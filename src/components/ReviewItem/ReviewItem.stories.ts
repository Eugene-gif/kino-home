import type { Meta, StoryObj } from '@storybook/vue3-vite';
import avatar from '@/assets/images/logo.webp';
import ReviewItem from './ReviewItem.vue';

const meta = {
  title: 'Components/ReviewItem',
  component: ReviewItem,
  decorators: [
    () => ({ template: '<ul style="max-width:720px"><story /></ul>' }),
  ],
  args: {
    name: 'Анна Смирнова',
    avatar,
    date: '15 сентября 2026, 18:40',
    rating: 9,
    content: 'Отличный фильм с сильной актёрской игрой и запоминающейся атмосферой.',
  },
} satisfies Meta<typeof ReviewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortReview: Story = {};

export const LongReview: Story = {
  args: {
    content: `${'Фильм постепенно раскрывает героев и не торопится с выводами. '.repeat(6)}Финал логично завершает историю и оставляет пространство для обсуждения.`,
  },
};
