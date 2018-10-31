<template>
  <div class="header">
    <h1 class="name">Kalle Bornemark</h1>

    <header-line />

    <transition name="fade-bounce" appear>
      <h4 class="subtitle">Web Developer</h4>
    </transition>

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
@import '~@/styles/vars.scss';

.header {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  height: 15rem;
  text-align: center;
  /* position: relative; */

  .name {
    color: $color-primary;
    font-family: $font-primary;
    font-size: 3.3em;
    text-align: center;
    line-height: 4.7rem;
    padding: 0 1rem;
    margin: 3.5rem 0 0 0;
  }

  .subtitle {
    position: absolute;
    top: 9.5rem;
    color: transparentize($color: $color-primary, $amount: .25);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    letter-spacing: 4px;
    text-transform: lowercase;
    font-size: .95em;
    font-weight: 400;
    margin: 0;
  }
}

.fade-bounce-enter-active, {
  transition: opacity .55s cubic-bezier(.87,-.41,.19,1.44), top .5s cubic-bezier(.87,-.41,.19,1.44);
  /* transition: opacity .5s, top; */
  transition-delay: .3s;
}
.fade-bounce-enter, {
  opacity: 0;
  top: 7rem !important;
}
.fade-bounce-enter-to {
  opacity: 1;
  top: 9.5rem;
}
</style>
