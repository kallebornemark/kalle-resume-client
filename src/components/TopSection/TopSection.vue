<template>
  <section class="top-section">
    <div class="avatar">
      <avatar />
    </div>

    <introduction />

    <div class="social-buttons">
      <social-buttons />
    </div>
  </section>
</template>

<script>
import Avatar from '@/components/TopSection/Avatar.vue';
import Introduction from '@/components/TopSection/Introduction.vue';
import SocialButtons from '@/components/TopSection/SocialButtons/SocialButtons.vue';

export default {
  name: 'TopSection',
  components: {
    Avatar,
    SocialButtons,
    Introduction,
  },
};
</script>

<style lang="scss">
.top-section {
  display: grid;
  grid-template-columns: 11rem 1fr;
  grid-column-gap: $spacing-lg;
  grid-row-gap: $spacing-lg;
  grid-template-areas:
    'avatar text'
    'avatar socialButtons';

  @media screen and (max-width: $screen-sm) {
    grid-template-columns: 8rem 1fr;
    grid-column-gap: $spacing-md;
    grid-template-areas:
      'avatar text'
      'socialButtons socialButtons';
  }

  @media screen and (max-width: $screen-xs) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'text'
      'avatar'
      'socialButtons';
  }

  .avatar {
    display: flex;
    align-items: center;
    grid-area: avatar;

    @media screen and (max-width: $screen-xs) {
      /* display: none; */
    }
  }

  .introduction {
    grid-area: text;
    p:last-child {
      margin-bottom: 0;
    }
  }

  .social-buttons {
    grid-area: socialButtons;

    @media screen and (max-width: $screen-sm) {
      text-align: center;
    }
  }

  h2 {
    margin: 0 0 1.5rem 0;
  }

  p {
    font-size: 16px;
  }
}
</style>
