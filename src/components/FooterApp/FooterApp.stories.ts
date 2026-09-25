import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FooterApp from './FooterApp.vue';

const meta = {
  title: 'Components/FooterApp',
  component: FooterApp,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FooterApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
