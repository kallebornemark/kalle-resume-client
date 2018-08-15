<template>
  <div class="sidebar">
    <info-card />
  </div>
</template>

<script>
import InfoCard from './InfoCard.vue';

export default {
  name: 'Sidebar',
  components: { InfoCard },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.sidebar {
  width: 15.5rem;
  margin-right: 1.5rem;

  @media screen and (max-width: $screen-md) {
    width: 100%;
    margin-right: 0;
  }
}
</style>
