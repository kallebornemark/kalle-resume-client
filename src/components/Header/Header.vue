<template>
  <header>
    <section class="content">
      <h1 class="name">Kalle Bornemark</h1>
      <rolldown-blinds text="software builder 🔧👷‍♂️"/>
    </section>

    <login/>
  </header>
</template>

<script>
import Login from "@/components/Login.vue";
import RolldownBlinds from "@/components/RolldownBlinds.vue";

export default {
  name: "Header",
  components: { Login, RolldownBlinds }
};
</script>

<style scoped lang="scss">
header {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 366px) {
    min-height: 17rem;
  }

  @media screen and (max-width: $screen-xs) {
    height: 90vh;
    margin-bottom: 0;
  }

  .content {
    height: 8.3rem;

    .name {
      margin-top: 0;
      margin-bottom: 1.3rem;
      color: $color-primary;
      font-size: 2.8em;
      font-family: $font-primary;
      font-weight: 400;
    }
  }
}
</style>
