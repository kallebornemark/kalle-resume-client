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
.container {
  width: 24.5rem;
  height: 0.6rem;

  @media screen and (max-width: $screen-xs) {
    display: none;
  }

  .line {
    background-color: $color-accent-faded;
    height: 3px;
    width: 100%;
  }

  .shadow {
    height: 6px;
    background-color: $color-shadow;
    opacity: .5;
  }
}
</style>
