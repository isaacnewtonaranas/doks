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
      text:"",
      sidePanelItems:[
        {
          type:"dropdown",
          dropdown:{
            selected:1,
            btnColor:"primary",
            placeholder:"Status",
            data:[
              {
                commandTitle:"Publish",
                title:"Published",
                caption:"Last saved on 1:12pm, 20 Sep",
                captionHideOnSelection:true,
                icon:"save",
                iconBgColor:"primary",
                iconTextColor:"white",
                miniIcon:"info",
                miniIconBgColor:"primary"
              },
              {
                commandTitle:"Save Draft",
                title:"Draft",
                caption:"Last saved on 1:12pm, 20 Sep",
                icon:"build",
                iconBgColor:"grey-5",
                iconTextColor:"white",
                miniIcon:"info",
                miniIconBgColor:"grey-5"
              }
            ]
          }
        },
        {
          type:"dropdown",
          dropdown:{
            selected:1,
            btnColor:"primary",
            placeholder:"Status",
            data:[
              {
                commandTitle:"Make Public",
                title:"Public",
                caption:"Anyone can see this document",
                icon:"public",
                iconBgColor:"primary",
                iconTextColor:"white",
                miniIcon:"info",
                miniIconBgColor:"primary"
              },
              {
                commandTitle:"Specific Groups Only",
                title:"Group",
                caption:"Marketing, Finance, Legal",
                icon:"groups",
                iconBgColor:"grey-5",
                iconTextColor:"white",
                miniIcon:"info",
                miniIconBgColor:"grey-5"
              },
              {
                commandTitle:"Make Private",
                title:"Private",
                caption:"Only you can see this document",
                icon:"lock",
                iconBgColor:"grey-5",
                iconTextColor:"white",
                miniIcon:"info",
                miniIconBgColor:"grey-5"
              }
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
    onMainClick () {
      // console.log('Clicked on main button')
    },

    onItemClick () {
      // console.log('Clicked on an Item')
    }
  }
}
</script>