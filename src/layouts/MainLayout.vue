<template>
  <q-layout class="main-layout" view="hHh LpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="showLeftDrawerButton" dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="row justify-between">
          <q-avatar class="logo">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <div class="avatar-container text-center">
            <q-avatar>
              <img class="avatar" src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            <div class="text-subtitle2 text-weight-light">
              Girish
            </div>
          </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer class="left-menu" show-if-above v-model="left" :width="140" side="left" bordered>
      <div>
        <q-btn class="btn q-pt-md q-pb-sm q-mt-md" flat stack color="primary" label="Home" icon="fa fa-home"/>
        <q-btn class="btn q-pt-md q-pb-sm q-mt-md" flat stack color="primary" label="Users" icon="fa fa-users"/>
        <q-btn class="btn q-pt-md q-pb-sm q-mt-md" flat stack color="primary" label="Analytics" icon="fa fa-chart-bar"/>
        <q-btn class="btn q-pt-md q-pb-sm q-mt-md" flat stack color="primary" label="Settings" icon="fa fa-sliders-h"/>
      </div>
      <q-btn class="btn" color="primary" label="Logout"/>
    </q-drawer>


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
      left: false
    }
  }
}
</script>
<style lang="stylus">
.left-menu
  .btn
    margin 10%
    width 80%
  .q-drawer__content
    display flex
    flex-direction column
    justify-content space-between
</style>