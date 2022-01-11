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
      </div>
      <div class="p-2">
        <TabPanels>
          <TabPanel>
            <div class="user-details-listing" v-if="user">
              <div class="grid grid-cols-2 gap-4 w-6/12">
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
            console.log(userDetails)
            loading.value = false;
          })
          .catch((error) => {
            console.log("error is...", error);
          });
    });

    const formatDate = (value) => {
      return new Date(value).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }
    return {accountDetail,formatDate,loading,user,userDetails}
  }
}
</script>
