<template>
    <textarea
        v-if="type==='textarea'"
        :id="id"
        v-model="computedValue"
        class="w-full border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"
        :class="extraClasses"
        autocomplete="off"
    ></textarea>
     <input
         v-else
         :type="type"
         :id="id"
         v-model="computedValue"
         class="w-full border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"
         :class="extraClasses"
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
    let extraClasses = props.type === "textarea"? 'h-32':'h-14';
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })
    return {
      computedValue,
      extraClasses
    }
  }
}
</script>
<style scoped>
input:hover{
  border-color: #17a9e1;
}
textarea:hover{
  border-color: #17a9e1;
}

</style>
