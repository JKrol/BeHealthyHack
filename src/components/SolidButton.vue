<template>
  <button :class="['solid-button', theme]" @click='onClick()' >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "solid-button",
  props: ["onClick", "text", "disabled", "theme"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.solid-button {
  background: $gradient-linear-blue;
  border-radius: 4px;
  box-shadow: $box-shadow-default;
  color: $color-white;
  padding: 10px 28px;
  position: relative;
  text-transform: uppercase;
  font-weight: 500;
  overflow: hidden;

  &.ghost {
    background: transparent;
    box-shadow: none;

    &:after {
      display: none;
    }
  }

  &:after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color-white, 0.1);
  }
}
</style>
