<template>
  <img src="https://i.imgur.com/pd04s14.jpg" alt />
</template>

<script>
export default {
  name: 'Avatar',
};
</script>

<style scoped lang="scss">
a {
  &:hover:before {
    visibility: hidden;
  }
}
img {
  display: block;
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 2px 4px 9px 1px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: $screen-md) {
    max-width: 100%;
  }

  @media screen and (max-width: $screen-xs) {
    max-height: unset;
    max-width: 70%;
    margin: 0 auto;
  }
}
</style>
