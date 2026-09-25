import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import IconPlay from '@/assets/icons/IconPlay.vue';
import ButtonApp from './ButtonApp.vue';

type ButtonColorVariant =
  | 'default'
  | 'red'
  | 'blue'
  | 'violet'
  | 'green'
  | 'green-bright'
  | 'yellow';

interface ButtonStoryArgs {
  round?: boolean | string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  colorVariant: ButtonColorVariant;
}

const meta = {
  title: 'Components/Button',
  component: ButtonApp,
  tags: ['autodocs'],
  args: {
    disabled: false,
    loading: false,
    round: false,
    colorVariant: 'default',
  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: ['default', 'red', 'blue', 'violet', 'green', 'green-bright', 'yellow'],
      description: 'Цветовой CSS-класс из ButtonApp.vue',
      table: { category: 'Story controls' },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonApp },
    setup() {
      const buttonClass = computed(() =>
        args.colorVariant === 'default' ? undefined : args.colorVariant,
      );
      const buttonProps = computed(() => ({
        round: args.round,
        disabled: args.disabled,
        loading: args.loading,
        href: args.href,
      }));

      return { buttonClass, buttonProps };
    },
    template: '<ButtonApp v-bind="buttonProps" :class="buttonClass">Смотреть</ButtonApp>',
  }),
};

export const WithIcon: Story = {
  args: { colorVariant: 'red' },
  render: (args) => ({
    components: { ButtonApp, IconPlay },
    setup() {
      const buttonClass = computed(() =>
        args.colorVariant === 'default' ? undefined : args.colorVariant,
      );
      const buttonProps = computed(() => ({
        round: args.round,
        disabled: args.disabled,
        loading: args.loading,
        href: args.href,
      }));

      return { buttonClass, buttonProps };
    },
    template: `
      <ButtonApp v-bind="buttonProps" :class="buttonClass">
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
    setup() {
      const buttonClass = computed(() =>
        args.colorVariant === 'default' ? undefined : args.colorVariant,
      );
      const buttonProps = computed(() => ({
        round: args.round,
        disabled: args.disabled,
        loading: args.loading,
        href: args.href,
      }));

      return { buttonClass, buttonProps };
    },
    template:
      '<ButtonApp v-bind="buttonProps" :class="buttonClass">Каталог фильмов</ButtonApp>',
  }),
};
