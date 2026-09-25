import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { computed } from 'vue';
import IconMail from '@/assets/icons/IconMail.vue';
import InputApp from './InputApp.vue';

const meta = {
  title: 'Components/Inputs/InputApp',
  component: InputApp,
  args: {
    modelValue: '',
    type: 'email',
    inputName: 'email',
    placeholder: 'Введите email',
    autocomplete: 'email',
    id: 'storybook-email',
  },
} satisfies Meta<typeof InputApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { InputApp, IconMail },
      setup() {
        const value = computed({
          get: () => args.modelValue,
          set: (modelValue) => updateArgs({ modelValue }),
        });

        return { args, value };
      },
      template: `
        <div style="width:min(420px, 80vw)">
          <InputApp v-bind="args" v-model="value">
            <template #iconLeft><IconMail /></template>
          </InputApp>
        </div>
      `,
    };
  },
};

export const Filled: Story = {
  args: { modelValue: 'viewer@example.com' },
  render: Default.render,
};
