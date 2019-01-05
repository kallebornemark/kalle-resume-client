<template>
  <section class="top-section">
    <div class="avatar">
      <avatar/>
    </div>

    <div class="text">
      <h2>Hello 👋</h2>
      <p>Kalle here. Welcome to my resume!</p>
      <p>I am a driven, meticulous and socially capable developer currently based in Malmö, Sweden. I am constantly looking for new techniques and challenges, and although I usually label myself as a full-stack developer, I've lately spent most of my time building front-ends. My primary strengths are React, Vue and CSS.</p>

      <p>Don't hesitate to reach out through any of the links below!</p>
    </div>

    <div class="social-buttons">
      <social-buttons/>
    </div>
  </section>
</template>

<script>
import Avatar from "@/components/TopSection/Avatar.vue";
import SocialButtons from "@/components/TopSection/SocialButtons/SocialButtons.vue";
import API from "@/api";

export default {
  name: "TopSection",
  components: {
    Avatar,
    SocialButtons
  },

  data() {
    return {
      introduction: null
    };
  },

  methods: {
    async getIntroduction() {
      this.introduction = await API.getJson("/api/Introductions/1");
    }
  },

  mounted() {
    this.getIntroduction();
  }
};
</script>

<style lang="scss">
.top-section {
  display: grid;
  grid-template-columns: 11rem 1fr;
  grid-column-gap: $spacing-lg;
  grid-row-gap: $spacing-lg;
  grid-template-areas:
    "avatar text"
    "avatar socialButtons";

  .avatar {
    display: flex;
    align-items: center;
    grid-area: avatar;
  }

  .text {
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

  @media screen and (max-width: $screen-sm) {
    grid-template-columns: 8rem 1fr;
    grid-column-gap: $spacing-md;
    grid-template-areas:
      "avatar text"
      "socialButtons socialButtons";
  }

  @media screen and (max-width: $screen-xs) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "avatar"
      "text"
      "socialButtons";
  }

  h2 {
    margin: 0 0 1.5rem 0;
  }

  p {
    font-size: 14px;
  }
}
</style>
