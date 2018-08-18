<template>
  <el-dialog
    class="row-dialog"
    :title="isNewRow ? 'Add row' : 'Edit row'"
    :visible="rowDialogIsVisible"
    width="50rem"
    :before-close="toggleRowDialog">

    <el-input placeholder="Left" :value="currentRow.left" @input.native="handleUpdateRow($event, 'left')"/>
    <el-input placeholder="Main" :value="currentRow.main" type="textarea"/>
    <el-input placeholder="Description" :value="currentRow.description" type="textarea"/>
    <el-input placeholder="Right" :value="currentRow.right" />
    <el-input placeholder="Right link URL" :value="currentRow.rightLinkURL" />
    <el-checkbox placeholder="Hidden" :value="currentRow.hidden">Hidden</el-checkbox>

    <span slot="footer" class="dialog-footer">
      <el-button @click="toggleRowDialog">Cancel</el-button>
      <el-button type="primary" @click="add" v-if="isNewRow">Add</el-button>
      <el-button type="primary" @click="save" v-else>Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'RowDialog',

  computed: {
    ...mapState(['token', 'rowDialogIsVisible', 'currentRow', 'isNewRow']),
  },

  methods: {
    ...mapMutations(['toggleRowDialog', 'updateRow']),

    handleUpdateRow(e, field) {
      this.updateRow({ value: e.target.value, field });
    },

    async save() {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      headers.Authorization = this.token;

      // Only add fields to payload if they have some data
      const body = {
        rowId: this.currentRow.id,
        main: this.main,
        ...(this.left ? { left: this.left } : {}),
        ...(this.description ? { description: this.description } : {}),
        ...(this.right ? { right: this.right } : {}),
        ...(this.rightLinkURL ? { rightLinkURL: this.rightLinkURL } : {}),
        ...(this.hidden ? { hidden: this.hidden } : {}),
      };
      const jsonBody = JSON.stringify(body);

      try {
        await fetch(`${process.env.VUE_APP_API_URL}/api/RowRows`, {
          headers,
          method: 'POST',
          body: jsonBody,
        });
      } catch (e) {
        console.log(e);
      }
    },

    add() {
      alert('Added!');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.row-dialog {
  .el-input, .el-textarea {
    margin-bottom: 1rem;
  }
}
</style>
