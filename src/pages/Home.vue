<template>
  <q-page class="doks home">
    <div class="container q-pa-lg">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Users" />
        </q-breadcrumbs>
      </div>
      <div class="row header">
          <div class="text-subtitle1 column justify-center q-pl-sm">{{countTable(users,"user")}}</div>
          <div><q-btn @click="dialog.user.show = true" label="New User"/></div>
      </div>
      <div class="row tab-panels">
        <q-table
          class="table"
          :data="users"
          :columns="usersColumns"
          row-key="id"
          :pagination="pagination"
          dense
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-icon class="cursor-pointer edit-icon" @click="edit(props.value,'users')" name="fa fa-edit" color="primary" />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="q-my-xl"></div>
      <div class="row header">
          <div class="text-subtitle1 column justify-center q-pl-sm">{{countTable(groups,"group")}}</div>
          <div><q-btn @click="dialog.group.show = true" label="New Group"/></div>
      </div>
      <div class="row tab-panels">
          <q-table
            dense
            class="table"
            :data="groups"
            :columns="groupsColumns"
            row-key="id"
            :pagination="pagination"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  auto-width
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body-cell="props">
              <q-td :props="props" auto-width>
                {{props.value}}
                <!-- <q-badge color="blue" :label="props.value" /> -->
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props" auto-width>
                <q-icon class="cursor-pointer edit-icon" @click="edit(props.value,'groups')" name="fa fa-edit" color="primary" />
              </q-td>
            </template>

          </q-table>
      </div>
    </div>
    <q-dialog v-model="dialog.user.show"  persistent>
      <q-card style="min-width:600px">
        <q-form @submit="clickAddUser()">
          <q-bar>
            <div class="text-subtitle1" style="margin-top:3px">
              Create User
            </div>
            <q-space />
            <q-btn dense flat icon="close" @click="addUserCancel()" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <div class="row">
              <div class="col-sm-10 q-pl-sm">
                <div class="row">
                  <div class="col-sm-4 text-subtitle1 text-grey-8 column justify-center q-px-sm">
                    First Name <span style="color:red;display:contents">*</span>
                  </div>
                  <div class="col-sm-8">
                    <q-input v-model="dialog.user.first_name" dense class="q-my-md" outlined required /> 
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 text-subtitle1 text-grey-8 column justify-center q-px-sm">
                    Last Name <span style="color:red;display:contents">*</span>
                  </div>
                  <div class="col-sm-8">
                    <q-input v-model="dialog.user.last_name" dense class="q-my-md" outlined required /> 
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 text-subtitle1 text-grey-8 column justify-center q-px-sm">
                    Email <span style="color:red;display:contents">*</span>
                  </div>
                  <div class="col-sm-8">
                    <q-input type="email" v-model="dialog.user.email" dense class="q-my-md" outlined required /> 
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 text-subtitle1 text-grey-8 column justify-center q-px-sm">
                    Group
                  </div>
                  <div class="col-sm-8">
                    <q-select
                      outlined
                      dense
                      class="q-my-md"
                      v-model="dialog.user.group"
                      :options="groups"
                      option-label="name"
                      option-value="id"
                      @input="error.user.selectGroup = false"
                      :error="error.user.selectGroup"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="full-width row justify-end q-pb-sm q-pr-xs">
              <q-btn @click="addUserCancel()" label="cancel and close" class="q-px-sm q-mr-md" />
              <q-btn type="submit" :loading="loading" :disable="loading" label="create" color="primary" class="q-px-sm q-mr-xs" />
            </div>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog.group.show"  persistent>
      <q-card style="min-width:600px">
        <q-form @submit="clickAddGroup()">
          <q-bar>
            <div class="text-subtitle1" style="margin-top:3px">
              Create Group
            </div>
            <q-space />
            <q-btn dense flat icon="close" @click="addGroupCancel()" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <div class="row">
              <div class="col-sm-10 q-pl-sm">
                <div class="row">
                  <div class="col-sm-4 text-subtitle1 text-grey-8 column justify-center q-px-sm">
                    Name <span style="color:red;display:contents">*</span>
                  </div>
                  <div class="col-sm-8">
                    <q-input v-model="dialog.group.name" dense class="q-my-md" outlined required /> 
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="full-width row justify-end q-pb-sm q-pr-xs">
              <q-btn @click="addGroupCancel()" label="cancel and close" class="q-px-sm q-mr-md" />
              <q-btn type="submit" :loading="loading" :disable="loading" label="create" color="primary" class="q-px-sm q-mr-xs" />
            </div>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { debounce } from 'quasar'
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
    this.addUser = debounce(this.addUser,1000)
    this.addGroup = debounce(this.addGroup,1000)
  },
  methods:{
    countTable(table,label){
      return table.length + " " + label + (table.length > 1 ? "s" : "")
    },
    edit(value,table){
      console.log(value)
      console.log(table)
    },
    addUserCancel(){
      this.dialog.user = {
        show:false,
        first_name:"",
        last_name:"",
        email:"",
        group:{
          name:"Default",
          id:"-1"
        },
      }
    },
    addGroupCancel(){
      this.dialog.group = {
        show:false,
        name:""
      }
    },
    clickAddUser(){
      this.loading = true
      this.error.user.selectGroup = false
      if(this.dialog.user.group.id!="-1"){
        this.addUser()
      } else {
        this.$q.notify({
          position:"top-right",
          message: 'Please select a group.',
          color: 'red-5'
        })
        this.error.user.selectGroup = true
        this.loading = false
      }
    },
    clickAddGroup(){
      this.loading = true
      this.addGroup()
    },
    addUser(){
      setTimeout(function(){
        try{
          let result = this.$store.dispatch("users/add",this.dialog.user)
          this.addUserCancel()
          this.$q.notify({
            position:"top-right",
            message: 'Successfully added a user!',
            color: 'green-5'
          })
        } catch(error) {
          return
        } finally {
          this.loading = false
        }
      }.bind(this),1000)
    },
    addGroup(){
      setTimeout(function(){
        try{
          this.loading = true
          this.$store.dispatch("groups/add",this.dialog.group)
          this.addGroupCancel()
          this.$q.notify({
            position:"top-right",
            message: 'Successfully added a group!',
            color: 'green-5'
          })
        } catch(error) {
          return
        } finally {
          this.loading = false
        }
      }.bind(this),1000)
    }
  },
  data() {
    return {
      error:{
        user:{
          selectGroup:false
        }
      },
      loading:true,
      pagination:{
        rowsPerPage:10
      },
      dialog:{
        user:{
          show:false,
          first_name:"",
          last_name:"",
          email:"",
          group:{
            name:"Default",
            id:"-1"
          },
        },
        group:{
          show:false,
          name:""
        }
      },
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
    }
  }
}
</script>