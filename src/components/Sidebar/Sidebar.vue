<template>
  <div class="sidebar"><info-card /></div>
</template>

<script>
import InfoCard from "./InfoCard.vue";

export default {
  name: "Sidebar",
  components: { InfoCard }
};
</script>

<style scoped lang="scss">
.sidebar {
  position: absolute;

  @media screen and (max-width: $screen-md) {
    position: initial;
    width: 100%;
    margin-right: 0;
  }
}
</style>
