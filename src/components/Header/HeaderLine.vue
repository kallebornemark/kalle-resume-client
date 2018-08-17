<template>
  <div class="container">
    <div class="line" />
    <div class="shadow" />
  </div>
</template>

<script>
export default {
  name: 'HeaderLine',
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.container {
  width: 24.5rem;
  margin-bottom: 4px;
  position: relative;

  @media screen and (max-width: $screen-xs) {
    display: none;
  }

  .line {
    background-color: $color-accent-faded;
    height: 3px;
    width: 100%;
  }

  .shadow {
    padding: 0 5px 5px 5px;
    position: absolute;
    top: 3px;
    bottom: 0;
    left: 0;
    right: -.39rem;
    background-color: $color-shadow;
    opacity: .6;
    clip-path: polygon(0 0, calc(100% - .4rem) 0, 100% 100%, .4rem 100%);
  }
}
</style>
