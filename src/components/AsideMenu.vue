<template>
  <aside
    v-show="!isFullScreen"
    class="fixed top-0 z-50 h-screen overflow-y-scroll w-60 bg-psytechBlue transition-position lg:left-0 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-psytechBlue dark:scrollbar-track-blue-800 dark:bg-psytechBlue"
    :class="[ isAsideMobileExpanded ? 'left-0' : '-left-60', isAsideLgActive ? 'block' : 'lg:hidden xl:block' ]"
  >
    <div class="flex flex-row items-center flex-1 w-full h-20 text-white bg-psytechBlue">
      <nav-bar-item type="hidden lg:flex xl:hidden" @click="asideLgClose" active-color="text-white" active>
        <icon :path="mdiMenu" class="cursor-pointer" size="24" />
      </nav-bar-item>
      <div class="flex-1 px-5">
        <span>
          <logo-white />
        </span>
      </div>
    </div>
    <div>
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="`a-${index}`" class="p-3 text-xs text-white uppercase">
        <!-- {{ menuGroup }}-->
        </p>
        <aside-menu-list
          v-else
          :key="`b-${index}`"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
    <div class="absolute w-11/12 p-4 border-2 rounded-md right-2.5 bottom-12 credits border-psytechBorderColor bg-psytechBlueHover h-30">
      <p class="text-base text-white"> Credits balance: </p>
      <p class="flex justify-between -mt-1 text-base text-lg text-white">
        <span>
          {{ credits }} 
        </span>
         <span class="plus-icon">
          <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block" color="red">
          <path :d="mdiPlus"/>
        </svg>
       </span>
      </p>
    </div>
  </aside>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { mdiMenu } from '@mdi/js'
import AsideMenuList from '@/components/AsideMenuList'
import NavBarItem from '@/components/NavBarItem'
import Icon from '@/components/Icon'
import { mdiPlus } from '@mdi/js';
import LogoWhite from '@/components/LogoWhite'
import { useRouter } from 'vue-router'

export default {
  name: 'AsideMenu',
  components: { AsideMenuList, NavBarItem, Icon,LogoWhite },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const store = useStore()
    
    const isFullScreen = computed(() => store.state.isFullScreen)
    const isAsideMobileExpanded = computed(() => store.state.isAsideMobileExpanded)

    let credits = computed(() => {
      const USER_DATA = JSON.parse(localStorage.getItem("userData"));
      return USER_DATA?.credits;
    });

    const isAsideLgActive = computed(() => store.state.isAsideLgActive)

    const asideLgClose = () => {
      store.dispatch('asideLgToggle', false)
    }

    const menuClick = (event, item) => {
      //
    }

    return {
      isFullScreen,
      isAsideMobileExpanded,
      isAsideLgActive,
      asideLgClose,
      credits,
      mdiPlus,
      menuClick,
      mdiMenu
    }
  }
}
</script>
<style scoped>
.credits:hover{
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
}
.plus-icon{
  fill: #fff;
}
</style>
