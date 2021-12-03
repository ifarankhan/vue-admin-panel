<template>
  <button :class="[!$slots.default? componentClass:buttonWithIcon]" @click="$emit('buttonWasClicked')">
    <template v-if="$slots.default">
        <slot></slot>
    </template>
    <span> {{$t(label)}} </span>
  </button>
</template>
<script>
import {computed} from "vue"

export default {
  name: "PsytechButton",  
  emits:["buttonWasClicked"],
  props: {
    label:String,
    type: {
      type: String,
      default: 'primary'
    },
    buttonWithIcon:{
      type: String,
      default: ''
    }
  },
  setup(props){
    const componentClass = computed(() => {
      const base = [
        'm-2',
        'py-2',
        'px-4',
        'rounded-full',
        'border'
      ]
      if (props.type === 'primary') {
        base.push('bg-psytechBlue hover:bg-blue-700 text-white')
      }
      if (props.type === 'Secondary') {
        base.push('bg-transparent hover:bg-blue-500 text-psytechBlue hover:text-white border-psytechBlue hover:border-transparent')
      }
      return base;
    });
    return {
      componentClass
    }
  }
}
</script>
