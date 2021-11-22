<template>
  <li class="p-2">
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      :target="itemTarget"
      v-slot="vSlot"
      class=" "
      :class="[isSubmenuList ? 'p-3 text-sm' : 'py-2']"
      @click="menuClick"
    >
      <div class="flex cursor-pointer hover:bg-psytechBlueHover dark:hover:bg-psytechBlueHover rounded-md py-2" :class="[vSlot && vSlot.isExactActive ? 'bg-psytechBlueActive':'']">
        <icon
            v-if="item.icon"
            :path="item.icon"
            class="flex-none"
            :class="[vSlot && vSlot.isExactActive ? styleActive : styleInactive]"
            w="w-12"
        />
        <span
            class="flex-grow"
            :class="[vSlot && vSlot.isExactActive ? styleActive : styleInactive]"
        >{{ item.label }}</span>
        <icon
            v-if="hasDropdown"
            :path="dropdownIcon"
            class="flex-none"
            :class="[vSlot && vSlot.isExactActive ? styleActive : styleInactive]"
            w="w-12"
        />
      </div>
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :class="{ 'hidden': !isDropdownActive, 'block bg-gray-700 dark:bg-gray-800': isDropdownActive }"
      is-submenu-list
    />
  </li>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import { mdiMinus, mdiPlus } from '@mdi/js'
import Icon from '@/components/Icon'

export default {
  name: 'AsideMenuItem',
  components: {
    AsideMenuList: defineAsyncComponent(() => import('@/components/AsideMenuList')),
    Icon
  },
  emits: ['menu-click'],
  props: {
    item: Object,
    isSubmenuList: Boolean
  },
  setup (props, { emit }) {
    const isDropdownActive = ref(false)

    const componentIs = computed(() => props.item.to ? 'router-link' : 'a')

    const hasDropdown = computed(() => !!props.item.menu)

    const dropdownIcon = computed(() => isDropdownActive.value ? mdiMinus : mdiPlus)

    const itemTo = computed(() => props.item.to || null)

    const itemHref = computed(() => props.item.href || null)

    const itemTarget = computed(() => componentIs.value === 'a' && props.item.target ? props.item.target : null)

    const menuClick = event => {
      emit('menu-click', event, props.item)

      if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value
      }
    }

    const styleActive = 'font-bold text-white'

    const styleInactive = 'text-white'

    return {
      isDropdownActive,
      componentIs,
      hasDropdown,
      dropdownIcon,
      itemTo,
      itemHref,
      itemTarget,
      menuClick,
      styleActive,
      styleInactive
    }
  }
}
</script>
