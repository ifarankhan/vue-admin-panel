<template>
  <section
      class="sticky z-30 min-h-full pt-5 pb-3 bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white top-20">
    <slot>
      <h1 class="pl-6 text-2xl font-normal leading-tight">
      <span v-if="icon" :class="[showStepper?'ml-4':'']">
        <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
        <path :d="icon"/>
      </svg>
      </span>
        {{ $t(title) }}
      </h1>
    </slot>

  <div class="flex p-4 mx-6" v-if="showStepper">
      <div class="flex items-center w-24">
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600 "
        ></div>
      </div>
      <div class="flex items-center w-2/4">
        <!-- <template> -->
          <div
              class="relative flex items-center text-xs font-semibold"
              :class="[showStep != 0 ? 'text-gray-800 text-opacity-50' : '']"
          >
            <div
                class="flex items-center justify-center w-8 h-8 py-3 border-2 border-teal-600 rounded-full "
                :class="[
              showStep == 0
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
            >
              1
            </div>
            <div class="absolute top-0 mt-10 -ml-20 text-center w-52">
              Distributor Account Detail
            </div>
          </div>
          <div
              class="flex-auto border-t-2 border-teal-600"
          ></div>
          <div
              class="relative flex items-center text-xs font-semibold"
              :class="[showStep != 3 ? 'text-gray-800 text-opacity-50' : '']"
          >
            <div
                class="flex items-center justify-center w-8 h-8 py-3 border-2 border-gray-300 rounded-full "
                :class="[
              showStep == 3
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
            >
              2
            </div>
            <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
              Credit Settings
            </div>
          </div>
        <!-- </template> -->
      </div>
      <div class="flex items-center w-4/12">
        <div class="flex-auto border-t-2 border-teal-600"></div>
      </div>
    </div>

  </section>
</template>
<script>
import { ref } from 'vue-demi';
export default {
  name: 'StickyHeader',
  // props: ['title', 'icon'],
  props: {
    title:{
      type: String
    },
    icon: {
      type: String
    },
    showStepper: {
      type: Boolean,
      default: false
    },
  },
   setup(props, { emit }) {
      const showStep = ref(0);

    return {
      showStep
    };
  },
}
</script>
