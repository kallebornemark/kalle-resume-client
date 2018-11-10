<template>
  <el-dialog
    class="row-dialog"
    :title="isNewRow ? `Add row to section: ${currentSection && currentSection.name}` : 'Edit row'"
    :visible="rowDialogIsVisible"
    width="50rem"
    :before-close="toggleRowDialog">

    <div class="input-group">
      <span class="property-name">Category</span>
      <el-input :value="currentRow.category" type="textarea" :rows="3" @input.native="handleUpdateRow('category', $event.target.value)" autofocus/>
    </div>

    <div class="input-group">
      <span class="property-name">Category URL</span>
      <el-input :value="currentRow.linkURL" @input.native="handleUpdateRow('linkURL', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Content</span>
      <el-input :value="currentRow.content" @input.native="handleUpdateRow('content', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Description</span>
      <el-input :value="currentRow.description" type="textarea" :rows="3" @input.native="handleUpdateRow('description', $event.target.value)" />
    </div>

    <div class="input-group">
      <span class="property-name">Timespan</span>
      <el-input :value="currentRow.timespan" @input.native="handleUpdateRow('timespan', $event.target.value)" />
    </div>

    <!-- <div class="input-group">
      <span class="property-name">Link text</span>
      <el-input :value="currentRow.linkText" @input.native="handleUpdateRow('linkText', $event.target.value)" />
    </div> -->

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
        round
      >
        Add row
      </el-button>

      <el-button
        type="primary"
        @click="update"
        v-if="!isNewRow"
        icon="el-icon-check"
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

<style lang="scss">
@import '~@/styles/vars.scss';

.row-dialog {
  .input-group {
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-bottom: 1rem;

    @media screen and (max-width: $screen-xs) {
      grid-template-columns: 1fr;
    }

    .property-name {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
      width: 6.5rem;
      margin-right: $spacing-sm;
      font-weight: bold;

      @media screen and (max-width: $screen-xs) {
        justify-content: flex-start;
        width: 100%;
        margin-bottom: $spacing-xs;
      }
    }
  }
}

.el-dialog {
  max-width: calc(100vw - 1rem);

  @media screen and (max-width: $screen-xs) {
    margin: .5rem auto !important;
  }
}

.el-input-group__prepend {
  width: 5rem;
}
</style>
