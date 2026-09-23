import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import InputSearch from './InputSearch.vue';

const meta = {
  title: 'Components/Inputs/InputSearch',
  component: InputSearch,
  args: {
    text: '',
    loading: false,
  },
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: { InputSearch },
  setup() {
    const text = ref(args.text);
    return { args, text };
  },
  template: `
    <div style="width:min(720px, 85vw)">
      <InputSearch v-bind="args" v-model:text="text" />
    </div>
  `,
});

export const Empty: Story = { render };

export const WithQuery: Story = {
  args: { text: 'Интерстеллар' },
  render,
};

export const Loading: Story = {
  args: { text: 'Интерстеллар', loading: true },
  render,
};
