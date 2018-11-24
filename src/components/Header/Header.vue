<template>
  <div class="header">
    <h1 class="name">Kalle Bornemark</h1>

    <rolldown-blinds text="web developer"/>

    <login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import HeaderLine from '@/components/Header/HeaderLine.vue';
import RolldownBlinds from '@/components/RolldownBlinds.vue';

export default {
  name: 'Header',
  components: { Login, HeaderLine, RolldownBlinds },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.header {
  min-height: 13rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 6rem;

  @media screen and (max-width: 366px) {
    min-height: 17rem;
  }

  @media screen and (max-width: $screen-xs) {
    height: 70vh;
    margin-bottom: 0;
  }

  .name {
    margin-top: 5rem;
    margin-bottoM: 1.3rem;
    color: $color-primary;
    font-size: 2.8em;
    font-family: $font-primary;
    font-weight: 400;

    @media screen and (max-width: $screen-xs) {
      margin-top: 25vh;
    }
  }
}

</style>
