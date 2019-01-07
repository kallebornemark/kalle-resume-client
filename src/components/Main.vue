<template>
  <main>
    <top-section/>

    <div class="down-arrow">
      <down-arrow/>
    </div>

    <div class="sections">
      <i v-if="!sections" class="el-icon-loading"/>
      <div v-for="(section, i) in sections" :key="section.id">
        <portfolio-section v-bind="{ section }"/>
        <divider v-if="i !== sections.length - 1"/>
      </div>
    </div>

    <row-dialog :reload-data="reloadData"/>
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import API from "@/api";
import Section from "@/components/Section/Section.vue";
import TopSection from "@/components/TopSection/TopSection.vue";
import RowDialog from "@/components/Dialogs/RowDialog.vue";
import Divider from "@/components/Divider.vue";
import DownArrow from "@/components/Icons/DownArrow/DownArrow.vue";

export default {
  name: "MainContainer",
  components: {
    TopSection,
    RowDialog,
    Divider,
    DownArrow,
    "portfolio-section": Section
  },

  data() {
    return {
      sections: null
    };
  },

  computed: {
    ...mapState(["rowDialogIsVisible"])
  },

  methods: {
    ...mapMutations(["toggleSectionDialog", "toggleRowDialog"]),

    async getSections() {
      this.sections = await API.getJson(
        "/api/Sections?filter[include]=sectionRows"
      );
    },

    reloadData() {
      this.section = null;
      this.getSections();
    }
  },

  mounted() {
    this.getSections();
  }
};
</script>

<style scoped lang="scss">
main {
  .down-arrow {
    height: 1rem;
    display: flex;
    justify-content: center;
    margin: $spacing-xl 0;

    @media screen and (max-width: $screen-sm) {
      margin: $spacing-lg 0;
    }
  }

  hr {
    margin: $spacing-xxl auto;
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

  .sections {
    grid-area: sections;

    @media screen and (max-width: $screen-xs) {
      margin-top: $spacing-lg;
    }

    hr {
      margin: $spacing-xl auto;
    }
  }
}
</style>
