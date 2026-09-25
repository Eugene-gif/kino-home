import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import IconMail from '@/assets/icons/IconMail.vue';
import FormField from './FormField.vue';
import InputApp from './InputApp.vue';
import LabelApp from './LabelApp.vue';

const meta = {
  title: 'Components/Inputs/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailField: Story = {
  render: () => ({
    components: { FormField, InputApp, LabelApp, IconMail },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField style="width:min(420px, 80vw)">
        <LabelApp text="Почта" />
        <InputApp v-model="value" type="email" placeholder="Введите email" autocomplete="email">
          <template #iconLeft><IconMail /></template>
        </InputApp>
      </FormField>
    `,
  }),
};
