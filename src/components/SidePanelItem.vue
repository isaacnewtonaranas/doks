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
      >
        <q-list>
          <span v-for="(selection,i) in item.dropdown.selection" :key="i">
            <q-item
              clickable
              v-ripple
              :active="link === selection.name"
              @click="dropDownSelected(selection)"
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
    <q-dialog v-if="modal.show" v-model="modal.show" persistent>
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <p class="text-body1 text-weight-bold">{{modal.content.header}}</p>
          <div class="row">
            <q-list class="col-12">
              <q-item v-ripple v-for="(radio,i) in modal.content.radios.options" :key="i">
                <template v-if="radio.inputType=='date'">
                  <q-item-section avatar top>
                    <q-radio v-model="modal.content.radios.name" :val="radio.value" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <span class="text-body1">{{radio.label}}</span>
                    </q-item-label>
                    <q-item-label caption>
                      <template v-if="radio.dateType=='range'">
                        <template v-if="radio.dateFormType=='boxy'">
                          <q-date landscape v-model="radio.model" range />
                        </template>
                        <template v-else>
                          <div class="row q-gutter-md">
                            <div class="col-5">
                              <q-input v-model="radio.model.from" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                      <q-date v-model="radio.model.from">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-5">
                              <q-input v-model="radio.model.to" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                      <q-date v-model="radio.model.to">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </template>
                      </template>
                      <template v-else>
                        <template v-if="radio.dateFormType=='boxy'">
                          <q-date landscape v-model="radio.model" />
                        </template>
                        <template v-else>
                          <div class="row">
                            <div class="col-5">
                              <q-input v-model="radio.model" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                      <q-date v-model="radio.model">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </template>
                      </template>
                    </q-item-label>
                  </q-item-section>
                </template>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-actions v-if="modal.content.footer" align="right" class="bg-white">
          <span :key="i" v-for="(footer,i) in modal.content.footer">
            <q-btn :label="footer.label" @click="modalFooter(footer.actions)" :color="footer.color" class="q-mr-sm" />
          </span>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
              separator:false,
              onModal:[
                {
                  type:"",
                  header:"",
                  radios:{
                    name:"",
                    inputType:"",
                    dateFormType:"",
                    col:1,
                    options:[
                      {
                        dateType:"",
                        label:"",
                        value:"",
                        model:{
                          from:"",
                          to:""
                        }
                      }
                    ]
                  }
                }
              ],
              footer:[
                {
                  type:"",
                  label:"",
                  color:"",
                  actions:[
                    {
                      name:""
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      modal: {
        show:false
      },
      tab: 'edit-article',
      right: false,
      link: 'inbox',
      text:""
    }
  },
  methods:{
    dropDownSelected(selection){
      if(selection.onModal){
        this.modal.show=true
        this.modal.content=selection.onModal
      }
      this.link = selection.name
    },
    modalFooter(actions){
      for(var i=0;i<actions.length;i++){
        if(actions[i].name == "clear"){
          this.modal.content.radios.name=""
          let options = this.modal.content.radios.options
          for(var n=0;n<options.length;n++){
            options[n].model = {}
          }
        }
      }
    }
  }
}
</script>