import type { Meta, StoryObj } from '@storybook/vue3-vite';
import IconPlay from '@/assets/icons/IconPlay.vue';
import ButtonApp from './ButtonApp.vue';

const meta = {
  title: 'Components/Button',
  component: ButtonApp,
  args: {
    disabled: false,
    loading: false,
    round: false,
  },
} satisfies Meta<typeof ButtonApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonApp },
    setup: () => ({ args }),
    template: '<ButtonApp v-bind="args">Смотреть</ButtonApp>',
  }),
};

export const WithIcon: Story = {
  render: (args) => ({
    components: { ButtonApp, IconPlay },
    setup: () => ({ args }),
    template: `
      <ButtonApp v-bind="args" class="red">
        <template #icon><IconPlay /></template>
        <template #textRight>Смотреть</template>
      </ButtonApp>
    `,
  }),
};

export const Loading: Story = {
  args: { loading: true },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const Link: Story = {
  args: { href: '/movies' },
  render: (args) => ({
    components: { ButtonApp },
    setup: () => ({ args }),
    template: '<ButtonApp v-bind="args">Каталог фильмов</ButtonApp>',
  }),
};
