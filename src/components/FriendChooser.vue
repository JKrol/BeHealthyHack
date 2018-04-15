<template>
  <div class="friend-chooser">
      <div v-for="friend in friends" class="friend" :key="friend.id">
        <img :src="friend.picture" class="image" @click="onClick(friend.id)" />
        <div>{{friend.name.split(' ')[0]}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "friend-chooser",
  props: ["friends", "onClick"]
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index.scss";

.friend-chooser {
  background-color: $color-white;
  box-shadow: $box-shadow-default;
  display: flex;
  padding: 12px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $z-index-header;

  .friend {
    margin-left: 16px;
    text-align: center;
    color: $color-black;
    font-weight: 500;

    .image {
      margin: 0 auto;
      border-radius: 50%;
    }
  }
}
</style>
