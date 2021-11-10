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
  font-family: 'Open Sans', sans-serif;
  background:#3498db;
  margin: 0 auto 0 auto;  
  width:100%; 
  text-align:center;
  margin: 20px 0px 20px 0px;   
}
</style>
