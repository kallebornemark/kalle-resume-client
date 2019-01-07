<template>
  <hr>
</template>

<script>
export default {
  name: "Divider"
};
</script>

<style lang="scss" scoped>
hr {
  height: 2px;
  background-color: $color-accent;
  width: 5rem;
  border: none;
  margin: 0 auto;
  border-radius: 5px;
  opacity: 0.4;

  @media screen and (max-width: $screen-sm) {
    width: 90%;
  }
}
</style>
