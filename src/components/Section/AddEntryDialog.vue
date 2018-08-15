<template>
  <el-dialog
    class="add-section-dialog"
    :title="`Add row to ⭐ ${currentSection && currentSection.name}`"
    :visible="addEntryDialogIsVisible"
    width="50rem"
    :before-close="closeAddSectionDialog">

    <el-input placeholder="Left" v-model="left" />
    <el-input placeholder="Main" v-model="main" type="textarea"/>
    <el-input placeholder="Description" v-model="description" type="textarea"/>
    <el-input placeholder="Right" v-model="right" />
    <el-input placeholder="Right link URL" v-model="rightLinkURL" />
    <el-checkbox placeholder="Hidden" v-model="hidden">Hidden</el-checkbox>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeAddSectionDialog">Cancel</el-button>
      <el-button type="primary" @click="save">Add</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AddEntryDialog',

  data() {
    return {
      left: null,
      main: null,
      description: null,
      right: null,
      rightLinkURL: null,
      hidden: false,
    };
  },

  computed: {
    ...mapState(['token', 'addEntryDialogIsVisible', 'currentSection']),
  },

  methods: {
    ...mapMutations(['closeAddSectionDialog']),

    async save() {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      headers.Authorization = this.token;
      const body = {
        sectionId: this.currentSection.id,
        main: this.main,
        ...(this.left ? { left: this.left } : {}),
        ...(this.description ? { description: this.description } : {}),
        ...(this.right ? { right: this.right } : {}),
        ...(this.rightLinkURL ? { rightLinkURL: this.rightLinkURL } : {}),
        ...(this.hidden ? { hidden: this.hidden } : {}),
      };
      debugger;
      const jsonBody = JSON.stringify(body);

      try {
        await fetch(`${process.env.VUE_APP_API_URL}/api/SectionRows`, {
          headers,
          method: 'POST',
          body: jsonBody,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.add-section-dialog {
  .el-input, .el-textarea {
    margin-bottom: 1rem;
  }
}
</style>
