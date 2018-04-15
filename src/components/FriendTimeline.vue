<template>
  <div v-if="data">
    timeline
  </div>
</template>

<script>
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

      for(var i=0; i<newVal.length; i++) {
        this.$store.dispatch('fetchPhoto', newVal[i].id).then(photo => {
          console.log(photo);
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
