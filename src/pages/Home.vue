<template>
  <q-page class="doks home" v-if="!loading">
    <div class="container q-pa-lg">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Users" />
        </q-breadcrumbs>
      </div>
      <div class="row header">
          <div class="text-subtitle1 column justify-center q-pl-sm">{{countTable(users,"user")}}</div>
          <div><q-btn label="New User" color="primary"/></div>
      </div>
      <div class="row tab-panels">
          <q-table
            class="full-width table"
            :data="users"
            :columns="usersColumns"
            row-key="name"
          />
      </div>
      <div class="q-my-xl"></div>
      <div class="row header">
          <div class="text-subtitle1 column justify-center q-pl-sm">{{countTable(groups,"group")}}</div>
          <div><q-btn label="New Group" color="primary"/></div>
      </div>
      <div class="row tab-panels">
          <q-table
            class="full-width table"
            :data="groups"
            :columns="groupsColumns"
            row-key="name"
          />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  computed:{
    groupsStatus:{
      get(){
        return this.$store.getters['groups/status']
      }
    },
    usersStatus:{
      get(){
        return this.$store.getters['users/status']
      }
    },
    groups:{
      get(){
        return this.$store.getters['groups/data']
      }
    },
    users:{
      get(){
        return this.$store.getters['users/data']
      }
    }
  },
  mounted(){
    this.loading = false
  },
  methods:{
    countTable(table,label){
      return table.length + " " + label + (table.length > 1 ? "s" : "")
    }
  },
  data() {
    return {
      usersColumns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: 'email',
          align: 'left',
          label: 'Email',
          field: 'email',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          field: (row) => this.usersStatus[row.status],
          sortable: true,
          align: 'left',
        },
        {
          name: 'group',
          label: 'Group',
          field: (row) => this.groups[row.group].name,
          sortable: true,
          align: 'left',
        },
        {
          name: 'created-on',
          label: 'Created On',
          field: 'created_on',
          align: 'left',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Action',
          field: 'id',
          align: 'left',
        },
      ],
      groupsColumns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'no_of_users',
          required: true,
          label: 'No. of users',
          align: 'left',
          field: (row) => this.users.filter((u) => u.group == row.id).length,
          sortable: true,
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: (row) => this.groupsStatus[row.status],
          sortable: true,
        },
        {
          name: 'created_on',
          required: true,
          label: 'Created On',
          align: 'left',
          field: 'created_on',
          sortable: true,
        },
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'id',
        },
      ],
      loading:true
    }
  }
}
</script>