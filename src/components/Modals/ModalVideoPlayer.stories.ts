import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
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
  render: (args) => ({
    components: { ModalVideoPlayer },
    setup() {
      const isOpen = ref(args.isOpen);
      return { args, isOpen };
    },
    template: `
      <ModalVideoPlayer
        :is-open="isOpen"
        :video-key="args.videoKey"
        @close="isOpen = false"
      />
    `,
  }),
};
