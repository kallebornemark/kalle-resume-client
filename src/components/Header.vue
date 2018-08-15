<template>
  <div class="header">
    <span class="name">Kalle Bornemark</span>
    <span class="subtitle">Developer</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
  }

  .subtitle {
    color: $color-accent;
    font-family: $font-secondary;
    font-size: 1.2em;
    letter-spacing: 5px;
    font-weight: bold;
    text-transform: lowercase;
    margin-top: .4rem;
  }
}
</style>
