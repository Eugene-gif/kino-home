import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { computed } from 'vue';
import VisibilitySwitch from './VisibilitySwitch.vue';

const meta = {
  title: 'Components/Inputs/VisibilitySwitch',
  component: VisibilitySwitch,
  args: {
    modelValue: true,
  },
} satisfies Meta<typeof VisibilitySwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { VisibilitySwitch },
      setup() {
        const checked = computed({
          get: () => args.modelValue,
          set: (modelValue) => updateArgs({ modelValue }),
        });

        return { checked };
      },
      template: '<VisibilitySwitch v-model="checked" />',
    };
  },
};

export const Hidden: Story = {
  args: { modelValue: false },
  render: Visible.render,
};
