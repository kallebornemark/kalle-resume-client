<template>
  <div class="info-card">
    <img src="https://i.imgur.com/g7unhmr.jpg" alt="" class="image" @click="openLink('https://i.imgur.com/g7unhmr.jpg')">

    <div class="items">
      <i v-if="!items" class="el-icon-loading"></i>

      <div v-else v-for="item in items" :key="item.id" class="item">
        <i :class="['icon', item.icon]"></i>
        <a v-if="item.linkUrl" target="_blank" :href="item.linkUrl">{{ item.content }}</a>
        <span v-else>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',

  data() {
    return {
      items: null,
    };
  },

  mounted() {
    this.getInfoCardItems();
  },

  methods: {
    async getInfoCardItems() {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      const items = await fetch(`${process.env.VUE_APP_API_URL}/api/InfoCardItems`, { headers });
      const itemsJson = await items.json();
      this.items = itemsJson;
    },

    openLink(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.info-card {
  width: 100%;
  font-size: .9em;
  border-radius: $border-radius-default;
  border: 1px solid $color-border;
  background-color: white;

  .image {
    width: 100%;
    cursor: pointer;

    @media screen and (max-width: $screen-xs) {
      object-fit: cover;
      height: 14rem;
    }
  }
  .items {
    padding: 1rem;
    .item {
      margin-bottom: $spacing-xxs;

      .icon {
        margin-right: 1rem;
      }
    }
  }
}
</style>
