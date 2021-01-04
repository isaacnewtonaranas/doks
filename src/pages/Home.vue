<template>
  <q-page class="doks home" v-if="!loading">
    <div class="container q-pa-lg">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Users" />
        </q-breadcrumbs>
      </div>
      <div class="row justify-end right-drawer">
        <q-btn v-if="showRightDrawerButton" dense flat round icon="menu" @click="right = !right" />
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
    status:{
      get(){
        return this.$store.getters['users/status']
      }
    },
    groups:{
      get(){
        return this.$store.getters['users/groups']
      }
    },
    users:{
      get(){
        return this.$store.getters['users/users']
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
          field: (row) => this.status[row.status],
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
          field: (row) => this.status[row.status],
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
      loading:false,
      showRightDrawerButton:false,
      tab: 'edit-article',
      right: false,
      similarArticlesSelected: [],
      suggestedArticlesSelected: [],
      similarArticles: [
        { label: 'Hot Water Faults', value: 'bat' },
        { label: 'Wrongful Disconnection Checklist', value: 'friend'},
        { label: 'VIC Life Support Form', value: 'upload'}
      ],
      suggestedArticles: [
        { label: 'Hot Water Faults', value: 'bat' },
        { label: 'Wrongful Disconnection Checklist', value: 'friend'},
        { label: 'VIC Life Support Form', value: 'upload'}
      ],
      trees:
        {
          ticked:[],
          labels:[
            {
              showFolder:0,
              label: 'Sales',
              children: [
                {
                  label: 'Services',
                  children: [
                    {
                      label: 'Hot Water Faults'
                    },
                  ]
                },
              ]
            },
            {
              showFolder:0,
              label: 'Finance',
              children: [
                {
                  label: 'Staff'
                }
              ]
            },
            {
              showFolder:0,
              label: 'Marketing',
              children: [
                {
                  label: 'Wrongful Disconnection Checklist'
                },
                {
                  label: 'VIC Life Support Form'
                }
              ]
            },
            {
              showFolder:0,
              label: 'HR & Legal',
              children: [
                {
                  label: 'Recruitment'
                }
              ]
            },
            {
              showFolder:0,
              label: 'Customer Service',
              children: [
                {
                  label: 'Clerk'
                }
              ]
            }
          ]
        },
      sidePanelItems:[
        {
          type:"dropdown",
          dropdown:{
            selected:2,
            defaultBtn:0,
            btnColor:"primary",
            placeholder:"Status",
            caption:"Last saved on 1:12pm, 20 Sep",
            selection:[
              {
                name:"publish",
                statusText:"Published",
                label:"Publish",
                icon:"publish"
              },
              {
                name:"publish-on",
                statusText:"Scheduled",
                label:"Publish On",
                icon:"pending_actions",
                onModal:{
                  type:"radio",
                  header:"Please select from options below:",
                  radios:{
                    name:"publish-on-type",
                    options:[
                      {
                        inputType:"date",
                        value:"publish-on-date",
                        date:{
                          formType:"boxy",
                          label:"Publish on",
                          model:{}
                        },
                      },
                      {
                        inputType:"date",
                        date:{
                          formType:"boxy",
                          label:"Publish between",
                          type:"range",
                          model:{
                            from:"",
                            to:""
                          }
                        },
                        value:"publish-between-dates",
                      }
                    ]
                  },
                  footer:[
                    {
                      type:"button",
                      label:"clear",
                      color:"grey-4",
                      actions:[
                        {
                          name:"clear"
                        }
                      ]
                    },
                    {
                      type:"button",
                      label:"save",
                      color:"primary",
                      actions:[
                        {
                          name:"save"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                name:"save-for-review",
                statusText:"Draft",
                label:"Save For Review",
                icon:"grading",
                separator:true
              },
              {
                name:"archive",
                statusText:"Archived",
                label:"Archive",
                icon:"archive"
              },
              {
                name:"delete",
                statusText:"Deleted",
                label:"Delete",
                icon:"delete"
              },
            ]
          }
        },
        {
          type:"dropdown",
          classes:{
            visibilityUsersGroups:{
              type:"radio",
              header:"Please select from options below:",
              radios:{
                name:"users-groups",
                horizontal:true,
                options:[
                  {
                    inputType:"select",
                    label:"Users",
                    value:"users",
                    select:{
                      label:"Search User",
                      model:null,
                      options:[
                        {
                          name:"Alby",
                          id:"1"
                        },
                        {
                          name:"Barka",
                          id:"2"
                        },
                        {
                          name:"Catali",
                          id:"3"
                        },
                        {
                          name:"Dorano",
                          id:"4"
                        },
                        {
                          name:"Elayi",
                          id:"5"
                        }
                      ]
                    },
                  },
                  {
                    inputType:"select",
                    label:"Groups",
                    value:"groups",
                    select:{
                      label:"Search User",
                      model:null,
                      options:[
                        {
                          name:"Marketing",
                          id:"1"
                        },
                        {
                          name:"Finance",
                          id:"2"
                        },
                        {
                          name:"Legal",
                          id:"3"
                        },
                        {
                          name:"Recruitment",
                          id:"4"
                        },
                        {
                          name:"IT",
                          id:"5"
                        },
                        {
                          name:"Payroll",
                          id:"6"
                        },
                        {
                          name:"Maintenace",
                          id:"7"
                        }
                      ]
                    },
                  }
                ]
              },
              footer:[
                {
                  type:"button",
                  label:"clear",
                  color:"grey-4",
                  actions:[
                    {
                      name:"clear"
                    }
                  ]
                },
                {
                  type:"button",
                  label:"save",
                  color:"primary",
                  actions:[
                    {
                      name:"save"
                    }
                  ]
                }
              ]
            }
          },
          dropdown:{
            selected:3,
            defaultBtn:1,
            btnColor:"primary",
            placeholder:"Visibility",
            caption:"Marketing, Finance, Legal",
            selection:[
              {
                name:"you",
                statusText:"You",
                label:"You",
                icon:"lock"
              },
              {
                name:"public",
                statusText:"Public",
                label:"Public",
                icon:"public"
              },
              {
                name:"users",
                statusText:"Users",
                label:"Users",
                icon:"person_add",
                onModal:"visibilityUsersGroups"
              },
              {
                name:"groups",
                statusText:"Groups",
                label:"Groups",
                icon:"groups",
                onModal:"visibilityUsersGroups"
              },
            ]
          }
        },
        {
          type:"textarea",
          textarea:{
            title:"Search Keywords",
            text:"",
            placeholder:"enter keywords separeted by comma or space"
          }
        },
        {
          type:"button",
          button:{
            title:"Category",
            caption:"Marketing, Finance, Legal",
            label:"Select Category",
            color:"primary",
            onModal:{
              type:"tree",
              header:"Please select from categories below:",
              tree:[
                {
                  ticked:[],
                  labels:[
                    {
                      showFolder:0,
                      label: 'Sales',
                      children: [
                        {
                          label: 'Services'
                        },
                      ]
                    },
                    {
                      showFolder:0,
                      label: 'Finance',
                      children: [
                        {
                          label: 'Staff'
                        }
                      ]
                    },
                    {
                      showFolder:0,
                      label: 'Marketing',
                      children: [
                        {
                          label: 'Digital'
                        },
                        {
                          label: 'Offline'
                        }
                      ]
                    },
                    {
                      showFolder:0,
                      label: 'HR & Legal',
                      children: [
                        {
                          label: 'Recruitment'
                        }
                      ]
                    },
                    {
                      showFolder:0,
                      label: 'Customer Service',
                      children: [
                        {
                          label: 'Clerk'
                        }
                      ]
                    }
                  ]
                },
              ],
              footer:[
                {
                  type:"button",
                  label:"clear",
                  color:"grey-4",
                  actions:[
                    {
                      name:"clear"
                    }
                  ]
                },
                {
                  type:"button",
                  label:"save",
                  color:"primary",
                  actions:[
                    {
                      name:"save"
                    }
                  ]
                }
              ]
            },
          }
        }
      ]
    }
  }
}
</script>