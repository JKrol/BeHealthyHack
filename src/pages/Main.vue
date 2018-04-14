<template>
  <div>
    Main page
    <br/><br/>
    Friends:
    <br/>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        {{ friend.name }}
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
      return this.$store.getters.userFriends;
    }
  }
}
</script>

<style scoped>

</style>
