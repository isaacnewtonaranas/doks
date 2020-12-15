<template>
  <div class="side-panel-item col-md-12">
    <span v-if="item.type=='dropdown'">
      <div class="text-subtitle1">{{item.dropdown.placeholder}}: {{item.dropdown.data[item.dropdown.selected].title}}</div>
      <div class="text-caption text-grey">{{item.dropdown.data[item.dropdown.selected].caption}}</div>
      <q-btn-dropdown
        split
        class="glossy"
        :color="item.dropdown.btnColor"
        :label="item.dropdown.data[0].title"
        @click="onMainClick"
      >
        <q-list>
          <q-item v-for="(selection,i) in item.dropdown.data" :key="i" clickable v-close-popup @click="onItemClick">
            <q-item-section avatar>
              <q-avatar :icon="selection.icon" :color="selection.iconBgColor" :text-color="selection.iconTextColor" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{selection.commandTitle}}</q-item-label>
              <q-item-label v-if="!selection.captionHideOnSelection" caption>{{selection.caption}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon :name="selection.miniIcon" :color="selection.miniIconBgColor" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </span>
    <span v-if="item.type=='textarea'">
      <div class="text-subtitle1">{{item.textarea.title}}</div>
      <q-input
        class="bg-grey-1"
        v-model="item.textarea.text"
        filled
        :placeholder="item.textarea.placeholder"
        autogrow
      />
    </span>
    <span v-if="item.type=='button'">
      <div class="text-subtitle1">{{item.button.title}}</div>
      <div class="text-caption text-grey">{{item.button.caption}}</div>
      <q-btn :label="item.button.label" :color="item.button.color" class="full-width" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: {
        type:"",
        textarea:{
          title:"",
          text:"",
          placeholder:""
        },
        button:{
          title:"",
          caption:"",
          label:"Select Category",
          color:"primary"
        },
        dropdown:{
          placeholder:"",
          selected:0,
          btnColor:"",
          data:[{
              title:"",
              caption:"",
              captionHideOnSelection:false,
              icon:"",
              iconBgColor:"",
              iconTextColor:"",
              miniIcon:"",
              miniIconBgColor:""
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      tab: 'edit-article',
      right: false,
      text:""
    }
  },
  methods:{
    onMainClick () {
    },

    onItemClick () {
    }
  }
}
</script>