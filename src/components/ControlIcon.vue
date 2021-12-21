<template>
  <icon
    @iconWasClicked="$emit('iconWasClicked')"
    :path="icon"
    w="w-10"
    :h="h"
    class="absolute top-0 right-0 z-10 text-gray-500 cursor-pointer dark:text-gray-400"
  />
</template>

<script>
import Icon from '@/components/Icon'

export default {
  emits:['iconWasClicked'],
  name: 'ControlIcon',
  components: {
    Icon
  },
  props: {
    icon: String,
    h: String
  },
 setup(){
   const clicked = ()=>{
      console.log("clicked")
    }

    return {
      clicked
    }
 }
}
</script>
