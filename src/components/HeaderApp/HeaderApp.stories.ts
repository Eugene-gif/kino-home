import type { Meta, StoryObj } from '@storybook/vue3-vite';
import HeaderApp from './HeaderApp.vue';

const meta = {
  title: 'Components/HeaderApp',
  component: HeaderApp,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeaderApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Guest: Story = {};
