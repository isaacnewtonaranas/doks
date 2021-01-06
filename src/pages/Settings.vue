<template>
  <q-page class="doks settings">
    <div class="container q-px-lg q-py-md">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Settings" />
        </q-breadcrumbs>
      </div>
      <div class="row q-mt-xl">
        <div class="row  q-mt-lg tab-panels" style="position:relative">
          <q-separator />
          <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
            <q-tab-panel name="whitelist">
              <div class="tab-panel-container">
                <q-form @submit="submitAddIP()">
                  <p class="text-subtitle1">Add single IP address or a CIDR-notated range of addresses</p>
                  <div class="row q-pb-md">
                    <div style="width:350px;">
                      <q-input v-model="ip.address" required dense outlined label="enter IP address or a CIDP notation" />
                    </div>
                  </div>
                  <div class="row q-pb-md justify-start">
                    <div class="q-mr-md" style="width:350px;">
                      <q-input v-model="ip.comment" dense outlined label="Optional comment describing this entry" />
                    </div>
                    <q-btn :loading="loading" :disable="loading" type="submit" label="add" color="primary"/>
                  </div>
                  <q-table
                    dense
                    class="q-mt-lg"
                    :data="ips"
                    :columns="ipsColumns"
                    row-key="id"
                    :pagination="pagination"
                    :loading="loading"
                  >
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-icon
                          :loading="loading"
                          :disable="loading"
                          class="cursor-pointer edit-icon"
                          @click="deleteIP(props.value)"
                          name="fa fa-trash-alt"
                          color="primary"
                        />
                      </q-td>
                    </template>
                  </q-table>
                </q-form>
              </div>
            </q-tab-panel>

            <q-tab-panel name="themes">
              <div class="tab-panel-container">

              </div>
            </q-tab-panel>

            <q-tab-panel name="customize">
              <div class="tab-panel-container">

              </div>
            </q-tab-panel>

            <q-tab-panel name="export">
              <div class="tab-panel-container">

              </div>
            </q-tab-panel>
            
          </q-tab-panels>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="grey-7"
            indicator-color="white"
            align="justify"
          >
            <q-tab name="whitelist" label="Whitelist" />
            <q-tab name="themes" label="Themes" />
            <q-tab name="customize" label="Customize" />
            <q-tab name="export" label="Export" />
          </q-tabs>

        </div>
      </div>
      <div class="q-my-xl"></div>
      <div class="row header">
      </div>
      <div class="row tab-panels">
      </div>
    </div>
    <q-dialog v-model="dialog.user.show"  persistent>
      <q-card style="min-width:600px">
        <q-form @submit="submitAddUser()">
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
        <q-form @submit="submitAddGroup()">
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
import {debounce} from 'quasar'
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
    ips:{
      get(){
        return this.$store.getters['ips/data']
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
    this.addIP = debounce(this.addIP,1000)
    this.deleteIP = debounce(this.deleteIP,1000)
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
    addIPCancel(){
      this.ip = {
        address:'',
        comment:''
      }
    },
    submitAddUser(){
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
    submitAddGroup(){
      this.loading = true
      this.addGroup()
    },
    submitAddIP(){
      this.loading = true
      this.addIP()
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
    },
    addIP(){
      this.loading = true
      setTimeout(function(){
        try{
          this.$store.dispatch("ips/add",this.ip)
          this.$q.notify({
            position:"top-right",
            message: this.ip.address+" was successfully added!",
            color: 'green-5'
          })
          this.addIPCancel()
        } catch(error) {
          return
        } finally {
          this.loading = false
        }
      }.bind(this),1000)
    },
    deleteIP(id){
      setTimeout(function(){
        try{
          this.loading = true
          this.$store.dispatch("ips/delete",id)
          this.$q.notify({
            position:"top-right",
            message: 'An IP was removed!',
            color: 'green-5'
          })
          this.addIPCancel()
        } catch(error) {
          return
        } finally {
          this.loading = false
        }
      }.bind(this),1000)
    },
  },
  data() {
    return {
      ip:{
        address:'',
        comment:''
      },
      tab: 'whitelist',
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
      ipsColumns: [
        {
          name: 'ip_address',
          required: true,
          label: 'IP Address',
          align: 'left',
          field: (row) => row.address,
          sortable: true,
        },
        {
          name: 'comment',
          required: true,
          label: 'Comment',
          align: 'left',
          field: (row) => row.comment,
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