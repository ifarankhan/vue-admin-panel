<template>
  <nav-bar-item
    type="block"
    :has-divider="hasDivider"
    :active="isDropdownActive"
    dropdown
    class="relative dropdown"
    @click="toggle"
    ref="root"
  >
    <a class="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent">
      <slot />
       <span class="block ml-1 mt-0.5" v-if="hasCustomIcon && showIcon">
        <LanguageIcon width="9" height="8" />
      </span>
      <icon v-if="!hasCustomIcon && showIcon" :path="toggleDropdownIcon" class="hidden transition-colors lg:inline-flex" />
    </a>
    <div
      class="text-sm border-b border-gray-100 lg:border-b-0 lg:border-gray-200 lg:border-t lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:shadow-md lg:rounded-b lg:dark:bg-gray-800 dark:border-gray-700"
      :class="{'lg:hidden':!isDropdownActive}"
    >
      <slot name="dropdown" />
    </div>
  </nav-bar-item>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import NavBarItem from '@/components/NavBarItem';
import LanguageIcon from "@/components/LanguageIcon.vue";
import Icon from '@/components/Icon'

export default {
  name: 'NavBarMenu',
  components: { Icon, NavBarItem, LanguageIcon },
  props: {
    hasDivider: {
      type: Boolean,
      default: false
    },
    showIcon:{
      type: Boolean,
      default: true
    },
    hasCustomIcon:{
      type: Boolean,
      default: false
    }
  },
  setup () {
    const isDropdownActive = ref(false)

    const toggleDropdownIcon = computed(() => isDropdownActive.value ? mdiChevronUp : mdiChevronDown)

    const toggle = () => {
      isDropdownActive.value = !isDropdownActive.value
    }

    const root = ref(null)

    const forceClose = event => {
      if (!root.value.$el.contains(event.target)) {
        isDropdownActive.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', forceClose)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('click', forceClose)
    })

    return {
      isDropdownActive,
      toggleDropdownIcon,
      toggle,
      root
    }
  }
}
</script>
