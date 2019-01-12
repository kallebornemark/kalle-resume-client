<template>
  <div class="introduction">
    <i v-if="!introduction" class="el-icon-loading"/>

    <div v-else>
      <h2>{{introduction.title}}</h2>
      <div v-html="introduction.body"/>

      <el-button
        v-if="isLoggedIn"
        @click="toggleIntroductionDialog({ introduction })"
        icon="el-icon-edit"
        size="small"
        circle
      />
    </div>

    <introduction-dialog :introduction="introduction" :reload-data="reloadData"/>
  </div>
</template>

<script>
import API from "@/api";
import { mapState, mapMutations } from "vuex";
import IntroductionDialog from "@/components/Dialogs/IntroductionDialog.vue";

export default {
  components: {
    IntroductionDialog
  },

  data() {
    return {
      introduction: null
    };
  },

  methods: {
    ...mapMutations(["toggleIntroductionDialog"]),

    async getIntroduction() {
      this.introduction = await API.getJson("/api/Introductions/1");
    },

    reloadData() {
      this.introduction = null;
      this.getIntroduction();
    }
  },

  computed: {
    ...mapState(["isLoggedIn"])
  },

  mounted() {
    this.getIntroduction();
  }
};
</script>

<style lang="scss" scoped>
.introduction {
  position: relative;
  min-height: 14.5rem; // So that intro text doesn't jump once fetched. TODO: Make this dynamic somehow?

  button {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
