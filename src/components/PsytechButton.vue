<template>
  <button :class="componentClass">
    {{$t(label)}}
  </button>
</template>
<script>
import {computed} from "vue"

export default {
  name: "PsytechButton",
  props: {
    label:String,
    type: {
      type: String,
      default: 'primary'
    },
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
