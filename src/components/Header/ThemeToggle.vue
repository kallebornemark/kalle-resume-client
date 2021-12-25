<template>
  <div>
    <el-switch class="button" v-model="darkMode" @change="toggleDarkMode"
      >Test</el-switch
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ThemeToggle',

  computed: {
    ...mapState(['darkMode']),
  },

  methods: {
    ...mapMutations(['toggleDarkMode']),
  },
};
</script>

<style scoped lang="scss">
.button {
  position: absolute;
  top: $spacing-sm + 0.2rem;
  right: 1.8rem;
}
</style>
