<template>
  <q-page class="doks home">
    <div class="container q-px-lg q-py-md">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Analytics" />
        </q-breadcrumbs>
      </div>
      <div class="row q-mt-lg">
          <span class="text-body1 q-mt-lg">Date Range</span>
          <span class="q-pa-md">
            <DateRangeInline width="500px" outlined dense />
          </span>
      </div>
      <div class="row">
        <div class="q-pa-lg" v-for="(boxedInfo,i) in boxedInfos" :key="i">
          <div class="q-pa-lg bg-grey-2" style="min-width:220px">
            <div class="text-body1 text-grey-7">{{boxedInfo.label}}</div>
            <div class="text-body1 text-grey-10">{{boxedInfo.value}}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <q-table
          class="table"
          title="Searches"
          :data="searches"
          :columns="searchesColumns"
          row-key="id"
          :pagination="pagination"
          :rows-per-page-options="itemsPerPage"
          dense
        >
          <template v-slot:top-right>
            <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
        <q-table
          class="table"
          title="Search with no results"
          :data="searches"
          :columns="searchesColumns"
          row-key="id"
          :pagination="pagination"
          :rows-per-page-options="itemsPerPage"
          dense
        >
          <template v-slot:top-right>
            <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
      <div class="row">
        <q-table
          class="table"
          title="Most Active Users"
          :data="mostActiveUsers"
          :columns="searchesColumns"
          row-key="id"
          :pagination="pagination"
          :rows-per-page-options="itemsPerPage"
          dense
        >
          <template v-slot:top-right>
            <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
import { debounce } from 'quasar'
export default {
  components: {
    DateRangeInline: () => import('../components/DateRangeInline.vue')
  },
  mounted(){
    this.loading = false
  },
  data() {
    return {
      filter: '',
      itemsPerPage:[20,50,100],
      searchesColumns:[
        {
          name: 'query',
          required: true,
          label: 'Query',
          align: 'left',
          field: 'query',
          sortable: true,
        },
        {
          name: 'count',
          required: true,
          label: 'Count',
          align: 'left',
          field: 'count',
          sortable: true,
        },
        {
          name: 'total_search_percent',
          required: true,
          label: '% Total Search',
          align: 'left',
          field: 'total_search_percent',
          sortable: true,
        },
      ],
      mostActiveUsers:[
        {
          query:"Maddy Kumar",
          count:"40",
          total_search_percent:"50%",
        },
        {
          query:"Girish Rathor",
          count:"30",
          total_search_percent:"30%",
        },
        {
          query:"Shasha Mahta",
          count:"20",
          total_search_percent:"10%",
        },
      ],
      searches:[
        {
          query:"credit card",
          count:"40",
          total_search_percent:"50%",
        },
        {
          query:"debit card",
          count:"30",
          total_search_percent:"30%",
        },
        {
          query:"increase value",
          count:"20",
          total_search_percent:"10%",
        },
        {
          query:"how to cancel",
          count:"10",
          total_search_percent:"8%",
        },
        {
          query:"refer a friend",
          count:"8",
          total_search_percent:"6%",
        },
        {
          query:"website issue",
          count:"6",
          total_search_percent:"5%",
        },
        {
          query:"sales",
          count:"5",
          total_search_percent:"4%",
        },
      ],
      boxedInfos:[
        {
          label:"Total Users",
          value:"20"
        },
        {
          label:"Total Searches",
          value:"300"
        },
        {
          label:"No Results Rate",
          value:"8%"
        }
      ],
      loading:false,
      pagination:{
        rowsPerPage:20
      },
    }
  }
}
</script>
<style lang="stylus" scoped>
.table
  min-width 530px
  margin-right 30px
  margin-bottom 30px
</style>