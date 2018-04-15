<template>
  <div class="solid-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["placeholder", "name", "model"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.solid-card {
  background-color: $color-white;
  box-shadow: $box-shadow-default;
  display: flex;
  padding: 12px;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  .image {
    width: 100%;
  }

  img {
    width: 100%;
    display: block;
  }
}
</style>
