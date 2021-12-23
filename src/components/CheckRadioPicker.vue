<template>
  <div class="flex flex-wrap justify-start -mb-3" :class="{'flex-col':column}">
    <label v-for="(value, key) in options" :key="key" class="block pl-4 mb-3 mr-6 last:mr-0 label"> 
      <input
        :disabled="disabled"
        :type="inputType"
        :name="name"
        v-model="computedValue"
        :value="key" class="w-4 h-4 text-psytechBlueBtHover form-checkbox focus:ring-transparent">
      <span class="check"></span>
      <span class="ml-1.5 text-sm font-semibold control-label mr-1.5"> {{ value }} </span>
    </label>
  </div>
  
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CheckRadioPicker',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      required: true
    },
    disabled:{
      type: String,
      default: false
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    column: Boolean,
    modelValue: [String, Number, Boolean, Array]
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        console.log("vlaue iskkk", value)
        emit('update:modelValue', value)
      }
    })

    const inputType = computed(() => props.type === 'radio' ? 'radio' : 'checkbox')

    return {
      computedValue,
      inputType
    }
  }
}
</script>
<style scoped>
.label {
    /* display: block; */
    /* padding-left: 15px; */
    text-indent: -21px;
}
</style>
