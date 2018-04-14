<template>
  <div>
    Main page
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.picture" @click="selectFriend(friend.id)" />
      </li>
    </ul>
    <br/>
    <br/>
    <div v-if="selectedFriend">
      {{ selectedFriend.name }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectFriend(friendId) {
      this.$router.push({ name: 'main_selected', params: { id: friendId }})
    }
  },
  data() {
    return {
      selected: null
    }
  },
  computed: {
    friends() {
      return this.$store.getters.userSelectedFriends;
    },
    selectedFriend() {
      if(!this.friends)
        return null;

      var id = this.$route.params.id;
      if(!id && this.friends)
        id = this.friends[0].id;

      if(!id)
        return null;

      for(var i=0; i<this.friends.length; i++) {
        if(this.friends[i].id == id)
          return this.friends[i];
      }
      
      return null;
    }
  }
}
</script>

<style scoped>

</style> 
