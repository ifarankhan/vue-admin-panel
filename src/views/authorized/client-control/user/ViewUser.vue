<template>
  <sticky-header>
    <div class="grid grid-cols-2 md:px-2">
      <div class="flex items-center ml-8">
        <div
            class="flex items-center justify-center w-8 h-8 text-white bg-black rounded rounded-full cursor-pointer "
            @click="$router.push({ name: 'client-control-list-detail' })"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div class="w-2/5 ml-3 font-bold truncate text-medium">{{ accountDetail && accountDetail.accountName }} </div>
      </div>
      <div class="mr-12 place-self-end">
        <span class="text-sm font-semibold"> Creation Date: </span>
        <span class="text-sm"> {{ accountDetail && accountDetail.creationDate?formatDate(accountDetail.creationDate):'' }} </span>
      </div>
      <div class="pt-6 pl-20 text-xl">
        <h2>Master Account user </h2>
      </div>
    </div>
  </sticky-header>
  <div class="pt-6 pl-20">
    <Loader v-if="loading" :toBeBigger="true" />
    <TabGroup>
      <div class="box-border flex border-b-2 md:pr-12 lg:pr-0">
        <div class="flex-shrink-0" id="export_account">
          <TabList class="flex space-x-1 bg-blue-900/20 rounded-xl">
            <Tab as="template" v-slot="{ selected }">
              <button
                  :class="[
                    'block sm:text-sm sm:py-3 md:py-4 font-bold text-black active mr-8 hover:text-psytechBlueBtHover focus:outline-none sm:px-3 sm:py-2',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
              >
                {{ $t('User Details') }}
              </button>
            </Tab>
            <Tab as="template" v-slot="{ selected }">
              <button
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
              >
                {{ $t('Trainings') }}
              </button>
            </Tab>
            <Tab as="template" v-slot="{ selected }">
              <button
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
              >
                {{ $t('Assessments') }}
              </button>
            </Tab>
            <Tab as="template" v-slot="{ selected }">
              <button
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
              >
                {{ $t('Credit Control') }}
              </button>
            </Tab>
          </TabList>
        </div>

         <div
            class="flex items-center justify-end w-1/2 ml-3 calender sm:ml-3 flex-shrink-1 lg:ml-28"
          >
            <div
              class="flex items-center mr-10 cursor-pointer hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1"
              @click="$router.push({ name: 'client-control-edit-user' })"
            >
              <span class="p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.379"
                  height="16.379"
                  viewBox="0 0 16.379 16.379"
                >
                  <g
                    id="Group_36470"
                    data-name="Group 36470"
                    transform="translate(-375.022 -3059.904)"
                  >
                    <g
                      id="Group_36468"
                      data-name="Group 36468"
                      transform="translate(375.686 3060.406)"
                    >
                      <path
                        id="Path_13490"
                        data-name="Path 13490"
                        d="M389.065,3066.208l-8.242,8.243-5.137,1.169,1.169-5.136,8.242-8.243,1.216-1.216a1.64,1.64,0,0,1,2.263-.279l1.983,1.985a1.638,1.638,0,0,1-.277,2.261Z"
                        transform="translate(-375.686 -3060.406)"
                        fill="none"
                        stroke="#2a2a2a"
                        stroke-width="1"
                      />
                      <line
                        id="Line_315"
                        data-name="Line 315"
                        x2="3.677"
                        y2="3.677"
                        transform="translate(9.562 1.974)"
                        fill="#fff"
                        stroke="#2a2a2a"
                        stroke-width="1"
                      />
                      <line
                        id="Line_316"
                        data-name="Line 316"
                        x2="3.677"
                        y2="3.677"
                        transform="translate(8.074 3.462)"
                        fill="#fff"
                        stroke="#2a2a2a"
                        stroke-width="1"
                      />
                      <path
                        id="Path_13491"
                        data-name="Path 13491"
                        d="M377.819,3074.535a4.344,4.344,0,0,0,3.969,3.967"
                        transform="translate(-376.344 -3064.764)"
                        fill="none"
                        stroke="#2a2a2a"
                        stroke-width="1"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              <span> Edit User </span>
            </div>
            <div
              class="flex items-center hover:text-psytechBlueBtHover div-hover sm:text-sm"
            >
              <span class="p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16.427"
                  viewBox="0 0 19 18.427"
                >
                  <g
                    id="Group_36445"
                    data-name="Group 36445"
                    transform="translate(-459.764 -2813.831)"
                  >
                    <line
                      id="Line_307"
                      data-name="Line 307"
                      x2="18"
                      transform="translate(460.264 2816.206)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-width="1"
                    />
                    <rect
                      id="Rectangle_3696"
                      data-name="Rectangle 3696"
                      width="5.613"
                      height="1.727"
                      transform="translate(466.422 2813.831)"
                    />
                    <path
                      id="Path_13069"
                      data-name="Path 13069"
                      d="M472.953,2830.47H462.884l-.725-15.03h11.67Z"
                      transform="translate(1.516 1.287)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <line
                      id="Line_308"
                      data-name="Line 308"
                      x2="0.489"
                      y2="10.272"
                      transform="translate(467.081 2819.192)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-width="1"
                    />
                    <line
                      id="Line_309"
                      data-name="Line 309"
                      x1="0.489"
                      y2="10.272"
                      transform="translate(471.44 2819.192)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-width="1"
                    />
                  </g>
                </svg>
              </span>
              <span> Delete User </span>
            </div>
            
          </div>
      </div>
      <div class="p-2">
        <TabPanels>
          <TabPanel>
            <div class="user-details-listing" v-if="user">
              <div class="grid w-6/12 grid-cols-2 gap-4">
                <div class="font-bold">User type:</div>
                <div>{{userDetails.userType}}</div>
                <div class="font-bold">User Status:</div>
                <div>{{userDetails.activated}}</div>
                <div class="font-bold">Name:</div>
                <div>{{userDetails.firstName}}</div>
                <div class="font-bold">User Name/ Email Address:</div>
                <div>{{userDetails.username}}</div>
                <div class="font-bold">Pin:</div>
                <div>{{userDetails.pin}}</div>
                <div class="col-span-2 font-bold">Receive Email Notifications</div>
                <div class="col-span-2">Yes No</div>
              </div>
            </div>

          </TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
          <TabPanel>Content 4</TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  </div>

</template>
<script>
import { onMounted, ref, computed} from "vue";
import store from "@/store/index";
import {useStore} from "vuex";
import StickyHeader from "@/components/StickyHeader";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Button from 'primevue/button';
import { useClientUser } from "@/components/composition/clientHelper.js";
import Loader from "@/components/Loader.vue";

export default {
  components:{
    StickyHeader,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    Loader
  },
  name: "client-control-view-user",
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters["clientControl/getClientDetail"];
    const userDetails = store.getters["clientControl/getClientUserDetail"];
    if (!accountDetail) {
      next({ name: "list-page" });
    }
    if (!userDetails) {
      next({ name: "client-control-list-detail" });
    }
    next();
  },
  setup(){
    const { userTypes, formatDate } = useClientUser();
    const user = ref();
    const userDetails = ref();
    const store = useStore();
    let loading = ref();
    const accountDetail = computed(() => {
      return store.getters["clientControl/getClientDetail"];
    });
    onMounted(() => {
      loading.value = true;
      store
          .dispatch("clientControl/getClientUserDetails")
          .then((res) => {
            let responseArray = res?.data?.data;
            user.value = responseArray;
            userDetails.value =  responseArray?.userDetails;
            loading.value = false;
          })
          .catch((error) => {
            console.log("error is...", error);
          });
    });

  
    return {accountDetail, userTypes, formatDate,loading,user,userDetails}
  }
}
</script>
