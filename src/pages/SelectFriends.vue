<template>
  <div>
    Select Friends:
    <v-text-field
      label="Search"
      v-model="search"
    ></v-text-field>
    <br/>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.picture" />
        {{ friend.name }}
        <v-checkbox v-model="friend.selected" />
      </li>
    </ul>
    <v-btn @click="save()" :disabled="!anySelected()">Select</v-btn>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      search: ''
    }
  },
  methods: {
    save() {
      var result = [];
      for(var i=0; i<this.friends.length; i++) {
        if(this.friends[i].selected)
          result.push(this.friends[i].id);
      }
      
      this.$store.dispatch('setSelectedFriends', result);
    },
    anySelected() {
      for(var i=0; i<this.friends.length; i++) {
        if(this.friends[i].selected)
          return true;
      }

      return false;
    }
  },
  computed: {
    friends() {
      var data = this.$store.getters.userAllFriends;
      if(this.search == null || this.search.length == 0 || !data)
        return data;

      return data.filter(friend => friend.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  }
}
</script>

<style scoped>

</style> 
