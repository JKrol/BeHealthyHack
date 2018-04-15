<template>
  <div class="view login">
    <template v-if="isLoginPending">
      <div class="logo" v-html="logo" />
    </template>
    <template v-else>
      <assistant-bubble message="Welcome to the magic health! Login with facebook to start using the app!" />
      <solid-button :onClick="login" text="Login with facebook"/>
    </template>
  </div>
</template>


<script>
import AssistantBubble from "../components/AssistantBubble";
import SolidButton from "../components/SolidButton";
import MessageBubble from "../components/MessageBubble";

import logo from "../assets/logo.svg";

export default {
  components: {
    AssistantBubble,
    MessageBubble,
    SolidButton
  },

  data () {
    return {
      logo
    };
  },

  methods: {
    login() {
      this.$store.dispatch("login");
    }
  },

  computed: {
    isLoginPending() {
      return this.$store.getters.isLoginPending;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  }
};
</script>


<style lang="scss" scoped>
.login {
  display: flex;
  height: 100%;
  padding-bottom: 80px;
  padding-top: 30px;

  .solid-button {
    align-self: center;
    margin-top: auto;
  }
}

.logo {
  width: 53%;
  height: auto;
}
</style>
