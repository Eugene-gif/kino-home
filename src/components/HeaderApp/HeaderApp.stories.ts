import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useAuthStore } from '@/stores/auth';
import HeaderApp from './HeaderApp.vue';

const meta = {
  title: 'Components/HeaderApp',
  component: HeaderApp,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeaderApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Guest: Story = {
  render: () => ({
    components: { HeaderApp },
    setup() {
      const authStore = useAuthStore();
      authStore.user = null;
      return {};
    },
    template: '<HeaderApp />',
  }),
};

export const Authenticated: Story = {
  render: () => ({
    components: { HeaderApp },
    setup() {
      const authStore = useAuthStore();
      authStore.user = {
        id: 'storybook-user',
        name: 'Иван',
        email: 'user@example.com',
      };
      return {};
    },
    template: '<HeaderApp />',
  }),
};
