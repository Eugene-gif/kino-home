import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import { ref } from 'vue';
import InputSearch from '@/components/Inputs/InputSearch.vue';
import ModalSearch from './ModalSearch.vue';

const meta = {
  title: 'Components/Modals/ModalSearch',
  component: ModalSearch,
  args: {
    isOpen: true,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ModalSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { ModalSearch, InputSearch },
      setup() {
        const query = ref('');
        const closeModal = () => updateArgs({ isOpen: false });

        return { args, closeModal, query };
      },
      template: `
        <ModalSearch :is-open="args.isOpen" @close="closeModal">
          <template #search>
            <InputSearch v-model:text="query" :loading="false" />
          </template>
          <template #content>
            <h2>Результаты поиска</h2>
            <p>Введите название фильма, сериала или имя актёра.</p>
          </template>
        </ModalSearch>
      `,
    };
  },
};
