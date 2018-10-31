<template>
  <div class="main">
    <div class="sidebar">
      <portfolio-sidebar />
    </div>

    <div class="highlight">
      <highlight-box>
        <h2>Howdy!</h2>
        <p>Kalle here. Welcome to my resume.</p>
        <p>
          I am a driven, meticulous and socially capable software developer constantly looking into new techniques and challenges.
          Although I usually label myself as a full-stack developer, I've lately spent most of my time building front-ends.
        </p>
      </highlight-box>
    </div>

    <div class="sections">
      <i v-if="!sections" class="el-icon-loading"></i>
      <portfolio-section v-for="section in sections" :key="section.id" v-bind="{ section }"/>
    </div>

    <row-dialog :reload-data="reloadData"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Section from '@/components/Section/Section.vue';
import HighlightBox from '@/components/HighlightBox.vue';
import RowDialog from './Dialogs/RowDialog.vue';

export default {
  name: 'MainContainer',
  components: {
    HighlightBox,
    RowDialog,
    'portfolio-sidebar': Sidebar,
    'portfolio-section': Section,
  },

  data() {
    return {
      sections: null,
    };
  },

  computed: {
    ...mapState(['rowDialogIsVisible']),
  },

  methods: {
    ...mapMutations(['toggleSectionDialog', 'toggleRowDialog']),

    async getSections() {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      const sections = await fetch(`${process.env.VUE_APP_API_URL}/api/Sections?filter[include]=sectionRows`, { headers });
      const sectionsJson = await sections.json();
      this.sections = sectionsJson;
    },

    reloadData() {
      this.section = null;
      this.getSections();
    },
  },

  mounted() {
    this.getSections();
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.main {
  position: relative;
  display: grid;
  grid-template-columns: 15.5rem auto;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  min-height: 70vh;

  @media screen and (max-width: $screen-xs) {
    display: flex;
    flex-direction: column;
  }

  .sidebar {
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

  .highlight {
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

  .sections {
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
</style>
