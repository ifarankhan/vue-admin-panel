<template>
 <confirmDeleteDialog
  v-if="showDialog"
  @closeDialog="showDialog = false"
  :accountName="accountDetail && accountDetail.accountName"
  @dialogConfirmed="deleteUserMethod()" />

  <Loader v-if="loader" :toBeBigger="true" />

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
        <h2 v-if="userDetailsList?.isMasterUser">Master Account user </h2>
        <h2 v-else>Account user </h2>
      </div>
    </div>
  </sticky-header>
  <div class="pt-6 pl-20">
    <Loader v-if="loading" :toBeBigger="true" />
    <TabGroup>
      <div class="box-border flex border-b-2 md:pr-12 lg:pr-0 tab-headers">
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
            class="flex items-center justify-center w-1/2 ml-3 calender sm:ml-3 flex-shrink-1 lg:ml-28"
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
              @click="showDialog = true"
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
      <div class="p-2 mt-20">
        <TabPanels>
          <TabPanel>
            <div class="user-details-listing" v-if="userDetailsList">
              <div class="grid w-6/12 grid-cols-2 gap-4">
                <div class="font-bold">User type:</div>
                <div>{{userTypes[userDetailsList.userType]}}</div>
                <div class="font-bold">User Status:</div>
                <div>{{ userDetailsList.activated?"Active":"In-Active" }}</div>
                <div class="font-bold">Name:</div>
                <div>{{userDetailsList.firstName}}</div>
                <div class="font-bold">User Name/ Email Address:</div>
                <div>{{userDetailsList.username}}</div>
                <div class="font-bold">Pin:</div>
                <div>{{userDetailsList.pin}}</div>
                <div class="col-span-2 font-bold">Receive Email Notifications</div>
                <div class="col-span-2" >
                  <div class="flex justify-between w-4/12 pl-2">
                    <check-radio-picker
                        name="send-notification"
                        v-model="sendNotification"
                        type="radio"
                        :options="{ [1]: 'Yes' }"
                        :disabled="true"
                    />
                    <check-radio-picker
                        name="send-notification"
                        v-model="sendNotification"
                        type="radio"
                        :options="{ [0]: 'No' }"
                        :disabled="true"
                    />
                  </div>

                 </div>
              </div>
            </div>
            <div class="user-details-listing" v-else>
              <p>No data available for this user</p>
            </div>

          </TabPanel>
          <TabPanel>
            <div class="w-2/3">
           <div class="flex flex-col space-y-8">
             <div class="user-details-trainings" v-if="selectedTrannings">
               <!--  -->
               <div class="pt-2">
                 <div v-for="(item, index) in selectedTrannings" :key="index" class="mb-1.5 mt-1.5">
                   <div class="grid grid-rows-2 gap-2 mt-1 overflow-hidden auto-cols-auto">
                     <div class="w-4 col-span-1 row-span-2 pt-1 box">
                        <span class="flex items-center justify-center w-6 h-6 p-2 text-white bg-black rounded rounded-full">
                          {{index+1}}
                        </span>
                     </div>
                     <div class="col-span-8 col-start-2 pt-1 font-bold box"><p>{{ item.text }}</p></div>
                     <div class="col-span-8 col-start-2 box"><p>{{ item.description }}</p></div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="pt-2 training-provider">
               <h3 class="font-bold">Training Provider:</h3>
               <div class="flex image">
                <div>
                  <img class="inline-block w-10 h-10 mr-1 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                 <div class="pl-3">
                   <div class="font-semibold">{{ userDetailsList.trainingProvider?userDetailsList.trainingProvider:"No Data"}}</div>
                   <div class="text-gray-500">Training Title</div>
                 </div>
               </div>
             </div>
             <div class="pt-2 training-provider" v-if="userDetailsList.trainingYear">
               <h3 class="font-bold">Year of Training:</h3>
               <div class="year">
                 <span class="flex items-center justify-center h-8 p-2 text-white bg-black rounded rounded-full w-36">
                    {{userDetailsList.trainingYear}}
                 </span>
               </div>
             </div>
             <div class="pt-2 training-provider" v-if="userDetailsList.trainingNotes">
               <h3 class="font-bold">Details of the Training:</h3>
               <div class="details-of-training">
                 <div class="w-11/12 h-24 p-4 mt-2 mb-4 text-justify bg-gray-200 border border-gray-400 rounded-md" style="overflow-wrap: break-word;">
                   {{userDetailsList.trainingNotes}}
                 </div>
               </div>
             </div>
           </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="w-11/12 view-assessments">
              <!-- Tests -->
              <assessment-collapsable
                :user-data="userTests"
                :collapsable="collapsable.tests"
                divider-label="Tests"
                ></assessment-collapsable>
               <!-- Batteries -->
              <assessment-collapsable
                :user-data="userBatteries"
                :collapsable="collapsable.batteries"
                divider-label="Batteries"
                isBatteries="true"
                ></assessment-collapsable>
              <!-- Solutions -->
              <assessment-collapsable
                  :user-data="userSolutions"
                  :collapsable="collapsable.solutions"
                  divider-label="Solutions"
                  isBatteries="true"
              ></assessment-collapsable>

            </div>
          </TabPanel>
          <TabPanel>
            <div class="w-11/12 credit-control">
              <div class="grid w-6/12 grid-cols-2 gap-4">
                <div class="col-span-2 font-bold" >
                  Credit Control:
                </div>
                <div class="col-span-2" >
                  <div class="w-full">
                    <field label="Available Credit" labelFor="credit">
                      <control
                          :disabled="true"
                          v-model="creditControl.credits"
                          placeholder=" "
                      />
                    </field>
                  </div>
                </div>
                <div class="font-bold">Allowed to Update Credits:</div>
                <div>{{creditControl.allowUpdateCredits?"Yes":"No"}}</div>
                <div class="font-bold">Monthly Update Limit:</div>
                <div>{{creditControl.updateLimit}}</div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  </div>

</template>
<script>
import { onMounted, ref, computed,reactive} from "vue";
import store from "@/store/index";
import {useStore} from "vuex";
import StickyHeader from "@/components/StickyHeader";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Button from 'primevue/button';
import { useClientUser } from "@/components/composition/clientHelper.js";
import Loader from "@/components/Loader.vue";
import {colorsBorders, colorsText} from "@/colors";
import confirmDeleteDialog from '@/components/DeleteDialog.vue';
import CheckRadioPicker from "@/components/CheckRadioPicker";
import AssessmentCollapsable from "@/components/AssessmentCollapsable";
import Control from "@/components/Control";
import Field from "@/components/Field";
import utility from "@/components/composition/utility";

export default {
  components:{
    StickyHeader,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    Loader,
    CheckRadioPicker,
    AssessmentCollapsable,
    Control,
    Field,
    confirmDeleteDialog
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
    const { userTypes, formatDate, trainingArray } = useClientUser();
    const user = ref();
    const userDetailsList = ref();
    const trannings = ref();
    const userTests = ref();
    const userBatteries = ref();
    const userSolutions = ref();
    const creditControl = reactive({
      credits: 0,
      allowedToUpdateCredit: false,
      updateLimit: 0,
    });
    const store = useStore();
    let loading = ref();
    const collapsable = reactive({
      tests: true,
      batteries: true,
      solutions: true,
    });
    let showDialog = ref(false);

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
            userDetailsList.value =  responseArray?.userDetails;
            trannings.value = responseArray?.userDetails?.trainingLevel;
            userTests.value = responseArray?.tests;
            userBatteries.value = [ ...responseArray?.defaultBatteries, ...responseArray?.customBatteries ];
            userSolutions.value = responseArray?.solutions;
            creditControl.credits = responseArray?.userDetails?.credits;
            creditControl.allowedToUpdateCredit = responseArray?.userDetails?.allowUpdateCredits;
            creditControl.updateLimit = responseArray?.userDetails?.creditLimit;
            loading.value = false;
          })
          .catch((error) => {
            console.log("error is...", error.message);
          });

    });

    const selectedTrannings = computed(() => {
       trannings.value = trannings.value.split(',');
      return trainingArray.filter(val => trannings.value.includes(val.value));
    });

    const sendNotification = computed(()=>{
      return userDetailsList && userDetailsList.value.receiveSystemEmailNotifications?1:0
    })
    const deleteUserMethod = ()=>{
      loading.value = true;
      store
          .dispatch("clientControl/deleteUserAccount")
          .then((res) => {
            if(res?.data?.data?.deleted){
              showDialog.value = false
              const { navigateTo } = utility("client-control-view-user");
              navigateTo();
              // console.log("response is...",res.data.data)
            }
          })
          .catch((error) => {
            console.log("error is...", error);
          }).finally(()=>{
        loading.value = false;
      });
    }
    return {
      accountDetail,
      userTypes,
      formatDate,
      loading,
      user,
      userDetailsList,
      selectedTrannings,
      sendNotification,
      userTests,
      userBatteries,
      userSolutions,
      collapsable,
      creditControl,
      deleteUserMethod
    }

  }
}
</script>
<style>
.tab-headers{
  position: fixed;
  background: white;
  width: calc(100% - 150px);
  justify-content: space-between;
}
</style>
