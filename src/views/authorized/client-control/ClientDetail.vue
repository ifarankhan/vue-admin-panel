<template>
    <sticky-header>
      <div class="grid grid-cols-2 md:px-2">
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
        <div class="mr-12 place-self-end">
         <span class="text-sm font-semibold"> Creation Date:</span>  
        <span class="text-sm"> 10-05-2021 </span>
        </div>
      </div>
      
      <!-- tab section -->
    <!-- <div class="grid grid-cols-2 gap-x-0"> -->

    <!-- <div class="w-full px-2 pt-4 pb-16 ml-8 sm:px-0"> -->
    <div class="ml-4">
      <TabGroup>
     <div class="box-border flex border-b-2 md:pr-12">
       <div class="flex-shrink-0 w-1/3">
          <TabList class="flex space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
          as="template"
          v-slot="{ selected }"
        >
          <button
           :class="['block md:px-6 sm:px-4 sm:text-sm sm:py-3 ml-2 md:py-4 font-bold text-black active mr-8 hover:text-psytechBlueBtHover focus:outline-none sm:px-3 sm:py-2',
           selected ?'border-b-2 border-gray-400': 'border-0'
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
          :class="['block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
          selected ?'border-b-2 border-gray-400': 'border-0'
           ]"
          >
            Account Users (03)
          </button>
          
        </Tab>
      </TabList>
       </div>

       <div class="flex items-center justify-around w-2/3 ml-3 ml-5 sm:ml-3 flex-shrink-1 ml-28">
          <div class="flex items-center hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1">
              <span class="p-0.5 mr-0.5">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20.307" height="16.816" viewBox="0 0 21.307 17.816">
                  <g id="Group_36559" data-name="Group 36559" transform="translate(0.5 -0.611)">
                    <g id="Group_36447" data-name="Group 36447" transform="translate(52.209 -743.224)">
                      <path id="Path_13485" data-name="Path 13485" d="M.716,0H8.708c.017,0,4.919,5.027,4.887,5.029V16.1a.716.716,0,0,1-.716.716H.716A.716.716,0,0,1,0,16.1V.716A.716.716,0,0,1,.716,0Z" transform="translate(-45.498 744.335)" fill="#fff" stroke="#000" stroke-width="1"/>
                      <path id="Path_13486" data-name="Path 13486" d="M-12604.65-5155.7l.048,4.613s-.052.89,1.244.89h4.013" transform="translate(12567.491 5900.035)" fill="#fff" stroke="#000" stroke-width="1"/>
                    </g>
                    <rect id="Rectangle_3697" data-name="Rectangle 3697" width="12" height="9" transform="translate(1.176 4.62)" fill="#fff"/>
                    <path id="Path_13488" data-name="Path 13488" d="M9.819,0H0" transform="translate(0.37 9.139)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/>
                    <path id="Path_13487" data-name="Path 13487" d="M3578.488,178.133l-3.825,3.825,3.825,3.825" transform="translate(-3574.663 -172.868)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                  </g>
                </svg>

              </span>
              <span>
                 Export Account Activity
              </span>
          </div>
          
          <div class="flex items-center cursor-pointer hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1" @click="$router.push({name:'client-control-edit-client'})">
              <span class="p-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" width="16.379" height="16.379" viewBox="0 0 16.379 16.379">
                  <g id="Group_36470" data-name="Group 36470" transform="translate(-375.022 -3059.904)">
                    <g id="Group_36468" data-name="Group 36468" transform="translate(375.686 3060.406)">
                      <path id="Path_13490" data-name="Path 13490" d="M389.065,3066.208l-8.242,8.243-5.137,1.169,1.169-5.136,8.242-8.243,1.216-1.216a1.64,1.64,0,0,1,2.263-.279l1.983,1.985a1.638,1.638,0,0,1-.277,2.261Z" transform="translate(-375.686 -3060.406)" fill="none" stroke="#2a2a2a" stroke-width="1"/>
                      <line id="Line_315" data-name="Line 315" x2="3.677" y2="3.677" transform="translate(9.562 1.974)" fill="#fff" stroke="#2a2a2a" stroke-width="1"/>
                      <line id="Line_316" data-name="Line 316" x2="3.677" y2="3.677" transform="translate(8.074 3.462)" fill="#fff" stroke="#2a2a2a" stroke-width="1"/>
                      <path id="Path_13491" data-name="Path 13491" d="M377.819,3074.535a4.344,4.344,0,0,0,3.969,3.967" transform="translate(-376.344 -3064.764)" fill="none" stroke="#2a2a2a" stroke-width="1"/>
                    </g>
                  </g>
                </svg>
              </span>
              <span>
                 Edit Account
              </span>
          </div>
          
         <div class="flex items-center hover:text-psytechBlueBtHover div-hover sm:text-sm">
              <span class="p-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16.427" viewBox="0 0 19 18.427">
                <g id="Group_36445" data-name="Group 36445" transform="translate(-459.764 -2813.831)">
                  <line id="Line_307" data-name="Line 307" x2="18" transform="translate(460.264 2816.206)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/>
                  <rect id="Rectangle_3696" data-name="Rectangle 3696" width="5.613" height="1.727" transform="translate(466.422 2813.831)"/>
                  <path id="Path_13069" data-name="Path 13069" d="M472.953,2830.47H462.884l-.725-15.03h11.67Z" transform="translate(1.516 1.287)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                  <line id="Line_308" data-name="Line 308" x2="0.489" y2="10.272" transform="translate(467.081 2819.192)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/>
                  <line id="Line_309" data-name="Line 309" x1="0.489" y2="10.272" transform="translate(471.44 2819.192)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"/>
                </g>
              </svg>
              </span>
              <span>
                 Delete Account
              </span>
          </div>
       </div>
     </div>
      
     <TabPanel>
        <div class="flex p-4 md:mt-6">
          <div class="w-2/3">
            <div class="ml-1 font-bold text-medium">
                Account Details
            </div>
            <div class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200">
             {{ accountDetail?.accountDescription??'' }}
            </div>

            <div class="ml-1 font-bold text-medium md:mt-6">
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
import store from '../../../store/index';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
export default {
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters['clientControl/getClientDetail'];
    if(!accountDetail){
      next({name: 'list-page'})
    }
    next()
  },
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
  .div-hover:hover svg path, .div-hover:hover svg line {
    stroke: #008ac0;
    color: #008ac0;
  }
</style>
