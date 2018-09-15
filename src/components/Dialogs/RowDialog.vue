<template>
  <el-dialog
    class="row-dialog"
    :title="isNewRow ? `Add row to section: ${currentSection && currentSection.name}` : 'Edit row'"
    :visible="rowDialogIsVisible"
    width="50rem"
    :before-close="toggleRowDialog">

    <div class="input-group">
      <span class="property-name">Left</span>
      <el-input :value="currentRow.left" @input.native="handleUpdateRow('left', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Main</span>
      <el-input placeholder="Required" :value="currentRow.main" type="textarea" :rows="3" @input.native="handleUpdateRow('main', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Description</span>
      <el-input :value="currentRow.description" type="textarea" :rows="3" @input.native="handleUpdateRow('description', $event.target.value)"/>
    </div>

    <div class="input-group">
      <span class="property-name">Right</span>
      <el-input :value="currentRow.right" @input.native="handleUpdateRow('right', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Right link URL</span>
      <el-input :value="currentRow.rightLinkURL" @input.native="handleUpdateRow('rightLinkURL', $event.target.value)" />
    </div>

    <!-- Commented out ATM, risky too use -->
    <!-- <div class="input-group">
      <span class="property-name">ID</span>
      <el-input-number :value="currentRow.id" @change="handleUpdateRow('id', $event)" />
    </div>

    <div class="input-group">
      <span class="property-name">Section ID</span>
      <el-input-number v-model="currentRow.sectionId" @change="handleUpdateRow('sectionId', $event)" />
    </div> -->

    <div class="input-group">
      <span class="property-name"></span>
      <el-checkbox v-model="hidden">Hidden</el-checkbox>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button
        type="danger"
        @click="remove"
        v-if="!isNewRow"
        icon="el-icon-delete"
        round
      >
        Delete row
      </el-button>
      <el-button
        type="primary"
        @click="add"
        v-if="isNewRow"
        icon="el-icon-plus"
        :disabled="disableCreateAndUpdateButton"
        round
      >
        Add row
      </el-button>
      <el-button
        type="primary"
        @click="update"
        v-if="!isNewRow"
        icon="el-icon-check"
        :disabled="disableCreateAndUpdateButton"
        round
      >
        Update row
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import API from '@/api';

export default {
  name: 'RowDialog',

  props: ['reloadData'],

  computed: {
    ...mapState(['token', 'rowDialogIsVisible', 'currentRow', 'currentSection', 'isNewRow']),

    properties() {
      return Object.keys(this.currentRow).map(key => key);
    },

    hidden: {
      get() { return this.currentRow.hidden; },
      set() { this.updateRow({ field: 'hidden', value: !this.currentRow.hidden }); },
    },

    disableCreateAndUpdateButton() {
      return !this.currentRow.main;
    },
  },

  methods: {
    ...mapMutations(['toggleRowDialog', 'updateRow']),

    handleUpdateRow(field, value) {
      this.updateRow({ field, value });
    },

    update() {
      const jsonBody = JSON.stringify(this.currentRow);

      API.patch(
        '/api/SectionRows',
        jsonBody,
        () => this.toggleRowDialog({}),
      );
    },

    add() {
      const body = { ...this.currentRow, sectionId: this.currentSection.id };
      const jsonBody = JSON.stringify(body);

      API.post(
        '/api/SectionRows', // endpoint
        jsonBody, // body
        this.reset, // onSuccess
      );
    },

    remove() {
      if (confirm('Are you sure?')) {
        API.delete(
          `/api/SectionRows/${this.currentRow.id}`, // enpoint
          this.reset(), // onSuccess
        );
      }
    },

    reset() {
      this.toggleRowDialog({});
      this.$nextTick(() => {
        this.reloadData();
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/vars.scss';

.row-dialog {
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .property-name {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
      width: 6.5rem;
      margin-right: $spacing-sm;
      font-weight: bold;
    }
  }
}

.el-input-group__prepend {
  width: 5rem;
}
</style>
