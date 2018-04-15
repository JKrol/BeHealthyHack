<template>
  <nav class="bottom-menu">
    <div v-html="nav1" />
    <div v-html="nav2" />
    <div v-html="nav3" @click="onNav3Click()" />
  </nav>
</template>

<script>
import nav1 from "../assets/nav_people_icon.svg";
import nav2 from "../assets/nav_profile_icon.svg";
import nav3 from "../assets/nav_chat_icon.svg";

export default {
  name: "bottom-menu",
  props: ["onNav3Click"],
  data() {
    return {
      nav1,
      nav2,
      nav3
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.bottom-menu {
  position: fixed;
  align-items: center;
  justify-content: space-around;
  bottom: 0;
  display: flex;
  left: 0;
  height: 54px;
  width: 100%;
  box-shadow: $box-shadow-default-up;
  background-color: $color-white;
}
</style>
