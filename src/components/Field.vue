<template>
  <div class="relative m-2 floating-input" :class="[applyExtraInputClass? 'extra-input-class': '', applyExtraSelectClass?'extra-select-class':'']">
      <slot />
    <label :for="lableFor" class="absolute left-0 h-full px-3 py-5 transition-all duration-100 ease-in-out origin-left transform pointer-events-none -top-2 ">{{ label }}</label>
    <div v-if="help" class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ help }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Field',
  props: {
    label: String,
    help: String,
    lableFor: String,
    applyExtraInputClass: {
      type: Boolean,
      default: false
    },
    applyExtraSelectClass: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    const wrapperClass = computed(() => {
      const base = []
      const slotsLength = slots.default().length

      if (slotsLength > 1) {
        base.push('grid grid-cols-1 gap-3')
      }

      if (slotsLength === 2) {
        base.push('md:grid-cols-2')
      }

      return base
    })

    return {
      wrapperClass
    }
  }
}
</script>
<style>
.floating-input>input:focus,
.floating-input>input:not(:placeholder-shown){
@apply pt-4
}
.floating-input>input:focus~label,
.floating-input>input:not(:placeholder-shown)~label{
  color: #17a9e1;
  font-weight: 500;
  @apply opacity-75 scale-75 -translate-y-2.5 translate-x-1;
}

.floating-input>textarea:focus,
.floating-input>textarea:not(:placeholder-shown){
@apply pt-8
}
.floating-input>textarea:focus~label,
.floating-input>textarea:not(:placeholder-shown)~label{
  color: #17a9e1;
  font-weight: 500;
  @apply opacity-75 scale-75 -translate-y-2.5 translate-x-1;
}

.floating-input>select:focus~label,
.floating-input>select:not(:placeholder-shown)~label{
  color: #17a9e1;
  font-weight: 500;
  @apply opacity-75 scale-75 -translate-y-2 translate-x-1;
}

.floating-input>select:focus,
.floating-input>select:not(:placeholder-shown){
  padding-top: 1.3rem !important;
}

.extra-input-class{
  width: 310px;
}
.extra-select-class{
  width: 190px;
  margin-right: 15px;
}

</style>


