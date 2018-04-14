<template>
  <div>
    Main page
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.picture" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    
  },
  computed: {
    friends() {
      return this.$store.getters.userSelectedFriends;
    }
  }
}
</script>

<style scoped>

</style> 
