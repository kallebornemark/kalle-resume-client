<template>
  <div id="app">
    <portfolio-header />

    <div class="main">
      <portfolio-sidebar />

      <div class="content">
        <highlight-box>
          <h1>Howdy!</h1>
          <p>Kalle here. Welcome to my resume.</p>
          <p>
            I am a driven, meticulous and socially capable software developer constantly looking into new techniques and challenges.
            Although I usually label myself as a full-stack developer, I've lately spent most of my time building front-ends,
            and most of these have been made with either React or Vue.js.
          </p>
        </highlight-box>

        <i v-if="!sections" class="el-icon-loading"></i>
        <portfolio-section v-for="section in sections" :key="section.id" v-bind="{ section }"/>
      </div>
    </div>

    <portfolio-footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Section from '@/components/Section/Section.vue';
import HighlightBox from '@/components/HighlightBox.vue';
import '@/styles/styles.scss';

export default {
  components: {
    HighlightBox,
    'portfolio-header': Header,
    'portfolio-footer': Footer,
    'portfolio-sidebar': Sidebar,
    'portfolio-section': Section,
  },

  data() {
    return {
      sections: null,
    };
  },

  methods: {
    async getSections() {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const sections = await fetch(`${process.env.VUE_APP_API_URL}/api/Sections?filter[include]=sectionRows`, { headers });
      const sectionsJson = await sections.json();
      this.sections = sectionsJson;
    },
  },

  mounted() {
    this.getSections();
  },
};
</script>


<style lang="scss">
@import '~@/styles/vars.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 1rem;
  max-width: 70rem;
  margin: 0 auto;

  .main {
    display: flex;
    @media screen and (max-width: $screen-md) {
      flex-direction: column;
    }

    .content {
      flex: 1;
      // padding: 0 1rem;
      @media screen and (max-width: $screen-md) {
        padding: 0;
        margin-top: 1rem;
      }

      > :not(:last-child) {
        margin-bottom: 2.2rem;
      }
    }
  }
}
</style>
