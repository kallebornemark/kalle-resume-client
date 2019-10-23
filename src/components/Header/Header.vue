<template>
  <header>
    <section class="content">
      <h1 class="name">Kalle Bornemark</h1>
      <rolldown-blinds text="software builder 🔧" />
    </section>

    <login />
  </header>
</template>

<script>
import Login from '@/components/Login.vue'
import RolldownBlinds from '@/components/RolldownBlinds.vue'

export default {
  name: 'Header',
  components: { Login, RolldownBlinds },
}
</script>

<style scoped lang="scss">
header {
  height: 37vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: $screen-xs) {
    height: 80vh;
    margin-bottom: 0;
  }

  .content {
    height: 8.3rem;

    .name {
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: $color-primary;
      font-size: 2.6em;
      font-family: $font-primary;
      font-weight: 400;
    }
  }
}
</style>
