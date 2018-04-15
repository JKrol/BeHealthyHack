<template>
  <div :class="['message-bubble', theme, direction]">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "message-bubble",
  props: ["message", "theme", "direction"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.message-bubble {
  display: inline-flex;
  box-shadow: $box-shadow-default;
  padding: 12px;
  width: 100%;

  &.in {
    border-radius: 4px 4px 4px 0;
  }

  &.out {
    border-radius: 4px 4px 0 4px;
  }

  &.t-white {
    background-color: $color-white;
  }

  &.t-green {
    background-color: $color-green;
  }
}
</style>
