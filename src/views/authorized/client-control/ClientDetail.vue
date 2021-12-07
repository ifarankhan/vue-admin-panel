<template>
    <sticky-header>
      <div class="grid grid-cols-2">
        <div class="flex items-center ml-8">
          <div class="flex items-center justify-center w-8 h-8 bg-black rounded rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <div class="ml-3 font-bold text-medium">
            BNP Paribas
          </div>
        </div>
        <div class="mr-8 place-self-end">
         <span class="text-sm font-semibold"> Creation Date:</span>  10-05-2021
        </div>
      </div>
      
      <!-- tab section -->
      <div class="grid grid-cols-2 gap-x-0">
        
      <div class="w-full px-2 pt-4 pb-16 ml-8 sm:px-0">
    <TabGroup>
      <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
          as="template"
          v-slot="{ selected }"
        >
          <button
           :class="['block px-6 py-4 font-bold text-black active mr-8 hover:text-blue-500 focus:outline-none',
           selected ?'border-b-2 border-black': 'border-b-2 border-gray-400'
           ]"
          >
            Account Details
          </button>
          
        </Tab>
       <Tab
          as="template"
          v-slot="{ selected }"
        >
          <button
          :class="['block px-6 py-4 font-bold text-black active hover:text-blue-500 focus:outline-none',
           selected ?'border-b-2 border-black': 'border-b-2 border-gray-400'
           ]"
          >
            Account Users (03)
          </button>
          
        </Tab>
        <!-- <Tab
          as="template"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }} 
          </button>
        </Tab> -->
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel>
            <div class="ml-1 font-bold text-medium">
                Account Details
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium laboriosam sunt repellendus veritatis impedit? Quaerat nisi placeat amet ex expedita porro sunt enim, quod eos nam impedit repudiandae soluta ea?
            </div>
        </TabPanel>
      <TabPanel>Content 2</TabPanel>
      <!-- <TabPanel>Content 3</TabPanel> -->
      </TabPanels>
    </TabGroup>
  </div>
          <div class="bg-green-800">
            second section
          </div>
      </div>
      
    </sticky-header>
</template>

<script>
import { ref } from 'vue';
import StickyHeader from "@/components/StickyHeader";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
export default {
  components:{
    StickyHeader,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {
    let categories = ref({
      Recent: [
        {
          id: 1,
          title: 'Account Details',
          date: '5h ago',
          commentCount: 5,
          shareCount: 2,
        },
        {
          id: 2,
          title: "Account Users",
          date: '2h ago',
          commentCount: 3,
          shareCount: 2,
        },
      ],
      Popular: [
        {
          id: 1,
          title: 'Is tech making coffee better or worse?',
          date: 'Jan 7',
          commentCount: 29,
          shareCount: 16,
        },
        {
          id: 2,
          title: 'The most innovative things happening in coffee',
          date: 'Mar 19',
          commentCount: 24,
          shareCount: 12,
        },
      ]
    })

    return { categories }
  },
}
</script>
<style scoped>
  svg {
      color : #fff;
  }
</style>
