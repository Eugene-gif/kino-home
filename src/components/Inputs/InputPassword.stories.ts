import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { computed } from 'vue';
import InputPassword from './InputPassword.vue';

const meta = {
  title: 'Components/Inputs/InputPassword',
  component: InputPassword,
  args: {
    modelValue: '',
    inputName: 'password',
    placeholder: 'Введите пароль',
    autocomplete: 'current-password',
    id: 'storybook-password',
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { InputPassword },
      setup() {
        const value = computed({
          get: () => args.modelValue,
          set: (modelValue) => updateArgs({ modelValue }),
        });

        return { args, value };
      },
      template: `
        <div style="width:min(420px, 80vw)">
          <InputPassword v-bind="args" v-model="value" />
        </div>
      `,
    };
  },
};

export const Filled: Story = {
  args: { modelValue: 'secret-password' },
  render: Empty.render,
};
