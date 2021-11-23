<template>
   <component :is="layout">
        <router-view />
    </component>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    let layout = computed( () => { 
        const {meta} = useRoute()
        return meta.layout
    })

    return {
      layout
    }
  },
}
</script>
<style>
  body{
    font-family: 'Montserrat', sans-serif;
  }
</style>
