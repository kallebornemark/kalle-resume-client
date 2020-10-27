<template>
  <section>
    <div class="heading">
      <h2>{{ section.name }}</h2>

      <el-button
        v-if="isLoggedIn"
        @click="toggleSectionDialog({ section })"
        icon="el-icon-edit"
        size="small"
        :style="{ marginLeft: '1rem' }"
        circle
      />
    </div>

    <!-- Desktop layout -->
    <mq-layout mq="md+">
      <el-table
        :data="sortedAndFilteredRows"
        :show-header="false"
        row-class-name="row"
        :row-style="getRowStyle"
        cell-class-name="cell"
      >
        <el-table-column
          v-if="hasColumn(['category'])"
          prop="category"
          :width="160"
        >
          <template slot-scope="scope">
            <conditional-link :hasLink="!!scope.row.linkURL">
              <a slot="link" :href="scope.row.linkURL" target="_blank"></a>
              <span slot="text">{{ scope.row.category }}</span>
            </conditional-link>
          </template>
        </el-table-column>

        <el-table-column
          v-if="hasColumn(['content', 'description'])"
          prop="content"
        >
          <template slot-scope="scope">
            <h3 class="content" v-html="scope.row.content" />
            <div
              v-if="scope.row.description"
              class="description"
              v-html="scope.row.description"
            ></div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="hasColumn(['timespan'])"
          align="right"
          width="150"
        >
          <template slot-scope="scope">
            <span class="timespan">{{ scope.row.timespan }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="isLoggedIn" align="right" width="80">
          <template slot-scope="scope">
            <el-button
              @click="
                toggleRowDialog({
                  index: scope.$index,
                  rows: sortedAndFilteredRows,
                })
              "
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
      <div
        v-for="(row, i) in sortedAndFilteredRows"
        :key="row.id"
        :style="getRowStyle({ row })"
        class="row-mobile"
      >
        <div class="category-mobile">
          <h4>
            <conditional-link :hasLink="!!row.linkURL">
              <a slot="link" :href="row.linkURL" target="_blank"></a>
              <span slot="text">{{ row.category }}</span>
            </conditional-link>
          </h4>
          <span class="timespan">{{ row.timespan }}</span>
        </div>

        <div class="content-mobile" v-if="row.content">
          <span v-html="row.content" />
        </div>
        <div class="description-mobile">
          <span v-html="row.description" />
        </div>

        <el-button
          v-if="isLoggedIn"
          @click="toggleRowDialog({ index: i, rows: sortedAndFilteredRows })"
          icon="el-icon-edit"
          size="small"
          circle
        />

        <hr v-if="i !== sortedAndFilteredRows.length - 1" />
      </div>
    </mq-layout>

    <el-button
      v-if="isLoggedIn"
      @click="toggleRowDialog({ section, isNewRow: true })"
      icon="el-icon-plus"
      :style="{ marginTop: '1rem' }"
      size="small"
      circle
    />
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ConditionalLink from '@/components/ConditionalLink.vue'

export default {
  name: 'Section',
  components: {
    ConditionalLink,
  },
  props: ['section'],

  computed: {
    ...mapState(['isLoggedIn']),

    sortedAndFilteredRows() {
      const sortedRows = this.section.rows
        .concat()
        .sort((a, b) => a.order_index - b.order_index)

      return this.isLoggedIn ? sortedRows : sortedRows.filter(sr => !sr.hidden)
    },
  },

  methods: {
    ...mapMutations(['toggleRowDialog', 'toggleSectionDialog']),

    hasColumn(columnNames) {
      return (
        this.section.rows &&
        this.section.rows.some(sr => columnNames.some(cn => sr[cn]))
      )
    },

    getRowStyle({ row }) {
      return { opacity: row.hidden ? '.3' : 'initial' }
    },
  },
}
</script>

<style lang="scss">
section {
  .heading {
    display: flex;
    flex-wrap: none;
    align-items: center;
    margin-bottom: 1.7rem;

    h2 {
      margin: 0;
      font-family: $font-secondary;
      font-weight: bold;
      line-height: 2.2;
      border-bottom: 4px solid $color-accent-faded;
      padding: 0 1.2rem 0 1.1rem;

      @media screen and (max-width: $screen-sm) {
        padding: 0 0.7rem 0 0.5rem;
      }
    }
  }

  .content {
    font-weight: 600;
    font-size: 16px;
    margin: 0 0 0.3rem 0;
  }

  .description {
    color: transparentize($color: $color-primary, $amount: 0.1);
  }
}

.cell {
  word-break: break-word !important;
  vertical-align: top !important;
}

.section-mobile {
  .row-mobile {
    font-size: 16px;

    h4 {
      margin-top: 0;
      margin-bottom: 0.6rem;
      color: $color-primary;
    }

    /* Edit row button */
    button {
      margin-top: $spacing-xs;
    }

    .category-mobile {
      display: flex;
      justify-content: space-between;
    }

    .content-mobile {
      margin-bottom: $spacing-xs;
      word-break: break-word;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }

    .description-mobile {
      color: transparentize($color: $color-primary, $amount: 0.1);
    }

    .content-mobile,
    .description-mobile {
      line-height: 1.4rem;
    }
  }

  hr {
    margin: 1.5rem 0;
    opacity: 0.15;
  }
}

.timespan {
  font-size: 14px;
}
</style>
