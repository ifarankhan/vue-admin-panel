<template>
  <input
    :type="type"
    :id="id"
    v-model="computedValue" 
    class="w-full border border-gray-200 rounded-md h-14 focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"
    autocomplete="off"
  />
</template>
<script>
import { computed } from 'vue'
export default {
  emits: ['update:modelValue', 'right-icon-click'],
  props:{
    type:{
      type: String,
      default: 'text'
    },
    id:{
      type: String,
    },
   modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
  },
  setup (props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })
    return {
      computedValue
    }
  }
}
</script>
<style scoped>
input:hover{
  border-color: #17a9e1;
}

</style>
