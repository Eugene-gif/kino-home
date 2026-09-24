import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/preview-api';
import ModalVideoPlayer from './ModalVideoPlayer.vue';

const meta = {
  title: 'Components/Modals/ModalVideoPlayer',
  component: ModalVideoPlayer,
  args: {
    isOpen: true,
    videoKey: 'O-b2VfmmbyA',
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ModalVideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { ModalVideoPlayer },
      setup() {
        const closeModal = () => updateArgs({ isOpen: false });

        return { args, closeModal };
      },
      template: `
        <ModalVideoPlayer
          :is-open="args.isOpen"
          :video-key="args.videoKey"
          @close="closeModal"
        />
      `,
    };
  },
};
