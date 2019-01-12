<template>
  <el-dialog
    v-if="introduction"
    class="introduction-dialog"
    title="Introduction"
    width="50rem"
    :visible="introductionDialogIsVisible"
    :before-close="toggleIntroductionDialog"
  >
    <div class="input-group">
      <span class="property-name">Title</span>
      <el-input
        :value="introduction.title"
        @input.native="handleUpdateIntroduction('title', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name">Body</span>
      <el-input
        :value="introduction.body"
        type="textarea"
        :rows="15"
        @input.native="handleUpdateIntroduction('body', $event.target.value)"
        autofocus
      />
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="update"
        icon="el-icon-check"
        size="small"
        round
      >Update introduction</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "@/api";

export default {
  name: "IntroductionDialog",

  props: {
    introduction: Object
  },

  computed: {
    ...mapState(["introductionDialogIsVisible"])
  },

  methods: {
    ...mapMutations([
      "toggleIntroductionDialog",
      "updateIntroduction",
      "introduction"
    ]),

    handleUpdateIntroduction(field, value) {
      this.updateIntroduction({ field, value });
    },

    update() {
      const jsonBody = JSON.stringify(this.introduction);

      API.patch("/api/Introductions/1", jsonBody, () =>
        this.toggleIntroductionDialog({})
      );
    }
  }
};
</script>
