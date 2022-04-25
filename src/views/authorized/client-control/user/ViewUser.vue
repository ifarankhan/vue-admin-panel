<template>
 <confirmDeleteDialog
  v-if="showDialog"
  @closeDialog="showDialog = false"
  topHeaderText="User"
  :name="userDetailsList && userDetailsList.firstName"
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
          <TabList class="flex bg-blue-900/20 rounded-xl">
            <Tab as="template" v-slot="{ selected }">
              <button
                  @click="$store.commit('clientControl/setActiveTabeForEdit',0)"
                  :class="[
                    'block text-lg sm:py-3 md:py-4 font-bold text-black active mr-3 hover:text-psytechBlueBtHover focus:outline-none sm:px-2.5 sm:py-2',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
              >
                {{ $t('User Details') }}
              </button>
            </Tab>
              <Tab as="template" v-slot="{ selected }" v-if="userTyp != 1 && userTyp != 4">
                <button
                    @click="$store.commit('clientControl/setActiveTabeForEdit',1)"
                    :class="[
                    'block px-6 py-4 sm:px-4 sm:py-3 font-bold text-lg text-black mr-3 active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  {{ $t('Trainings')}}
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                    @click="$store.commit('clientControl/setActiveTabeForEdit',2)"
                    :class="[
                    'block px-6 py-4 sm:px-4 sm:py-3 font-bold text-lg mr-3 text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  {{ $t('Assessments') }}
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                    @click="$store.commit('clientControl/setActiveTabeForEdit',3)"
                    :class="[
                    'block px-6 py-4 sm:px-4  sm:py-3 font-bold text-lg mr-3 text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  {{ $t('Credit Control') }}
                </button>
              </Tab>
          </TabList>
        </div>

         <div
            class="flex items-center justify-center w-1/2 ml-3 calender sm:ml-3 flex-shrink-1 lg:ml-1"
          >
            <div
              class="flex items-center mr-10 cursor-pointer hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1"
              @click="$router.push({ name: 'client-control-edit-user' })"
              v-if="!userData.isMasterPanelUser"
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
           <template v-if="!ismasterUser">
            <div
              class="flex items-center hover:text-psytechBlueBtHover div-hover sm:text-sm"
              @click="showDialog = true"
              v-if="!userData.isMasterPanelUser"
            >
              <span class="p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="18.427"
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
           </template>

          </div>
      </div>
      <div class="p-2 mt-20">
        <TabPanels>
          <TabPanel>
            <div class="flex user-details-listing" v-if="userDetailsList">
              <div class="grid w-6/12 grid-cols-2 gap-8">
               <template v-if="!ismasterUser">
                 <div class="font-bold">User type:</div>
                 <div>{{userTypes[userDetailsList.userType]}}</div>
               </template>
                <div class="font-bold">User Status:</div>
                <div>{{ userDetailsList.activated?"Active":"In-Active" }}</div>
                <div class="font-bold">Name:</div>
                <div>{{userDetailsList.firstName}}</div>
                <div class="font-bold">User Name/ Email Address:</div>
                <div>{{userDetailsList.username}}</div>
                <template v-if="userDetailsList.sharedCreditUserEmail">
                  <div class="font-bold">Supervisor:</div>
                  <div>{{userDetailsList.sharedCreditUserEmail}}</div>
                </template>
                <div class="font-bold">Pin:</div>
                <div>{{userDetailsList.pin}}</div>
                <div class="col-span-2 font-bold mb-0.5">Receive Email Notifications</div>
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
              <div class="w-6/12 " style="text-align: -webkit-center;">
                <span class="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 36 36">
                    <g id="Group_36687" data-name="Group 36687" transform="translate(-1443 -5)">
                      <path id="Path_145" data-name="Path 145" d="M18,0A18,18,0,1,1,0,18,18,18,0,0,1,18,0Z" transform="translate(1443 5)" fill="#f2f2f2"/>
                      <g id="Group_512" data-name="Group 512" transform="translate(1452.474 12.579)">
                        <g id="Group_511" data-name="Group 511" transform="translate(0)">
                          <circle id="Ellipse_23" data-name="Ellipse 23" cx="4.093" cy="4.093" r="4.093" transform="translate(4.436)" fill="#ddd"/>
                          <path id="Path_146" data-name="Path 146" d="M447.424,2826.3c0,2.872-3.818,4-8.528,4s-8.529-1.125-8.529-4,3.818-8.031,8.529-8.031S447.424,2823.434,447.424,2826.3Z" transform="translate(-430.367 -2809.458)" fill="#ddd"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div class="user-details-listing" v-else>
              <p>No data available for this user</p>
            </div>

          </TabPanel>
          <TabPanel v-if="userTyp != 1 && userTyp != 4">
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
              <div class="user-details-listing" v-else>
              <p>No data available for this user</p>
            </div>
             <div class="pt-2 training-provider" v-if="userDetailsList?.trainingLevelOther">
               <h3 class="font-bold">Other:</h3>
               <p>{{userDetailsList?.trainingLevelOther}}</p>
             </div>
             <div class="pt-2 training-provider">
               <h3 class="font-bold">Training Provider:</h3>
               <div class="flex image">
                <div>
                  <img class="inline-block w-10 h-10 mr-1 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                 <div class="pl-3">
                   <div class="font-semibold">{{ userDetailsList?.trainingProvider?userDetailsList?.trainingProvider:"No Data"}}</div>
                   <div class="text-gray-500">Training Title</div>
                 </div>
               </div>
             </div>
             <div class="pt-2 training-provider" v-if="userDetailsList?.trainingYear">
               <h3 class="font-bold">Year of Training:</h3>
               <div class="year">
                 <span class="flex items-center justify-center h-8 p-2 text-white bg-black rounded rounded-full w-36">
                    {{userDetailsList.trainingYear}}
                 </span>
               </div>
             </div>
             <div class="pt-2 training-provider" v-if="userDetailsList?.trainingNotes">
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
            <!-- {{ userTests.length }} {{ userBatteries.length }} {{ userSolutions.length }} -->
            <div class="w-11/12 view-assessments" v-if="userTests?.length || userBatteries?.length || userSolutions?.length">
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
             <div class="user-details-listing" v-else>
              <p>No data available for this user</p>
            </div>
          </TabPanel>
          <TabPanel>
            <div class="w-11/12 credit-control">
              <div class="grid w-6/12 grid-cols-2 gap-8">
                <div class="col-span-2 font-bold" >
                  Credit Control:
                </div>
                <div class="flex col-span-2">
                  <div class="w-full -ml-2">
                    <field label="Available Credit" labelFor="credit">
                      <control
                          :disabled="true"
                          v-model="creditControl.credits"
                          placeholder=" "
                      />
                    </field>
                  </div>
                  <div class="w-full">
                  <psytech-button
                    @buttonWasClicked="toggleCredits = true"
                    :smallText="true"
                    label="Edit Credits"
                    type="outline"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </psytech-button>
            </div>
                </div>


        <div
          class="w-8/12 col-span-2 rounded-md bg-psytechLightGray"
          v-if="toggleCredits"
        >
            <field label="Update Amount" labelFor="update-amount">
              <control v-model="updateCredit.credits" placeholder=" " maxlength="4" />
            </field>

            <field label="Purchase Note" labelFor="purchaseNote">
              <control
                type="textarea"
                v-model="updateCredit.purchaseId"
                placeholder=" "
              />
            </field>

          <div class="mb-2 ml-3">
            <error-span :error="v$.credits"></error-span>
          </div>
        </div>
       <div class="w-8/12 col-span-2 -mt-6" v-if="toggleCredits">
        <psytech-button
          label="Update"
          type="black"
          @buttonWasClicked="updateCreditMethod"
        ></psytech-button>
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
import useVuelidate from "@vuelidate/core";
import confirmDeleteDialog from '@/components/DeleteDialog.vue';
import CheckRadioPicker from "@/components/CheckRadioPicker";
import AssessmentCollapsable from "@/components/AssessmentCollapsable";
import Control from "@/components/Control";
import Field from "@/components/Field";
import ErrorSpan from "@/components/ErrorSpan";
import PsytechButton from "@/components/PsytechButton";
import utility from "@/components/composition/utility";
import {
  numeric,
  helpers,
  maxValue
} from "@vuelidate/validators";

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
    PsytechButton,
    ErrorSpan,
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
    const userTyp = ref(0);
    const trannings = ref();
    const userTests = ref();
    const userBatteries = ref();
    const userSolutions = ref();
    const ismasterUser = ref(false);

    const updateCredit = reactive({
      credits: "",
      purchaseId: "",
    });

    const rules = computed(() => {
      return {
         credits: {
          numeric: helpers.withMessage("Numeric values are allowed", numeric),
          minValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            (val)=>{
              if(val ==0 || val  >=20){
                return true
              } else{
                return false
              }
            }
          ),
          maxValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            maxValue(1000)
          ),
        },
      }
    });

    const v$ = useVuelidate(rules, updateCredit);

    const toggleCredits = ref(false);
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
    const loadUserDetail = ()=>{
      store
          .dispatch("clientControl/getClientUserDetails")
          .then((res) => {
            let responseArray = res?.data?.data;
            user.value = responseArray;
            userDetailsList.value =  responseArray?.userDetails;
            userTyp.value = responseArray?.userDetails?.userType;
            trannings.value = responseArray?.userDetails?.trainingLevel;
            userTests.value = responseArray?.tests;
            userBatteries.value = [ ...responseArray?.defaultBatteries, ...responseArray?.customBatteries ];
            userSolutions.value = responseArray?.solutions;
            creditControl.credits = responseArray?.userDetails?.credits;
            creditControl.allowedToUpdateCredit = responseArray?.userDetails?.allowUpdateCredits;
            creditControl.updateLimit = responseArray?.userDetails?.creditLimit;
            ismasterUser.value = responseArray?.userDetails?.isMasterUser;
          })
          .catch((error) => {
            console.log("error is...");
          })
          .finally(()=>{
             loading.value = false;
      });
    }

    onMounted(() => {
      loading.value = true;
      loadUserDetail()
    });

    const selectedTrannings = computed(() => {
       trannings.value = trannings?.value?.split(',');
      return trainingArray.trainingObj.filter(val => trannings?.value?.includes(val.value));
    });

    const sendNotification = computed(()=>{
      return userDetailsList && userDetailsList.value.receiveSystemEmailNotifications?1:0
    })
    const deleteUserMethod = ()=>{
      showDialog.value = false
      loading.value = true;
      store
          .dispatch("clientControl/deleteUserAccount",{ accountId: userDetailsList.value.accountID, userId: userDetailsList.value.userID })
          .then((res) => {
            if(res?.data?.data?.deleted){
              store.commit("clientControl/setClientDetail", {
                decrementAccUser: true,
              });
              const { navigateTo } = utility("client-control-list-detail");
              navigateTo();
              // console.log("response is...",res.data.data)
            }
          })
          .catch((error) => {
          }).finally(()=>{
             loading.value = false;
      });
    }

  const updateCreditMethod = ()=>{

    if (v$.value.$validate() && v$.value.$error) {
        return true;
      }
      const data = {
        amount: +updateCredit.credits,
        currentCredits: creditControl.credits,
        updater: '',
        reference: updateCredit.purchaseId
      }
      loading.value = true
       store
          .dispatch("clientControl/updateIndCredit",data)
          .then((res) => {
            if(res?.data?.data?.updatedCredits){
              toggleCredits.value = false;
                updateCredit.credits = "";
                updateCredit.purchaseId = "";
            }
            loadUserDetail()
          })
          .catch((error) => {
          }).finally(()=>{
             loading.value = false;
      });

      // console.log("updateCredit", data)

      }
    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    });

    return {
      accountDetail,
      userTypes,
      formatDate,
      loading,
      user,
      updateCredit,
      toggleCredits,
      updateCreditMethod,
      v$,
      showDialog,
      userDetailsList,
      userTyp,
      selectedTrannings,
      sendNotification,
      userTests,
      userBatteries,
      userSolutions,
      collapsable,
      creditControl,
      ismasterUser,
      deleteUserMethod,
      userData
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
