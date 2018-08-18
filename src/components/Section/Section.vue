<template>
  <div class="section">
    <div class="heading">
      <!-- <portfolio-rectangle /> -->
      <span class="name">{{ section.name }}</span>

      <!-- TODO: Change v-if to isLoggedIn -->
      <el-button
        v-if="isLoggedIn"
        @click="toggleRowDialog({ isNewRow: true })"
        :style="{ marginLeft: '1rem' }"
        icon="el-icon-plus"
        circle
      />
    </div>

    <div class="table">
      <el-table
        :data="filteredRows"
        :show-header="false"
        row-class-name="row"
        cell-class-name="cell"
      >
        <el-table-column v-if="hasColumn('left')" prop="left" width="130" />

        <el-table-column v-if="hasColumn('main')" prop="main">
          <template slot-scope="scope">
            <span v-html="scope.row.main" />
            <div v-if="scope.row.description" class="description">
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="hasColumn('right')" align="right" width="150">
          <template slot-scope="scope">
            <conditional-link :hasLink="!!scope.row.rightLinkURL">
              <a slot="link" :href="scope.row.rightLinkURL" target="_blank"></a>
              <span slot="text">{{ scope.row.right }}</span>
            </conditional-link>
          </template>
        </el-table-column>

        <el-table-column v-if="isLoggedIn" align="right" width="80">
          <template slot-scope="scope">
            <el-button
              @click="toggleRowDialog({ index: scope.$index, rows: filteredRows })"
              icon="el-icon-edit"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ConditionalLink from '@/components/ConditionalLink.vue';
import Rectangle from './Rectangle.vue';

export default {
  name: 'Section',
  components: {
    ConditionalLink,
    'portfolio-rectangle': Rectangle,
  },
  props: ['section'],

  computed: {
    ...mapState(['isLoggedIn']),

    filteredRows() {
      return this.section.sectionRows
        // .map(sr => {

        // })
        .filter(sr => !sr.hidden);
    },
  },

  methods: {
    ...mapMutations(['toggleRowDialog']),

    hasColumn(columnName) {
      return this.section.sectionRows.some(sr => sr[columnName]);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/vars.scss';

.section {
  .heading {
    display: flex;
    flex-wrap: none;
    align-items: center;
    margin-bottom: .7rem;

    .name {
      font-size: 1.5em;
      font-family: $font-secondary;
      font-weight: bold;
    }
  }

  .description {
    color: transparentize($color: $color-primary, $amount: .4);
  }
}
.row { background-color: $color-background !important; }
.cell { word-break: break-word !important; vertical-align: top !important; }
</style>
