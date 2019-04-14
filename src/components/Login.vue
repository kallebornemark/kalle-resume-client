<template>
  <el-popover
    placement="left-start"
    width="200"
    trigger="click"
    v-model="isVisible"
  >
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

    <div
      class="login-trigger"
      slot="reference"
      v-if="!isLoggedIn"
      @click="togglePopover"
      :style="{ opacity: iconOpacity }"
    >
      <i class="far fa-user-circle" />
    </div>
    <div
      class="login-trigger"
      slot="reference"
      v-else
      @click="logout"
      :style="{ opacity: iconOpacity }"
    >
      <i class="fas fa-sign-out-alt" />
    </div>
  </el-popover>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import API from '@/api'

export default {
  name: 'LoginTrigger',

  data() {
    return {
      isVisible: false,
      username: '',
      password: '',
    }
  },

  computed: {
    ...mapState(['isLoggedIn']),

    iconOpacity() {
      return this.isVisible ? 1 : null
    },
  },

  methods: {
    ...mapMutations(['setToken', 'logout']),

    togglePopover() {
      this.isVisible = !this.isVisible
    },

    resetPopover() {
      this.isVisible = false
      this.username = ''
      this.password = ''
    },

    async login() {
      const response = await API.postJson(
        '/api/Users/login',
        JSON.stringify({
          username: this.username,
          password: this.password,
        })
      )

      if (response.error) {
        alert('Unsuccessful login!')
        return
      }

      this.setToken(response.token)
      this.resetPopover()
    },
  },
}
</script>

<style lang="scss">
.login-trigger {
  position: absolute;
  right: $spacing-sm;
  top: $spacing-sm;
  padding: $spacing-xs;
  font-size: 1.5em;
  opacity: 0.12;
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
