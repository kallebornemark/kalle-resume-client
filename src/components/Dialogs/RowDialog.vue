<template>
  <el-dialog
    class="row-dialog"
    :title="
      isNewRow
        ? `Add row to section: ${currentSection && currentSection.name}`
        : 'Edit row'
    "
    :visible="rowDialogIsVisible"
    width="50rem"
    :before-close="toggleRowDialog"
  >
    <div class="input-group">
      <span class="property-name">Category</span>
      <el-input
        v-model="editableRow.category"
        type="textarea"
        :rows="3"
        @change.native="handleUpdateRow('category', $event.target.value)"
        autofocus
      />
    </div>

    <div class="input-group">
      <span class="property-name">Category URL</span>
      <el-input
        v-model="editableRow.linkURL"
        @change.native="handleUpdateRow('linkURL', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name">Content</span>
      <el-input
        v-model="editableRow.content"
        type="textarea"
        :rows="3"
        @change.native="handleUpdateRow('content', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name">Description</span>
      <el-input
        v-model="editableRow.description"
        type="textarea"
        :rows="3"
        @change.native="handleUpdateRow('description', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name">Timespan</span>
      <el-input
        v-model="editableRow.timespan"
        @change.native="handleUpdateRow('timespan', $event.target.value)"
      />
    </div>

    <div class="input-group">
      <span class="property-name"></span>
      <el-checkbox v-model="editableRow.hidden">Hidden</el-checkbox>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="add"
        v-if="isNewRow"
        icon="el-icon-plus"
        size="small"
        round
        >Add row</el-button
      >

      <el-button
        type="primary"
        @click="update"
        v-if="!isNewRow"
        icon="el-icon-check"
        size="small"
        round
        >Update row</el-button
      >

      <el-button
        type="danger"
        @click="remove"
        v-if="!isNewRow"
        icon="el-icon-delete"
        size="small"
        round
        >Delete row</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "@/api";

export default {
  name: "RowDialog",

  props: ["reloadData"],

  data() {
    return {
      editableRow: null
    };
  },

  computed: {
    ...mapState([
      "token",
      "rowDialogIsVisible",
      "currentRow",
      "currentSection",
      "isNewRow"
    ])
  },

  watch: {
    currentRow() {
      this.copyRow();
    }
  },

  methods: {
    ...mapMutations(["toggleRowDialog"]),

    copyRow() {
      this.editableRow = { ...this.currentRow }; // copp values from current row in Vuex
    },

    handleUpdateRow(field, value) {
      this.editableRow[field] = value;
    },

    update() {
      const jsonBody = JSON.stringify(this.editableRow);

      API.put(`/api/SectionRows/${this.currentRow.id}`, jsonBody, this.reset);
    },

    add() {
      const body = { ...this.editableRow, section_id: this.currentSection.id };
      const jsonBody = JSON.stringify(body);

      API.post(
        "/api/SectionRows", // endpoint
        jsonBody, // body
        this.reset // onSuccess
      );
    },

    remove() {
      if (confirm("Are you sure?")) {
        API.delete(
          `/api/SectionRows/${this.editableRow.id}`, // enpoint
          this.reset // onSuccess
        );
      }
    },

    reset() {
      this.toggleRowDialog({});
      this.$nextTick(() => {
        this.reloadData();
      });
    }
  },

  created() {
    this.copyRow();
  }
};
</script>
