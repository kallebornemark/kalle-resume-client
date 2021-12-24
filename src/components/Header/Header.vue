<template>
  <header>
    <section class="content">
      <h1 class="name">Kalle Bornemark</h1>
      <!-- <rolldown-blinds text="software builder 🔧" /> -->
    </section>

    <login />
  </header>
</template>

<script>
import Login from '@/components/Login.vue';
// import RolldownBlinds from '@/components/RolldownBlinds.vue'

export default {
  name: 'Header',
  components: { Login /* RolldownBlinds */ },
};
</script>

<style scoped lang="scss">
header {
  height: 37vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: $screen-xs) {
    height: 70vh;
    margin-bottom: 0;
  }

  .content {
    height: 8.3rem;
    margin-top: 1rem;

    .name {
      margin-top: 0;
      margin-bottom: 0.7rem;
      color: $color-primary;
      font-size: 3.1em;
      font-weight: 400;
      font-family: 'Pacifico';

      @media screen and (max-width: $screen-xs) {
        font-size: 15vw;
        line-height: 1.3;
      }
    }
  }
}
</style>
