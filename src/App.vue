<template>
  <div id="app">
    <portfolio-header />

    <portfolio-main />

    <portfolio-footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
import '@/styles/styles.scss';

export default {
  components: {
    'portfolio-header': Header,
    'portfolio-main': Main,
    'portfolio-footer': Footer,
  },
};
</script>


<style lang="scss">
@import '~@/styles/vars.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 1rem;
  max-width: 70rem;
  margin: 0 auto;
}
</style>
