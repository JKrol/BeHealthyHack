<template>
  <div class="icon-placeholder" v-html="svg"></div>
</template>

<script>
export default {
  name: "icon-placeholder",
  props: ["svg"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.icon-placeholder {
  background: $gradient-linear-blue;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
  }
}
</style>
