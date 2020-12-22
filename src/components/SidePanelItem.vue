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
      <q-btn @click="buttonClicked(item)" :label="item.button.label" :color="item.button.color" class="full-width" />
    </span>
    <q-dialog v-if="modal.show" v-model="modal.show" persistent>
      <q-card style="max-width:unset">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <p class="text-body1 text-weight-bold">{{modal.content.header}}</p>
          <template v-if="modal.content.type=='radio'">
            <q-card-section class="q-pa-none" :horizontal="modal.content.radios.horizontal">
              <q-card-section class="q-pa-none" v-for="(radio,i) in modal.content.radios.options" :key="i"> 
                <q-item v-ripple>
                  <template v-if="radio.inputType=='date'">
                    <q-item-section avatar top>
                      <q-radio v-model="modal.content.radios.name" :val="radio.value" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <span class="text-body1">{{radio.date.label}}</span>
                      </q-item-label>
                      <q-item-label caption>
                        <template v-if="radio.date.type=='range'">
                          <template v-if="radio.date.formType=='boxy'">
                            <q-date landscape v-model="radio.date.model" range />
                          </template>
                          <template v-else>
                            <div class="row q-gutter-md">
                              <div class="col-5">
                                <q-input v-model="radio.date.model.from" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="radio.date.model.from">
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
                                <q-input v-model="radio.date.model.to" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="radio.date.model.to">
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
                          <template v-if="radio.date.formType=='boxy'">
                            <q-date landscape v-model="radio.date.model" />
                          </template>
                          <template v-else>
                            <div class="row">
                              <div class="col-5">
                                <q-input v-model="radio.date.model" placeholder="yyyy/mm/dd" mask="date" :rules="['date']">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="radio.date.model">
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
                  <template v-if="radio.inputType=='select'">
                    <q-item-section>
                      <q-item-label>
                        <q-radio v-model="modal.content.radios.name" :val="radio.value" />
                        <span class="text-body1">{{radio.label}}</span>
                      </q-item-label>
                      <q-item-label>
                        <q-select
                          square
                          outlined
                          v-model="radio.select.model"
                          use-input
                          use-chips
                          multiple
                          :label="radio.select.label"
                          input-debounce="0"
                          :options="focusOptions.options"
                          option-label="name"
                          option-value="id"
                          @focus="setFocusOptions(radio)"
                          @filter="filterFn"
                          style="width: 250px"
                        />
                      </q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
              </q-card-section>
            </q-card-section> 
          </template>
          <template v-if="modal.content.type=='tree'">
            <div class="q-pa-md row q-col-gutter-sm tree" style="">
              <span v-for="(tree,i) in modal.content.tree" :key="i">
                <q-tree
                  icon="folder"
                  :ticked.sync="tree.ticked"
                  no-connectors
                  :nodes="tree.labels"
                  node-key="label"
                  tick-strategy="leaf"
                >
                  <template v-slot:default-header="prop">
                    <div class="row items-center">
                      <template v-if="prop.node.children">
                        <q-icon :name="folderIcon[prop.expanded?1:0]" color="orange" size="28px" class="q-mr-sm" />
                        <div class="folder-open-added-icon" v-if="prop.expanded"></div>
                      </template>
                      <div class="text-subtitle1">{{ prop.node.label }}</div>
                    </div>
                  </template>
                </q-tree>
              </span>
            </div>
          </template>
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
        type:"", //dropdown,textarea,button
        classes:[],
        textarea:{
          title:"",
          text:"",
          placeholder:""
        },
        button:{
          title:"",
          caption:"",
          label:"Select Category",
          color:"primary",
          onModal:{
            type:"", //tree
            header:"",
            tree:[
              {
                labels:{
                  label: '',
                  disabled: false,
                  icon:'',
                  children: [
                    {
                      label: '',
                      disabled: false
                    }
                  ]
                }
              }
            ]
          }
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
                  type:"", //radio
                  header:"",
                  radios:{
                    name:"",
                    horizontal:false,
                    options:[
                      {
                        inputType:"", //date,select
                        label:"",
                        value:"",
                        select:{
                          label:"",
                          model:null,
                          options:[
                            {
                              name:"",
                              id:""
                            }
                          ]
                        },
                        date:{
                          formType:"", //null,boxy
                          type:"", //null,range
                          model:{
                            from:"",
                            to:""
                          }
                        },
                      }
                    ]
                  }
                }
              ],
              footer:[
                {
                  type:"",//button
                  label:"",
                  color:"",
                  actions:[
                    {
                      name:""//clear,save
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
      folderIcon:['folder','folder_open'],
      modal: {
        show:false
      },
      link: 'inbox',
      saveSelects:{},
      focusOptions:{
        options:[],
        key:''
      }
    }
  },
  methods:{
    consolelog(log){
      console.log(log)
    },
    buttonClicked(button){
      this.createModal(button.button)
    },
    useClass(classes,string){
      if(!string){
        return typeof classes === 'string'?this.item.classes[classes]:classes
      }else{
        return this.item.classes[classes]
      }
    },
    createModal(item){
      if(item.onModal){
        this.modal.show=true
        this.modal.content=this.useClass(item.onModal)
      }
    },
    dropDownSelected(selection){
      this.createModal(selection)
      this.link = selection.name
    },
    modalFooter(actions){
      for(var i=0;i<actions.length;i++){
        if(actions[i].name=="clear"){
          if(this.modal.content.type=="radio"){
            this.modal.content.radios.name=""
            let options = this.modal.content.radios.options
            for(var n=0;n<options.length;n++){
              if(options[n].inputType=="date"){
                options[n].date.model = {}
              }
              if(options[n].inputType == "select"){
                options[n].select.model = null
              }
            }
          }
          if(this.modal.content.type=="tree"){
            let trees = this.modal.content.tree
            for(var n=0;n<trees.length;n++){
              trees[n].ticked = []
            }
          }
        }
        if(actions[i].name == "save"){
          this.modal.show = false
        }
      }
    },
    setFocusOptions(input){
      if(!this.saveSelects[input.value]){
        input.select.options.sort(function(a, b) {
              var nameA = a.name.toUpperCase();
              var nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
        })
        this.saveSelects[input.value] = input
      }
      this.focusOptions.key = input.value
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.focusOptions.options = this.saveSelects[this.focusOptions.key].select.options
        }
        else {
          const needle = val.toLowerCase()
          this.focusOptions.options = this.saveSelects[this.focusOptions.key].select.options.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
          this.focusOptions.options.sort(function(a, b){
            return a.name.length - b.name.length;
          })
        }
      })
    }
  }
}
</script>