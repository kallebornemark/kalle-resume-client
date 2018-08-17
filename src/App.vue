<template>
  <div id="app">
    <portfolio-header />

    <div class="main">
      <div class="sidebar-container">
        <portfolio-sidebar />
      </div>

      <div class="highlight-container">
        <highlight-box>
          <h2>Howdy!</h2>
          <p>Kalle here. Welcome to my resume.</p>
          <p>
            I am a driven, meticulous and socially capable software developer constantly looking into new techniques and challenges.
            Although I usually label myself as a full-stack developer, I've lately spent most of my time building front-ends.
          </p>
        </highlight-box>
      </div>

      <div class="sections-container">
        <i v-if="!sections" class="el-icon-loading"></i>
        <portfolio-section v-for="section in sections" :key="section.id" v-bind="{ section }"/>
      </div>
    </div>

    <portfolio-footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
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
    position: relative;
    display: grid;
    grid-template-columns: 15.5rem auto;
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;

    @media screen and (max-width: $screen-xs) {
      display: flex;
      flex-direction: column;
    }

    .sidebar-container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 15.5rem;

      @media screen and (max-width: $screen-sm) {
        position: initial;
      }

      @media screen and (max-width: $screen-sm) {
        width: 100%;
        margin-bottom: 1rem;
      }
    }

    .highlight-container {
      grid-column: 2 / 3;
      grid-row: 1 / 2;

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.4em;
      }

      @media screen and (max-width: $screen-sm) {
        margin-bottom: 1rem;
      }
    }

    .sections-container {
      grid-column: 2 / 3;
      grid-row: 2 / 3;

      @media screen and (max-width: $screen-sm) {
        grid-column: 1 / 3;
      }

      @media screen and (max-width: $screen-xs) {
        margin-top: 1rem;
      }

      > :not(:last-child) {
        margin-bottom: 2.2rem;
      }
    }
  }
}
</style>
