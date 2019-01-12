<template>
  <div class="sections">
    <i v-if="!sections" class="el-icon-loading"/>
    <div v-for="(section, i) in sections" :key="section.id">
      <portfolio-section v-bind="{ section }"/>
      <divider v-if="i !== sections.length - 1"/>
    </div>

    <row-dialog :reload-data="reloadData"/>
  </div>
</template>

<script>
import API from "@/api";
import { mapMutations } from "vuex";
import Section from "@/components/Section/Section.vue";
import Divider from "@/components/Divider.vue";
import RowDialog from "@/components/Dialogs/RowDialog.vue";

export default {
  components: {
    Divider,
    RowDialog,
    "portfolio-section": Section
  },

  data() {
    return {
      sections: null
    };
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

<style lang="scss" scoped>
.sections {
  grid-area: sections;

  @media screen and (max-width: $screen-xs) {
    margin-top: $spacing-lg;
  }

  hr {
    margin: $spacing-xl auto;
  }
}
</style>