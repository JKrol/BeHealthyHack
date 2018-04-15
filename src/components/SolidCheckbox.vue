<template>
  <div class="solid-checkbox">
    <input type="checkbox" :name="name" v-model="model" />
    <div class="indicator"></div>
  </div>
</template>

<script>
export default {
  name: "solid-checkbox",
  props: ["name", "model"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.solid-checkbox {
  [type="checkbox"] {
    appearance: none;
    position: absolute;

    &:checked {
      ~ .indicator {
        background-color: $color-green;
      }
    }
  }

  .indicator {
    width: 18px;
    height: 18px;
    background-color: $color-white;
    border-radius: 4px;
  }
}
</style>
