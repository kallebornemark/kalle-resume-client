<template>
  <el-dialog
    v-if="editableIntroduction"
    class="introduction-dialog"
    title="Introduction"
    width="50rem"
    :visible="introductionDialogIsVisible"
    :before-close="toggleIntroductionDialog"
  >
    <div class="input-group">
      <span class="property-name">Title</span>
      <el-input
        v-model="editableIntroduction.title"
        @change.native="handleUpdateIntroduction('title', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name">Body</span>
      <el-input
        v-model="editableIntroduction.body"
        type="textarea"
        :rows="15"
        @change.native="handleUpdateIntroduction('body', $event.target.value)"
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
        >Update introduction</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "@/api";

export default {
  name: "IntroductionDialog",

  props: ["reloadData"],

  data() {
    return {
      editableIntroduction: null
    };
  },

  watch: {
    introduction() {
      this.copyIntroduction();
    }
  },

  computed: {
    ...mapState(["introductionDialogIsVisible", "introduction"])
  },

  methods: {
    ...mapMutations(["toggleIntroductionDialog"]),

    copyIntroduction() {
      this.editableIntroduction = { ...this.introduction }; // copp values from current row in Vuex
    },

    handleUpdateIntroduction(field, value) {
      this.editableIntroduction[field] = value;
    },

    update() {
      const jsonBody = JSON.stringify(this.editableIntroduction);

      API.put("/api/introductions/1", jsonBody, this.reset);
    },

    reset() {
      this.toggleIntroductionDialog({});
      this.$nextTick(() => {
        this.reloadData();
      });
    }
  },

  created() {
    this.copyIntroduction();
  }
};
</script>
