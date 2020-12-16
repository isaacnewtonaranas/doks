<template>
  <div class="side-panel-item col-md-12">
    <span v-if="item.type=='dropdown'">
      <div class="text-subtitle1">{{item.dropdown.placeholder}}: {{item.dropdown.selection[item.dropdown.selected].statusText}}</div>
      <div class="text-caption text-grey">{{item.dropdown.caption}}</div>
      <q-btn-dropdown
        split
        class="glossy"
        :color="item.dropdown.btnColor"
        :label="item.dropdown.selection[item.dropdown.defaultBtn].label"
        @click="onMainClick"
      >
        <q-list>
          <span v-for="(selection,i) in item.dropdown.selection" :key="i">
            <q-item
              clickable
              v-ripple
              :active="link === selection.name"
              @click="link = selection.name"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon :name="selection.icon" />
              </q-item-section>
              <q-item-section>{{selection.label}}</q-item-section>
            </q-item>
            <q-separator v-if="selection.separator" spaced />
          </span>

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
          selected:0,
          defaultBtn:0,
          btnColor:"",
          placeholder:"",
          caption:"",
          selection:[
            {
              name:"",
              statusText:"",
              label:"",
              icon:"",
              separator:false
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
      link: 'inbox',
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