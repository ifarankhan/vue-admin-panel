<template>
    <sticky-header>
      <div class="grid grid-cols-2">
        <div class="flex items-center ml-8">
          <div class="flex items-center justify-center w-8 h-8 text-white bg-black rounded rounded-full cursor-pointer" @click="$router.push({name:'list-page'})">
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
    <!-- <div class="grid grid-cols-2 gap-x-0"> -->

    <!-- <div class="w-full px-2 pt-4 pb-16 ml-8 sm:px-0"> -->
    <div class="ml-4">
      <TabGroup>
     <div class="flex">
       <div class="flex-shrink-0 w-1/3">
          <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
          as="template"
          v-slot="{ selected }"
        >
          <button
           :class="['block px-6 ml-2 py-4 font-bold text-black active mr-8 hover:text-blue-500 focus:outline-none',
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
      </TabList>
       </div>

       <div class="flex items-center justify-around w-2/3 ml-3 ml-5 flex-shrink-1 ml-28">
          <div class="flex items-center">
              <span class="p-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
              </span>
              <span>
                 Export Account Activity
              </span>
          </div>
          
          <div class="flex items-center cursor-pointer" @click="$router.push({name:'client-control-edit-client'})">
              <span class="p-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </span>
              <span>
                 Edit Account
              </span>
          </div>
          
         <div class="flex items-center">
              <span class="p-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
              </span>
              <span>
                 Delete Account
              </span>
          </div>
       </div>
     </div>
      
     <TabPanel>
        <div class="flex p-4">
          <div class="w-2/3">
            <div class="ml-1 font-bold text-medium">
                Account Details
            </div>
            <div class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200">
             {{ accountDetail?.accountDescription??'' }}
            </div>

            <div class="ml-1 font-bold text-medium">
                Account Address
            </div>
            <div class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200">
                {{ accountDetail?.accountAddres??'' }}
            </div>
        </div>
      <div class="w-1/3">
          <!-- IMAGE WILL COME HERE -->
      </div>
    </div>
            </TabPanel>
            
    </TabGroup>
    </div>
  
    </sticky-header>
</template>

<script>
import { ref, computed } from 'vue';
import StickyHeader from "@/components/StickyHeader";
import { useStore } from "vuex";
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
    const store = useStore();
    const accountDetail = computed(()=>{
      return store.getters['clientControl/getClientDetail']
    })
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

    return { categories, accountDetail }
  },
}
</script>
<style scoped>

</style>
