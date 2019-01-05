<template>
  <img
    src="https://i.imgur.com/g7unhmr.jpg"
    @click="openLink('https://i.imgur.com/g7unhmr.jpg');"
    alt
  >
</template>

<script>
import API from "@/api";

export default {
  name: "Avatar",

  data() {
    return {
      items: null
    };
  },

  mounted() {
    this.getInfoCardItems();
  },

  methods: {
    async getInfoCardItems() {
      this.items = await API.getJson("/api/InfoCardItems");
    },

    openLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
img {
  display: block;
  max-height: 100%;
  width: 100%;
  cursor: pointer;
  object-fit: cover;
  @include border-thick;
  border-radius: 50%;

  @media screen and (max-width: $screen-md) {
    max-width: 100%;
  }

  @media screen and (max-width: $screen-xs) {
    max-height: unset;
    border-radius: $border-radius-default;
  }
}
</style>
