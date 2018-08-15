<template>
  <el-popover
    placement="left-start"
    width="200"
    trigger="manual"
    v-model="isVisible">
    <div class="login-dialog">
      <el-input
        placeholder="Username"
        v-model="username"
        prefix-icon="far fa-user-circle"
        @keyup.enter.native="login"
        autofocus
      />
      <el-input
        placeholder="Password"
        v-model="password"
        prefix-icon="fas fa-key"
        type="password"
        @keyup.enter.native="login"
      />
      <el-button style="width: 100%" @click="login">Log in</el-button>
    </div>

    <div class="login-trigger" slot="reference" v-if="!isLoggedIn" @click="togglePopover" :style="{ opacity: iconOpacity }">
      <i class="far fa-user-circle" />
    </div>
    <div class="login-trigger" slot="reference" v-else @click="logout" :style="{ opacity: iconOpacity }">
      <i class="fas fa-sign-out-alt" />
    </div>
  </el-popover>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LoginTrigger',

  data() {
    return {
      isVisible: false,
      username: '',
      password: '',
    };
  },

  computed: {
    ...mapState(['isLoggedIn']),

    iconOpacity() {
      return this.isVisible ? 1 : null;
    },
  },

  methods: {
    ...mapMutations(['setToken']),

    togglePopover() {
      this.isVisible = !this.isVisible;
    },

    resetPopover() {
      this.isVisible = false;
      this.username = '';
      this.password = '';
    },

    async login() {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      const body = JSON.stringify({
        username: this.username,
        password: this.password,
      });

      try {
        const user = await fetch(`${process.env.VUE_APP_API_URL}/api/Users/login`, {
          method: 'POST',
          headers,
          body,
        });
        const userJson = await user.json();

        if (userJson.error) {
          alert(userJson.error.message);
        } else {
          this.setToken(userJson.id);
          this.resetPopover();
        }
      } catch (e) {
        alert('Unsuccessful login');
      }
    },

    logout() {
      this.setToken();
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/vars.scss';

.login-trigger {
  position: absolute;
  right: $spacing-sm;
  top: $spacing-sm;
  padding: $spacing-xs;
  font-size: 1.5em;
  opacity: .12;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.login-dialog {
  .el-input {
    margin-bottom: 1rem;
  }
}
</style>
