<template>
  <div class="highlightBox">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'HighlightBox',
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';
@import '~@/styles/mixins.scss';

.highlightBox {
  color: $color-accent-faded;
  background-color: white;
  padding: 1rem;
  border-radius: $border-radius-default;
  color: $color-primary;
  @include border-standard;
  border-top: 1rem solid $color-accent-faded;
  @include shadow-blurry;

  h1 {
    font-size: 1.4em;
    margin: 0 0 1.5rem 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
}
</style>
