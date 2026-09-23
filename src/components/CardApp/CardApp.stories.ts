import type { Meta, StoryObj } from '@storybook/vue3-vite';
import IconHeartFavorite from '@/assets/icons/IconHeartFavorite.vue';
import IconClose from '@/assets/icons/IconClose.vue';
import placeholderImage from '@/assets/images/no-image.webp';
import ButtonApp from '@/components/Button/ButtonApp.vue';
import CardApp from './CardApp.vue';

const meta = {
  title: 'Components/CardApp',
  component: CardApp,
  args: {
    id: 550,
    title: 'Бойцовский клуб',
    rating: '8.4',
    imageUrl: placeholderImage,
    genreStringNames: 'Драма, триллер',
    mediaType: 'movie',
  },
} satisfies Meta<typeof CardApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Movie: Story = {};

export const TvSeries: Story = {
  args: {
    id: 1396,
    title: 'Во все тяжкие',
    rating: '8.9',
    genreStringNames: 'Драма, криминал',
    mediaType: 'tv',
  },
};

export const Favorite: Story = {
  render: (args) => ({
    components: { CardApp, ButtonApp, IconHeartFavorite, IconClose },
    setup: () => ({ args }),
    template: `
      <CardApp v-bind="args">
        <template #favorite>
          <ButtonApp class="sm blur bg-none" aria-label="В избранном">
            <template #icon><IconHeartFavorite /></template>
          </ButtonApp>
          <ButtonApp class="sm blur bg-none" aria-label="Закрыть">
            <template #icon><IconClose /></template>
          </ButtonApp>
        </template>
      </CardApp>
    `,
  }),
};
