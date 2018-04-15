<template v-if="data">
  <div class="friend-card">
    <img :src="data.picture" />
    <div class="mood-icon" v-if="score">
      <div v-if="score.name === 'BAD'" v-html="sadIcon" />
      <div v-else-if="score.name === 'GOOD'" v-html="happyIcon" />
    </div>
    <div class="name">{{ data.name }}</div>
      <div class="score">
        <span>Mental Health Score:</span>
        <span v-if="score" :style="{color: score.color}">{{ score.name }}</span>
      </div>
      <div class="cta">
        <div class="cta-button">
          <div class="icon" v-html="phoneIcon" />
          <div>CALL</div>
        </div>
        <div class="cta-button">
          <div class="icon" v-html="messageIcon" />
          <div>MESSAGE</div>
        </div>
      </div>
  </div>
</template>

<script>
import phoneIcon from "../assets/phone.svg";
import messageIcon from "../assets/message.svg";
import sadIcon from "../assets/sad_icon.svg";
import happyIcon from "../assets/happy_icon.svg";

export default {
  name: "friend-card",
  props: ["friend"],
  created() {
    this.$store.dispatch("fetchUserFeed", this.friend.id).then(feed => {
      this.feed = feed;
    });
  },
  data() {
    return {
      data: this.friend,
      feed: [],
      score: null,
      phoneIcon,
      messageIcon,
      sadIcon,
      happyIcon
    };
  },
  methods: {},
  watch: {
    friend: function(newVal) {
      this.$store.dispatch("fetchUserFeed", this.friend.id).then(feed => {
        this.feed = feed;
      });
      this.data = newVal;
    },
    feed: function(newVal) {
      this.score = null;
      this.$store.dispatch("getFeedScore", this.friend.id).then(score => {
        this.score = score;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/config/index";

.friend-card {
  border-radius: 4px;
  background-color: $color-white;
  box-shadow: $box-shadow-default;
  padding: 58px 12px 16px;
  margin-top: 154px;
  position: relative;
  font-weight: 500;
  font-size: 14px;
  color: $color-black;
  margin-bottom: 16px;

  img {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    color: $color-black;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid $color-black;
    padding-bottom: 14px;
    margin-bottom: 16px;
  }

  .score {
    display: flex;
    justify-content: space-between;
  }

  .cta {
    padding-top: 24px;
    justify-content: space-around;
  }

  .cta,
  .cta-button {
    display: flex;
  }

  .icon {
    width: 21px;
    height: 21px;
    margin-right: 12px;
  }

  .mood-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 16px;
    left: 52%;
  }
}
</style>
