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
      <!-- <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-item>
          <q-item-section>
            <p class="text-body1 text-weight-bold">{{modal.content.header}}</p>
          </q-item-section>
        </q-item>
        <q-card-section horizontal>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
          <q-card-section class="col-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </q-card-section>
        </q-card-section>
      </q-card> -->
      <q-card style="max-width:unset">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <p class="text-body1 text-weight-bold">{{modal.content.header}}</p>
          <q-card-section class="q-pa-none" :horizontal="modal.content.radios.horizontal">
            <template v-if="modal.content.type=='radio'">
              <q-card-section class="q-pa-none" v-for="(radio,i) in modal.content.radios.options" :key="i"> 
                <q-item v-ripple>
                  <template v-if="radio.inputType=='date'">
                    <q-item-section avatar top>
                      <q-radio v-model="modal.content.radios.name" :val="radio.value" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <span class="text-body1">{{radio.label}}</span>
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
                          v-model="model"
                          use-input
                          use-chips
                          multiple
                          :label="radio.select.label"
                          input-debounce="0"
                          atnew-value="createValue"
                          :options="focusOptions || radio.select.options"
                          option-label="name"
                          option-value="id"
                          @input-value="setFocusOptions(radio.select.options)"
                          @filter="filterFn"
                          style="width: 250px"
                        />
                      </q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
              </q-card-section>
            </template>
          </q-card-section> 
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
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

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
                    horizontal:false,
                    options:[
                      {
                        inputType:"", //date
                        label:"",
                        value:"",
                        date:{
                          formType:"",
                          type:"",
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
      model: null,

      filterOptions: stringOptions,
      lorem:"dfsdf aga dfgadfg ad gadfg adf gadf agdf gadf g",
      modal: {
        show:false
      },
      tab: 'edit-article',
      right: false,
      link: 'inbox',
      text:"",
      focusOptions:null
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
    },
    setFocusOptions(options){
      console.log(options)
      this.focusOptions = options
    },
    // createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

    //   if (val.length > 2) {
    //     if (!stringOptions.includes(val)) {
    //       done(val, 'add-unique')
    //     }
    //   }
    // },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.focusOptions = this.focusOptions
        }
        else {
          const needle = val.toLowerCase()
          this.focusOptions = this.focusOptions.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>