<template>
  <footer v-show="isFooterBarVisible" class="px-6 py-2 bg-white dark:bg-gray-900">
    <level>
      <div>
        Copyright <b>&copy; {{ year }}, <a href="https://psytech.com/" target="_blank">Psytech International. All rights reserved</a>.</b>
        
      </div>
      <div class="md:py-2">
      
      </div>
    </level>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Level from '@/components/Level'


export default {
  name: 'FooterBar',
  components: {
    Level
  },
  setup () {
    const store = useStore()

    const year = computed(() => new Date().getFullYear())

    const isFooterBarVisible = computed(() => !store.state.isFullScreen)

    return {
      year,
      isFooterBarVisible
    }
  }
}
</script>
