<template>
  <section class="main view">
    <friend-chooser :friends="friends" :onClick="selectFriend" />ster
    <div v-if="selectedFriend">
      <friend-card :friend="selectedFriend" />
      <friend-timeline :friend="selectedFriend" />
    </div>
    <bottom-menu :onNav3Click="goToBot" />
  </section>
</template>

<script>
import FriendCard from "../components/FriendCard";
import FriendTimeline from "../components/FriendTimeline";
import FriendChooser from "../components/FriendChooser";
import BottomMenu from "../components/BottomMenu";

export default {
  components: {
    FriendChooser,
    FriendCard,
    FriendTimeline,
    BottomMenu
  },
  methods: {
    selectFriend(friendId) {
      this.$router.push({ name: "main_selected", params: { id: friendId } });
    },
    goToBot() {
      this.$router.push({ name: "bot" });
    }
  },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    friends() {
      return this.$store.getters.userSelectedFriends;
    },
    selectedFriend() {
      if (!this.friends) return null;

      var id = this.$route.params.id;
      if (!id && this.friends) id = this.friends[0].id;

      if (!id) return null;

      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].id == id) return this.friends[i];
      }

      return null;
    }
  }
};
</script>

<style scoped>
.main {
  padding-bottom: 120px;
}
</style> 
