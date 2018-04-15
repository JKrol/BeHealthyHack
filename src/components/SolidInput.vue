<template>
  <input class="solid-input" type="text" :placeholder="placeholder" :name="name" v-model="model" />
</template>

<script>
export default {
  name: "solid-input",
  props: ["placeholder", "name"],
  data() {
    return {
      model: ''
    }
  },
  watch: {
    model: function(newVal) {
      this.$emit('interface', newVal)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.solid-input {
  background-color: $color-white;
  border-radius: 4px;
  box-shadow: $box-shadow-default;
  color: $color-black;
  padding: 12px 16px;
  width: 100%;
  outline: none;
}
</style>
