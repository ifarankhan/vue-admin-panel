<template>
 <div>
    <Loader v-if="loader" />
  <Listbox as="div" v-model="computedValue" :class="[customeWidth?'extra-select-class-width' : 'extra-select-class', allyMarginRight?'margin-right':'width-full']" style="margin-top: 0.55rem">
    <div class="relative">
      <ListboxButton
       style="height: 45px; min-height: 45px; max-height: 45px"
       class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:bg-opacity-50 focus:outline-none focus:ring-none focus:border-0 sm:text-sm"
       >
          <div class="-mt-.25 text-xs font-semibold text-psytechBlue">
              {{ labelText }}
          </div>
          <div class="text-xs font-semibold text-gray-800">
              {{ filterDropdown?.find(item=> item.value == computedValue)?.text }}
          </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </ListboxButton>
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions v-if="openSlectList" class="absolute z-10 w-full py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg style-2 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="item in filterDropdown" :key="item.value" :value="item.value" v-slot="{ active, selected }">
            <li :class="[active ? 'text-psytechBlue' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
              <div class="flex items-center" @click="itemClicked(item)">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ item.text }} {{ item?.email ? ` (${item.email})`: '' }}
                </span>
              </div>

              <span v-if="computedValue" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
 </div>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import IconSVG from "@/components/IconSVG.vue";
import { computed } from 'vue';
import Loader from "@/components/Loader.vue";

export default {
  emits: ["update:modelValue", "right-icon-click"],
  props: {
    allyMarginRight:{
      type: Boolean,
      default: true
    },
    loader:{
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text",
    },
    emitCustomEvent:{
      type: Boolean,
      default: false
    },
    openSlectList:{
      type: Boolean,
      default: true
    },
    customeWidth:{
      type: Boolean,
      default: false
    },
    labelText:{
      type: String,
      default: 'Filter Type'
    },
    filterDropdown: Array,
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
  },
  components: {
    Listbox,
    IconSVG,
    Loader,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },
  setup(props,{emit}) {
   const computedValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      },
    });
    const itemClicked = (item)=>{
      if(props.emitCustomEvent){
        emit("itemWasSelected", item)
      }
    }
    return {
        computedValue,
        itemClicked
    }
  },
}
</script>

<style scoped>
.style-2::-webkit-scrollbar-track {
  background-color: #f8f8f8;
}

.style-2::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(255, 255, 255);
}

.style-2::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: #17a9e1;
}

.extra-select-class{
  width: 287px;
}

.margin-right {
  margin-right: 15px;
}
.width-full {
  width: 98.5% !important;
}

.extra-select-class-width{
  width: 96%;
}
</style>