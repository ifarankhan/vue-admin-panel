<template>
  <nav-bar/>
  <template v-if="userData.isMasterPanelUser">
    <aside-menu :menu="masterMenu"/>
  </template>
  <template v-else>
    <aside-menu :menu="menu"/>
  </template>
  
  <div class="relative" style="min-height: calc(100vh - 115px);padding-bottom: 40px;">
    <router-view/>
    <!-- <div class="inset-x-0 bottom-0" style="bottom: 0px;position: absolute"> -->
      <!-- <footer-bar/> -->
    <!-- </div> -->
  </div>
  <footer-bar />
  <overlay v-show="isAsideLgActive" z-index="z-30" @overlay-click="overlayClick" />
</template>

<script>
// @ is an alias to /src
import { computed } from 'vue'
import { useStore } from 'vuex'
import menu from '@/menu.js'
import masterMenu from '@/masterMenu.js'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import Overlay from '@/components/Overlay'


export default {
  name: 'Home',
  components: {
    Overlay,
    FooterBar,
    AsideMenu,
    NavBar
  },
  setup () {
    const store = useStore()

    const isAsideLgActive = computed(() => store.state.isAsideLgActive)
    store.dispatch('fullScreenToggle', false)

    const overlayClick = () => {
      store.dispatch('asideLgToggle', true)
    }
    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    });

    return {
      menu,
      masterMenu,
      isAsideLgActive,
      overlayClick,
      userData
    }
  }
}
</script>
