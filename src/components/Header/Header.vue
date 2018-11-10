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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/styles/vars.scss';

.header {
  height: 12rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 6rem;

  .name {
    margin-top: 5rem;
    color: $color-athens-gray;
    font-size: 2.2em;
  }
}

</style>
