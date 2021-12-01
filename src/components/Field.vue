<template>
  <div class="relative mb-5 floating-input">
      <slot />
    <label :for="lableFor" class="absolute top-0 left-0 h-full px-3 py-5 transition-all duration-100 ease-in-out origin-left transform pointer-events-none ">{{ label }}</label>
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
    lableFor: String
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
<style scoped>
/* .floating-input>input::placeholder {
    color: transparent;
} */


.floating-input>input:focus,.floating-input>select,
.floating-input>input:not(:placeholder-shown), .floating-input>select:not(:placeholder-shown) { 
@apply pt-8
}
.floating-input>input:focus~label, .floating-input>select:focus~label 
.floating-input>input:not(:placeholder-shown)~label, .floating-input>select:not(:placeholder-shown)~label {
  color: #17a9e1;
  @apply opacity-75 scale-75 -translate-y-3 translate-x-1; 
}


/* .floating-input>textarea:focus,
.floating-input>textarea:not(:placeholder-shown) { 
@apply pt-8
}
.floating-input>textarea:focus~label, 
.floating-input>textarea:not(:placeholder-shown)~label {
  color: #17a9e1;
  @apply opacity-75 scale-75 -translate-y-3 translate-x-1; 
} */
/* .floating-input>input:not(:placeholder-shown) + label {
   color: #17a9e1;
  @apply opacity-75 scale-75 -translate-y-3 translate-x-1; 
} */


</style>
