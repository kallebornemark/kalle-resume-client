<template>
  <div class="section">
    <div class="heading">
      <!-- <portfolio-rectangle /> -->
      <span class="name">{{ section.name }}</span>

      <!-- TODO: Change v-if to isLoggedIn -->
      <el-button
        v-if="isLoggedIn"
        @click="toggleRowDialog({ section, isNewRow: true })"
        :style="{ marginLeft: '1rem' }"
        icon="el-icon-plus"
        size="small"
        circle
      />
    </div>

    <!-- Desktop layout -->
    <mq-layout mq="md+">
      <el-table
        :data="filteredRows"
        :show-header="false"
        row-class-name="row"
        :row-style="getRowStyle"
        cell-class-name="cell"
      >
        <el-table-column v-if="hasColumn(['category'])" prop="category" :width="160">
          <template slot-scope="scope">
            <conditional-link :hasLink="!!scope.row.linkURL">
              <a slot="link" :href="scope.row.linkURL" target="_blank"></a>
              <span slot="text">{{ scope.row.category }}</span>
            </conditional-link>
          </template>
        </el-table-column>

        <el-table-column v-if="hasColumn(['content', 'description'])" prop="content">
          <template slot-scope="scope">
            <span v-html="scope.row.content" />
            <div v-if="scope.row.description" class="description" v-html="scope.row.description">
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="hasColumn(['timespan'])" align="right" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.timespan }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="isLoggedIn" align="right" width="80">
          <template slot-scope="scope">
            <el-button
              @click="toggleRowDialog({ index: scope.$index, rows: filteredRows })"
              icon="el-icon-edit"
              size="small"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
    </mq-layout>

    <!-- Mobile layout -->
    <mq-layout :mq="['xs', 'sm']" class="section-mobile">
      <div v-for="(row, i) in filteredRows" :key="row.id" class="row-mobile">
        <div class="category-mobile">
          <h4>
            <conditional-link :hasLink="!!row.linkURL">
              <a slot="link" :href="row.linkURL" target="_blank"></a>
              <span slot="text">{{ row.category }}</span>
            </conditional-link>
          </h4>
          <span>{{ row.timespan }}</span>
        </div>

        <div class="content-mobile" v-if="row.content">
          <span v-html="row.content" />
        </div>
        <div class="description-mobile">
          <span v-html="row.description" />
        </div>

        <hr v-if="i !== filteredRows.length - 1">
      </div>
    </mq-layout>
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
      return this.isLoggedIn
        ? this.section.sectionRows
        : this.section.sectionRows.filter(sr => !sr.hidden);
    },
  },

  methods: {
    ...mapMutations(['toggleRowDialog']),

    hasColumn(columnNames) {
      return this.section.sectionRows.some(sr => columnNames.some(cn => sr[cn]));
    },

    getRowStyle({ row }) {
      return { opacity: row.hidden ? '.3' : 'initial' };
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

    @media screen and (max-width: $screen-sm) {
      margin-bottom: 1.6rem;
    }

    .name {
      font-size: 1.5em;
      font-family: $font-secondary;
      font-weight: bold;

      @media screen and (max-width: $screen-sm) {
        font-size: 1.7em;
      }
    }
  }

  .description {
    color: transparentize($color: $color-primary, $amount: .4);
  }
}

.row { background-color: $color-background !important; }
.cell { word-break: break-word !important; vertical-align: top !important; }

.section-mobile {
  .row-mobile {
    h4 {
      font-size: 15px;
      margin-top: 0;
      margin-bottom: .5rem;
      color: $color-primary;
    }

    .category-mobile {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .content-mobile {
      margin-bottom: $spacing-xs;
      font-size: 14px;
      word-break: break-word;
    }

    .description-mobile {
      color: transparentize($color: $color-primary, $amount: .35);
      font-size: 14px;
    }

    .content-mobile, .description-mobile {
      line-height: 1.4rem;
    }
  }

  hr {
    margin: 1.5rem 0;
    opacity: .15;
  }
}
</style>
