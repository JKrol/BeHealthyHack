<template>
  <div v-if="data">
    timeline

    <ul>
      <li v-for="item in timeline" :key="item.id">
        <img v-if="item.type=='IMG'" :src="item.url" style="max-width: 150px;"/>
        <span v-if="item.type=='MSG'">{{ item.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "friend-timeline",
  props: ['friend'],
  created() {
    this.$store.dispatch('getTimeline', this.friend.id).then(timeline => {
      this.timeline = timeline;
    });
  },
  data() {
    return {
      data: this.friend,
      timeline: [],
    }
  },
  methods: {
    
  },
  watch: {
    friend: function(newVal) {
      this.timeline = [];

      this.$store.dispatch('getTimeline', this.friend.id).then(timeline => {
        this.timeline = timeline;
      });
      this.data = newVal;
    }
  }
}
</script>

<style scoped>

</style>
