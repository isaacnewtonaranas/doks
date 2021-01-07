<template>
  <q-layout class="main-layout" view="hHh LpR fFf">

    <!-- <q-header class="bg-primary text-white">
      <q-toolbar> -->

        <!-- <q-toolbar-title class="row justify-between">
          <q-avatar class="logo">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
        </q-toolbar-title> -->

      <!-- </q-toolbar>
    </q-header> -->

    <q-drawer class="left-menu" show-if-above v-model="left" :width="114" side="left" bordered>
      <div>
        <!-- <q-icon color="primary" stack name="fab fa-empire" /> -->
        <q-btn
          class="btn bg-primary logo no-border-radius"
          flat
          stack
          color="white"
          icon="fab fa-empire"
          @click="left = false"
        />
        <q-btn
          :key="i"
          v-for="(link,i) in links"
          @click="$router.push({name:link.name}).catch(err => {err})"
          class="btn q-pt-lg q-pb-md"
          flat
          stack
          color="primary"
          :label="link.label"
          :icon="link.icon"
        />
      </div>
      
      <q-btn class="btn q-pt-md q-pb-sm q-mt-md" flat stack color="primary" label="Girish" icon="far fa-user-circle"/>
      <!-- <q-btn class="btn" color="primary" label="Logout"/> -->
    </q-drawer>
    <div class="q-mini-drawer-hide left-toggle-drawer" style="position:fixed;top: 15px; left: -17px;z-index:99">
      <q-btn
        dense
        round
        unelevated
        v-if="!left"
        color="primary"
        icon="chevron_right"
        @click="left = true"
      />
    </div>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      showLeftDrawerButton:true,
      left: false,
      links:[
        {
          name:"home",
          icon:"fa fa-home",
          label:"Home"
        },
        {
          name:"home",
          icon:"fa fa-users",
          label:"Users"
        },
        {
          name:"analytics",
          icon:"fa fa-chart-bar",
          label:"Analytics"
        },
        {
          name:"settings",
          icon:"fa fa-sliders-h",
          label:"settings"
        }
      ]
    }
  }
}
</script>
<style lang="stylus">
.left-menu
  .q-drawer
    background $grey-3
  .btn
    width 100%
  .q-drawer__content
    display flex
    flex-direction column
    justify-content space-between
</style>