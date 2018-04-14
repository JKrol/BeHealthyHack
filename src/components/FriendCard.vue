<template>
  <div v-if="data">
    <img :src="data.picture" />
    {{ data.name }}
    <br />
    Mental Health Score: 
  </div>
</template>

<script>
export default {
  name: "friend-card",
  props: ['friend'],
  created() {
    this.$store.dispatch('fetchUserFeed', this.friend.id);
  },
  data() {
    return {
      data: this.friend
    }
  },
  methods: {
    
  },
  watch: {
    friend: function(newVal) {
      this.$store.dispatch('fetchUserFeed', this.friend.id);
      this.data = newVal;
    }
  }
}
</script>

<style scoped>

</style>
