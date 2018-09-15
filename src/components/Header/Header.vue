<template>
  <div class="header">
    <span class="name">Kalle Bornemark</span>
    <header-line />
    <span class="subtitle">Web Developer</span>

    <login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import HeaderLine from '@/components/Header/HeaderLine.vue';

export default {
  name: 'Header',
  components: { Login, HeaderLine },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/styles/vars.scss';

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 15rem;

  .name {
    color: $color-primary;
    font-family: $font-primary;
    font-size: 3.3em;
    text-align: center;
    line-height: 4.3rem;
    padding: 0 1rem;
  }

  .subtitle {
    color: $color-primary;
    opacity: .45;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    letter-spacing: 4px;
    text-transform: lowercase;
    margin-top: .55rem;
    font-size: .95em;
  }
}
</style>
