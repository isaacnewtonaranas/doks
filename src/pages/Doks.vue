<template>
  <q-page class="doks">
    <div class="container">
      <div class="row justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Sales" />
          <q-breadcrumbs-el label="Compliance" />
        </q-breadcrumbs>
        <q-btn icon="keyboard_arrow_left"  color="grey-4" text-color="grey-9" label="Back" />
      </div>
      <div class="row justify-end right-drawer">
        <q-btn v-if="showRightDrawerButton" dense flat round icon="menu" @click="right = !right" />
      </div>
      <div class="row title-url">
        <q-input label="Title goes here" dense />
        <q-input label="/title-goes-here" dense>
          <template v-slot:before>
            <p class="text-subtitle1">URL:</p>
          </template>
          <template v-slot:after>
            <p><q-btn round dense flat icon="content_paste" /></p>
          </template>
      </q-input>
      </div>
      <div class="row tab-panels">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="grey-7"
          indicator-color="white"
          align="justify"
        >
          <q-tab name="edit-article" label="Edit Article" />
          <q-tab name="related-articles" label="Related Articles" />
          <q-tab name="seo" label="SEO" />
          <q-tab name="history" label="History" />
          <q-tab name="stats" label="Stats" />
          <q-tab name="comments" label="Comments" />
          <q-tab name="others" label="Others" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
          <q-tab-panel name="edit-article">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>

          <q-tab-panel name="related-articles">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>

          <q-tab-panel name="seo">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>

          <q-tab-panel name="history">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>
          
          <q-tab-panel name="stats">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>
          
          <q-tab-panel name="comments">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>
          
          <q-tab-panel name="others">
            <div class="tab-panel-container">

            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <q-drawer show-if-above v-model="right" side="right">
      <div class="side-panel row">
        <div class="side-panel-top col-md-12">
          <div class="row q-col-gutter-md">
            <div class="col">
              <q-btn label="Save" color="primary" />
            </div>
            <div class="col-8">
              <q-btn class="full-width" label="Preview" color="primary" />
            </div>
          </div>
        </div>
        <SidePanelItem
          v-for="(sidePanelItem,i) in sidePanelItems"
          :key="i"
          :item="sidePanelItem"
        />
      </div>
    </q-drawer>
  </q-page>
</template>

<script>
export default {
  components: {
    SidePanelItem: () => import('../components/SidePanelItem.vue')
  },
  data () {
    return {
      showRightDrawerButton:false,
      tab: 'edit-article',
      right: false,
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
                        date:{
                          formType:"boxy",
                          label:"Publish on",
                          model:{}
                        },
                        value:"publish-on-date",
                      },
                      {
                        inputType:"date",
                        date:{
                          formType:"boxy",
                          type:"range",
                          label:"Publish between",
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
                onModal:{
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
                              name:"Isaac",
                              id:"2"
                            },
                            {
                              name:"Emmalyn",
                              id:"1"
                            },
                            {
                              name:"Michell",
                              id:"3"
                            },
                            {
                              name:"Elsofia",
                              id:"4"
                            },
                            {
                              name:"Hazel",
                              id:"5"
                            },
                            {
                              name:"Melody",
                              id:"6"
                            },
                            {
                              name:"Carl",
                              id:"7"
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
              {
                name:"groups",
                statusText:"Groups",
                label:"Groups",
                icon:"groups"
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
            color:"primary"
          }
        }
      ]
    }
  },
  methods:{

  }
}
</script>