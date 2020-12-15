<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="showLeftDrawerButton" dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer class="left-menu" show-if-above v-model="left" :width="100" side="left" bordered>
      <q-btn class="mb-auto btn" color="primary" label="Home"/>
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
      showLeftDrawerButton:false,
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