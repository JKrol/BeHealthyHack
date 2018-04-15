<template>
  <section class="select-friends view">
    <assistant-bubble :message="message" />
    <div class="friends-list-wrapper">
      <friends-list :friends="friends" @interface="handleChildSelect" />
    </div>
    <solid-input name="search" placeholder="Search friends" @interface="handleChildStateChange" />
    <div class="buttons">
      <solid-button text="Next" :onClick="save" />
    </div>
  </section>
</template>

<script>
import AssistantBubble from "../components/AssistantBubble";
import FriendsList from "../components/FriendsList";
import SolidButton from "../components/SolidButton";
import SolidInput from "../components/SolidInput";

export default {
  components: {
    SolidButton,
    SolidInput,
    AssistantBubble,
    FriendsList
  },

  data() {
    return {
      search: "",
      message: "Hey! Select few friend you woudl like to improve your relation",
      selected: {}
    };
  },

  methods: {
    save() {
      const results = [];

      for (let i = 0; i < this.friends.length; i++) {
        if (this.selected[this.friends[i].id]) {
          results.push(this.friends[i].id);
        }
      }

      this.$store.dispatch("setSelectedFriends", results);
    },

    anySelected() {
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i].selected) return true;
      }

      return false;
    },

    handleChildStateChange (val) {
      this.search = val;
    },

    handleChildSelect (val) {
      // console.log(val)
      this.selected[val.id] = val.s;
    }
  },

  computed: {
    friends() {
      const data = this.$store.getters.userAllFriends;

      if (this.search == null || this.search.length == 0 || !data) {
        return data;
      }

      return data.filter(friend =>
        friend.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.select-friends {
  padding-bottom: 28px;
  padding-top: 34px;
  margin-top: auto;
  margin-bottom: auto;

  .friends-list-wrapper {
    margin-bottom: auto;
    margin-top: auto;
  }

  .solid-input {
    margin-top: auto;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 26px;

    .ghost {
      margin-right: 16px;
    }
  }
}
</style> 
