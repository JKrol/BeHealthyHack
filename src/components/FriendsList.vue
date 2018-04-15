<template>
  <div class="friends-list">
    <label class="friend" v-for="friend in friends" :key="friend.id">
        <img class="image" :src="friend.picture" />
        <div class="name">{{ friend.name }}</div>
        <solid-checkbox name="friend" :model="friend.selected" />
    </label>
  </div>
</template>

<script>
import MessageBubble from "./MessageBubble";
import SolidCheckbox from "./SolidCheckbox";

import pulse from "../assets/pulse.svg";

export default {
  name: "friends-list",
  props: ["friends"],
  components: {
    SolidCheckbox
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.friends-list {
  display: flex;
  flex-direction: column;
}

.friend {
  display: flex;
  align-items: center;

  + .friend {
    margin-top: 16px;
  }

  .image {
    border-radius: 50%;
    overflow: hidden;
  }

  .name {
    color: $color-white;
    margin-left: 12px;
    font-size: 14px;
  }

  .solid-checkbox {
    margin-left: auto;
  }
}
</style>
