import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LoaderApp from './LoaderApp.vue';

const meta = {
  title: 'Components/Loader',
  component: LoaderApp,
} satisfies Meta<typeof LoaderApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
