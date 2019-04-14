<template>
  <main>
    <top-section />

    <div class="down-arrow"><down-arrow /></div>

    <sections />
  </main>
</template>

<script>
import TopSection from '@/components/TopSection/TopSection.vue'
import DownArrow from '@/components/Icons/DownArrow/DownArrow.vue'
import Sections from '@/components/Sections.vue'

export default {
  name: 'MainContainer',
  components: {
    TopSection,
    DownArrow,
    Sections,
  },
}
</script>

<style scoped lang="scss">
main {
  .down-arrow {
    height: 1rem;
    display: flex;
    justify-content: center;
    margin: $spacing-xl 0;

    @media screen and (max-width: $screen-sm) {
      margin: $spacing-lg 0;
    }
  }

  hr {
    margin: $spacing-xxl auto;
  }
}
</style>
