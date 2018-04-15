<template>
  <div v-if="data">
    timeline

    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <img :src="photo.url" />
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
    this.$store.dispatch('fetchUserPhotos', this.friend.id).then(photos => {
      this.photos = photos;
    })
  },
  data() {
    return {
      data: this.friend,
      photos: [],
    }
  },
  methods: {
    
  },
  watch: {
    friend: function(newVal) {
      this.$store.dispatch('fetchUserPhotos', this.friend.id).then(photos => {
        this.photos = photos;
      });
      this.data = newVal;
    },
    photos: function(newVal) {
      if(!newVal)
        return;

      newVal.forEach(element => {
        this.$store.dispatch('fetchPhoto', element.id).then(photo => {
          element.url = photo.images[0].source;
          this.$forceUpdate()
          // console.log(element.id, photo);
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
