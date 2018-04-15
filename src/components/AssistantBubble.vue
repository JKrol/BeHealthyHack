<template>
  <div :class='["assistant-bubble", message]'>
    <div v-html="pulse" class="pulse" />
    <message-bubble :message='message' theme="t-white" direction='in' />
  </div>
</template>

<script>
import MessageBubble from './MessageBubble';

import pulse from "../assets/pulse.svg";

export default {
  name: 'assistant-bubble',
  props: ["message"],
  components: {
    MessageBubble
  },

  data() {
    return {
      pulse
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.assistant-bubble {
  display: flex;
  align-items: flex-end;
  width: 100%;

  .pulse {
    height: 80px;
    margin-right: 16px;
    width: 80px;
  }

  .message-bubble {
    margin-bottom: 6px;
  }
}
</style>
