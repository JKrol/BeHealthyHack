<template>
  <div>
    <card>
      <icon-placeholder :svg="confettiIcon" />
      <p>{{friend.name}} has birthsday today! Call him and wish all the best!</p>
    </card>
    <div v-if="data">
      <div>
        <card v-for="item in timeline" :key="item.id">
          <div :class="[item.type == 'IMG' && 'floating']">
            <icon-placeholder v-if="item.score.name === 'BAD'" :svg="sadIcon" />
            <icon-placeholder v-else :svg="happyIcon" />
          </div>
          <div class="item.type === 'IMG' && image">
            <img v-if="item.type=='IMG'" :src="item.url" />
            <span v-if="item.type=='MSG'">{{ item.message }}</span>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Card from "../components/Card";
import IconPlaceholder from "../components/IconPlaceholder";
import sadIcon from "../assets/sad_icon.svg";
import happyIcon from "../assets/happy_icon.svg";
import confettiIcon from "../assets/confetti_icon.svg";

export default {
  components: {
    Card,
    IconPlaceholder
  },
  name: "friend-timeline",
  props: ["friend"],
  created() {
    this.$store.dispatch("getTimeline", this.friend.id).then(timeline => {
      this.timeline = timeline;
    });
  },
  data() {
    return {
      sadIcon,
      happyIcon,
      confettiIcon,
      data: this.friend,
      timeline: []
    };
  },
  methods: {},
  watch: {
    friend: function(newVal) {
      this.timeline = [];

      this.$store.dispatch("getTimeline", this.friend.id).then(timeline => {
        this.timeline = timeline;
      });
      this.data = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  position: relative;

  img {
    width: 100%;
  }
}

.icon-placeholder {
  margin-right: 16px;
}

.floating {
  position: absolute;
  top: 14px;
  left: 14px;
}
</style>
