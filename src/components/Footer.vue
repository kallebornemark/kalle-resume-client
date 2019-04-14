<template>
  <div class="footer">
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy"
        >Dave Gandy</a
      >,
      <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a
      >,
      <a href="https://www.flaticon.com/authors/lucy-g" title="Lucy G"
        >Lucy G</a
      >
      and
      <a href="https://www.flaticon.com/authors/bogdan-rosu" title="Bogdan Rosu"
        >Bogdan Rosu</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      is licensed by
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        >CC 3.0 BY</a
      >
    </div>

    <div>© Kalle Bornemark</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped lang="scss">
.footer {
  text-align: center;
  margin: 5rem 0 2rem 0;
  font-size: 0.8em;
  opacity: 0.3;

  & > :first-child {
    margin-bottom: $spacing-xs;
  }
}
</style>
