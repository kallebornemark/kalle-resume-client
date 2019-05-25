<template>
  <el-dialog
    class="section-dialog"
    title="Edit section"
    :visible="sectionDialogIsVisible"
    width="50rem"
    :before-close="toggleSectionDialog"
  >
    <div class="input-group">
      <span class="property-name">Name</span>
      <el-input
        v-model="editableSection.name"
        :rows="3"
        @change.native="handleUpdateSection('name', $event.target.value)"
        autofocus
      />
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="add"
        v-if="isNewSection"
        icon="el-icon-plus"
        size="small"
        round
        >Add section</el-button
      >

      <el-button
        type="primary"
        @click="update"
        v-if="!isNewSection"
        icon="el-icon-check"
        size="small"
        round
        >Update section</el-button
      >

      <el-button
        type="danger"
        @click="remove"
        v-if="!isNewSection"
        icon="el-icon-delete"
        size="small"
        round
        >Delete section</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import API from '@/api'

export default {
  name: 'SectionDialog',

  props: ['reloadData'],

  data() {
    return {
      editableSection: null,
    }
  },

  computed: {
    ...mapState([
      'token',
      'sectionDialogIsVisible',
      'currentSection',
      'isNewSection',
    ]),
  },

  watch: {
    currentSection() {
      this.copySection()
    },
  },

  methods: {
    ...mapMutations(['toggleSectionDialog']),

    copySection() {
      this.editableSection = { ...this.currentSection } // copy values from current section in Vuex
    },

    handleUpdateSection(field, value) {
      this.editableSection[field] = value
    },

    update() {
      const { id, name } = this.editableSection
      const payload = { id, name }
      const jsonBody = JSON.stringify(payload)

      API.put(`/api/sections/${this.currentSection.id}`, jsonBody, this.reset)
    },

    remove() {
      if (confirm('Are you sure?')) {
        API.delete(
          `/api/sections/${this.editableSection.id}`, // enpoint
          this.reset // onSuccess
        )
      }
    },

    reset() {
      this.toggleSectionDialog({})
      this.$nextTick(() => {
        this.reloadData()
      })
    },
  },

  created() {
    this.copySection()
  },
}
</script>
