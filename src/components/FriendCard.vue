<template>
  <div>
    <img :src="friend.picture" />
    {{ friend.name }}
    <br />
    Mental Health Score: 
  </div>
</template>

<script>
export default {
  name: "friend-card",
  props: ['friend'],
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>
