<template>
  <div class="main">
    <div class="sidebar-container"><portfolio-sidebar /></div>

    <div class="introduction">
      <i v-if="!introduction" class="el-icon-loading" />
      <highlight-box v-else>
        <h2>{{ introduction.title }}</h2>
        <p>Kalle here. Welcome to my resume.</p>
        <p>{{ introduction.body }}</p>
      </highlight-box>
    </div>

    <div class="sections">
      <i v-if="!sections" class="el-icon-loading" />
      <portfolio-section
        v-for="section in sections"
        :key="section.id"
        v-bind="{ section }"
      />
    </div>

    <row-dialog :reload-data="reloadData" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Section from '@/components/Section/Section.vue'
import HighlightBox from '@/components/HighlightBox.vue'
import API from '@/api'
import RowDialog from './Dialogs/RowDialog.vue'

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
      introduction: null,
      sections: null,
    }
  },

  computed: {
    ...mapState(['rowDialogIsVisible']),
  },

  methods: {
    ...mapMutations(['toggleSectionDialog', 'toggleRowDialog']),

    async getIntroduction() {
      this.introduction = await API.getJson('/api/Introductions/1')
    },

    async getSections() {
      this.sections = await API.getJson(
        '/api/Sections?filter[include]=sectionRows'
      )
    },

    reloadData() {
      this.section = null
      this.getSections()
    },
  },

  mounted() {
    Promise.all([this.getIntroduction(), this.getSections()])
  },
}
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-areas:
    'sidebar introduction'
    '. sections';
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-columns: 15.5rem 1fr;

  @media screen and (max-width: $screen-md) {
    grid-template-columns: unset;
    grid-template-areas:
      'sidebar introduction'
      'sections sections';
  }

  @media screen and (max-width: $screen-sm) {
    grid-template-areas:
      'introduction'
      'sidebar'
      'sections';
  }

  .sidebar-container {
    position: relative;
    grid-area: sidebar;
    width: 15.5rem;

    @media screen and (max-width: $screen-md) {
      margin-bottom: 1rem;
    }

    @media screen and (max-width: $screen-sm) {
      width: 100%;
    }
  }

  .introduction {
    grid-area: introduction;

    h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.4em;
    }
  }

  .sections {
    grid-area: sections;

    > :not(:last-child) {
      margin-bottom: 2.2rem;

      @media screen and (max-width: $screen-sm) {
        margin-bottom: 2.9rem;
      }
    }
  }
}
</style>
