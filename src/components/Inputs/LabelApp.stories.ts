import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LabelApp from './LabelApp.vue';

const meta = {
  title: 'Components/Inputs/LabelApp',
  component: LabelApp,
  args: {
    text: 'Почта',
    id: 'storybook-label-target',
  },
} satisfies Meta<typeof LabelApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
