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
                      <q-input v-model="ip.address" :disable="loading" required dense outlined label="enter IP address or a CIDP notation" />
                    </div>
                  </div>
                  <div class="row q-pb-md justify-start">
                    <div class="q-mr-md" style="width:350px;">
                      <q-input v-model="ip.comment" :disable="loading" dense outlined label="Optional comment describing this entry" />
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
                    :loading="tables.ip.loading"
                  >
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-icon
                          :loading="loading"
                          :disable="loading"
                          class="cursor-pointer edit-icon"
                          @click="submitdeleteIP(props.value)"
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
                <div class="row choose-theme" v-for="(theme,i) in themes" :key="i">
                  <div>
                    <q-icon name="far fa-image" style="font-size: 100px;" color="primary" />
                  </div>
                  <div class="title">
                    <span class='text-body1'>{{theme.title}}</span>
                    <br>
                    <router-link :to="theme.link" class="text-primary">
                      <span class='text-body1 text-primary' >(click here to preview)</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="customize">
              <div class="tab-panel-container scroll">
                <div class="big-window customize">
                  <div class="chips-column">
                    <q-chip
                      dense
                      size="xl"
                      icon="fa fa-caret-right"
                      text-color="white"
                      color="grey-6"
                    >
                      <div class="items row justify-between">
                        <div class="item1 text-body1 text-dark">
                          Menu 1
                        </div>
                        <div class="item2">
                          <q-icon class="icon-right" name="fa fa-edit" dense flat />
                        </div>
                      </div>
                    </q-chip>
                    <q-chip
                      dense
                      size="xl"
                      text-color="white"
                      color="grey-4"
                    >
                      <div class="items row justify-between">
                        <div class="item1 text-body1 text-dark">
                          item 11
                        </div>
                        <div class="item2">
                          <q-icon class="icon-right" name="fa fa-edit" dense flat />
                        </div>
                      </div>
                    </q-chip>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="export">
              <div class="tab-panel-container">
                <div class="row q-ma-lg" v-for="(action,i) in exportTab.actions" :key="i">
                  <q-btn class="q-px-lg" :icon="action.icon" outlined dense :label="action.label" />
                  <div class="q-pa-sm q-ml-md text-body1">
                    {{action.descriptions}}
                  </div>
                </div>
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
    </div>
  </q-page>
</template>
<script>
import {debounce} from 'quasar'
export default {
  computed:{
    ips:{
      get(){
        return this.$store.getters['ips/data']
      }
    }
  },
  data() {
    return {
      exportTab:{
        actions:[
          {
            icon:"far fa-file-pdf",
            label:"download as PDFs",
            descriptions:"Click to download all articles of KB as PDFs"
          },
          {
            icon:"far fa-file-code",
            label:"download as HTMLs",
            descriptions:"Click to download all articles of KB as HTML pages"
          },
          {
            icon:"far fa-file-alt",
            label:"download as JSONs",
            descriptions:"Click to download all articles of KB as JSON data"
          }
        ]
        
      },
      themes:[
        {
          icon:"",
          title:"Classic",
          link:{
            name:"home"
          },
        },
        {
          icon:"",
          title:"Corporate",
          link:{
            name:"home"
          },
        },
        {
          icon:"",
          title:"Minimalist",
          link:{
            name:"home"
          },
        }
      ],
      tables:{
        ip:{
          loading:false
        }
      },
      ip:{
        address:'',
        comment:''
      },
      tab: 'export',
      loading:true,
      pagination:{
        rowsPerPage:10
      },
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
    }
  },
  mounted(){
    this.loading = false
    this.addIP = debounce(this.addIP,1000)
    this.deleteIP = debounce(this.deleteIP,1000)
  },
  methods:{
    addIPCancel(){
      this.ip = {
        address:'',
        comment:''
      }
    },
    submitAddIP(){
      this.loading = true
      this.tables.ip.loading = true
      this.addIP()
    },
    submitdeleteIP(id){
      this.tables.ip.loading = true
      this.deleteIP(id)
    },
    addIP(){
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
          this.tables.ip.loading = false
          this.loading = false
        }
      }.bind(this),1000)
    },
    deleteIP(id){
      setTimeout(function(){
        try{
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
          this.tables.ip.loading = false
        }
      }.bind(this),1000)
    },
  }
}
</script>