<template>
  <div v-if="data">
    <img :src="data.picture" />
    {{ data.name }}
    <br />
    Mental Health Score: <span v-if="score" :style="{color: score.color}">{{ score.name }}</span>
  </div>
</template>

<script>
export default {
  name: "friend-card",
  props: ['friend'],
  created() {
    this.$store.dispatch('fetchUserFeed', this.friend.id).then(feed => {
      this.feed = feed;
    })
  },
  data() {
    return {
      data: this.friend,
      feed: [],
      score: null
    }
  },
  methods: {
    
  },
  watch: {
    friend: function(newVal) {
      this.$store.dispatch('fetchUserFeed', this.friend.id).then(feed => {
        this.feed = feed;
      });
      this.data = newVal;
    },
    feed: function(newVal) {
      this.score = null;
      this.$store.dispatch('getFeedScore', this.friend.id).then(score => {
        this.score = score;
      })
    }
  }
}
</script>

<style scoped>

</style>
