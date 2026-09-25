import { defineComponent } from 'vue';

export const VueYtframe = defineComponent({
  name: 'VueYtframeStorybookMock',
  props: {
    videoId: String,
  },
  template: `
    <div
      style="display:grid;place-items:center;width:100%;height:100%;min-height:320px;background:#000;color:#fff;border-radius:8px"
    >
      YouTube video: {{ videoId }}
    </div>
  `,
});
