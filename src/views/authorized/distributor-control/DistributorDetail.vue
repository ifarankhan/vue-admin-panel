<template>
  <!-- <sticky-header> -->
  <Loader v-if="loader" :toBeBigger="true" />

<div class="pt-10">
      <div class="grid grid-cols-2 md:px-2">
      <div class="flex items-center ml-8">
        <div
          class="flex items-center justify-center text-white bg-black rounded rounded-full cursor-pointer w-9 h-9 "
          @click="$store.commit('clientControl/setUsersTablePag',null),$router.push({ name: 'distributors-list' })"
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
        <div class="w-2/5 ml-3 font-bold truncate text-medium">{{ accountDetail && accountDetail.name }} </div>
      </div>
      <!-- <div class="mr-12 place-self-end">
        <span class="text-sm font-semibold"> Creation Date: </span>
        <span class="text-sm"> {{ accountDetail && accountDetail.creationDate?formatDate(accountDetail.creationDate):'' }} </span>
      </div> -->
    </div>

    <!-- tab section -->
    <!-- <div class="grid grid-cols-2 gap-x-0"> -->

    <!-- <div class="w-full px-2 pt-4 pb-16 ml-8 sm:px-0"> -->
    <div class="ml-4">
      <TabGroup :defaultIndex="($store.getters['clientControl/getUsersTablePag']) || ($store.getters['clientControl/getIsNewUser'])?1:0">
        <div class="box-border flex border-b-2 md:pr-12 lg:pr-0">
          <div class="flex-shrink-0 w-1/2" id="export_account">
            <TabList class="flex space-x-1 bg-blue-900/20 rounded-xl">
              <Tab as="template" v-slot="{ selected }">
                <button
                  :class="[
                    'block md:px-6 sm:px-4 sm:text-sm sm:py-3 ml-2 md:py-4 font-bold text-black active mr-8 hover:text-psytechBlueBtHover focus:outline-none sm:px-3 sm:py-2',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Distributor Account Details
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Distributor's Clients ({{ customers?.length??0 }})
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                    :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Credit Settings
                </button>
              </Tab>
            </TabList>
          </div>

          <div
            class="flex items-center justify-around w-1/2 ml-3 mr-10 calender sm:ml-3 flex-shrink-1 lg:ml-28"
          >
            <div
              class="flex items-center pb-1 hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1"
              @click="showCalender"
            >
              <span class="p-0.5 pb-1 mr-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.307"
                  height="18.816"
                  viewBox="0 0 21.307 17.816"
                >
                  <g
                    id="Group_36559"
                    data-name="Group 36559"
                    transform="translate(0.5 -0.611)"
                  >
                    <g
                      id="Group_36447"
                      data-name="Group 36447"
                      transform="translate(52.209 -743.224)"
                    >
                      <path
                        id="Path_13485"
                        data-name="Path 13485"
                        d="M.716,0H8.708c.017,0,4.919,5.027,4.887,5.029V16.1a.716.716,0,0,1-.716.716H.716A.716.716,0,0,1,0,16.1V.716A.716.716,0,0,1,.716,0Z"
                        transform="translate(-45.498 744.335)"
                        fill="#fff"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_13486"
                        data-name="Path 13486"
                        d="M-12604.65-5155.7l.048,4.613s-.052.89,1.244.89h4.013"
                        transform="translate(12567.491 5900.035)"
                        fill="#fff"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                    <rect
                      id="Rectangle_3697"
                      data-name="Rectangle 3697"
                      width="12"
                      height="9"
                      transform="translate(1.176 4.62)"
                      fill="#fff"
                    />
                    <path
                      id="Path_13488"
                      data-name="Path 13488"
                      d="M9.819,0H0"
                      transform="translate(0.37 9.139)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-width="1"
                    />
                    <path
                      id="Path_13487"
                      data-name="Path 13487"
                      d="M3578.488,178.133l-3.825,3.825,3.825,3.825"
                      transform="translate(-3574.663 -172.868)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                  </g>
                </svg>
              </span>
              <span> Export Account Activity </span>
              <span class="drop-icon ml-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 10 6">
                  <path id="Polygon_11" data-name="Polygon 11" d="M5,0l5,6H0Z" transform="translate(10 6) rotate(180)" fill="#707070"/>
                </svg>
              </span>
                <Calendar v-if="calenderValue" v-model="dates2" selectionMode="range"  ref="cf">
                  <template #footer>
                    <div @click="closeCalendar" class="export-btn" :class="(dates2?.length == 2 && dates2[1] !=null) ?'' : 'export-deactivate'">Export</div>
                  </template>
                </Calendar>
            </div>

            <div
              class="flex items-center cursor-pointer hover:text-psytechBlueBtHover div-hover sm:text-sm sm:pa-1"
              @click="$router.push({ name: 'distributor-control-list-edit' })"
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
              <span> Edit Account </span>
            </div>

          </div>
        </div>
        <div class="flex w-2/3 p-4 ml-3 md:mt-6" v-if="errorText">
          <div class="w-3/4">
            <error-alert
                @dismissError="errorText = ''"
                :error="errorText"
                :showTranslatedError="false"
            />
          </div>
        </div>
        <div class="flex w-2/3 p-4 ml-3 md:mt-6" v-if="successText">
          <div class="w-3/4">
            <success-alert
                @dismissError="successText = ''"
                :error="successText"
                :showTranslatedError="false"
            />
          </div>
        </div>
        <!-- <a v-show="true" :href="exportFileUrl" target="_self" @click="click" ref="exportFileRef">Download File</a> -->
        <TabPanel>
          <div class="flex p-4 md:mt-6">
            <div class="w-2/3">
              <div class="grid w-6/12 grid-cols-2 gap-8 pb-3">
                <div class="ml-1 font-bold text-medium">Display Name:</div>
                <div class="...">{{accountDetail?.displayName}}</div>
                <div class="ml-1 font-bold text-medium">Distributor Email:</div>
                <div class="...">{{accountDetail?.email}}</div>
                <div class="ml-1 font-bold text-medium">Account Password:</div>
                <div class="..."><span>******* </span><span><a href="#" @click="changePassword">Change Password</a></span> </div>
                <div class="ml-1 font-bold text-medium">Currency:</div>
                <div class="...">{{accountDetail?.invoiceCurrency}}</div>
                <div class="ml-1 font-bold text-medium">Status:</div>
                <div class="...">{{accountDetail?.active?"Active":"In-Active"}}</div>
                <div class="ml-1 font-bold text-medium">Country:</div>
                <div class="...">{{accountDetail?.country}}</div>
              </div>
              <div class="ml-1 font-bold text-medium md:mt-6">
                Account Address
              </div>
              <div
                class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200"
                style="word-wrap: break-word"
              >
                {{ accountDetail?.addressLine1 ?? ""}} {{ accountDetail?.addressLine2 ?? ""}} {{ accountDetail?.addressLine3 ?? ""}} {{ accountDetail?.addressLine4 ?? ""}} , {{ accountDetail?.city ?? ""}}
              </div>
            </div>
            <div class="w-1/3">
              <span>
                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="250" height="250" viewBox="0 0 36 36.136">
                              <defs>
                                <linearGradient id="linear-gradient" x1="0.5" x2="0.514" y2="0.628" gradientUnits="objectBoundingBox">
                                  <stop offset="0" stop-color="#103c58"/>
                                  <stop offset="1" stop-color="#455080"/>
                                </linearGradient>
                              </defs>
                              <g id="Group_36418" data-name="Group 36418" transform="translate(-1418.376 -241.376)">
                                <g id="Group_872" data-name="Group 872" transform="translate(1418 241)" opacity="0.114">
                                  <rect id="Rectangle_3484" data-name="Rectangle 3484" width="36" height="36" rx="5" transform="translate(0.376 0.376)" fill="url(#linear-gradient)"/>
                                  <path id="Path_12665" data-name="Path 12665" d="M230.322,838.457l2.2-2.2a2.7,2.7,0,0,1,4.1,0c2.149,2.195,9.61,9.029,9.61,9.029s0,6.022,0,6.028a2.37,2.37,0,0,1-.857,1.891Z" transform="translate(-209.857 -817.853)" fill="#7a8aaf"/>
                                  <path id="Path_12664" data-name="Path 12664" d="M200.984,838.69l9.634-9.107s2.331-2.5,4.527,0c.949,1.08,16.107,16.029,21.153,20.976a2.9,2.9,0,0,1-1.619.755H203.261a2.722,2.722,0,0,1-2.235-2.362Z" transform="translate(-200.608 -814.802)" fill="#cdd5e0"/>
                                  <ellipse id="Ellipse_595" data-name="Ellipse 595" cx="2.991" cy="2.778" rx="2.991" ry="2.778" transform="translate(23.932 5.556)" fill="#fff"/>
                                </g>
                              </g>
                            </svg>
                         </span>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
      <div class="flex justify-end mt-4 mr-8 xs:flex-col">
          <div>
            <div class="relative inline-block dropdown">
              <psytech-button
                label="Filter"
                type="outline"
                @buttonWasClicked="showFilters = !showFilters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </psytech-button>
              <ul
                class="absolute w-24 text-gray-700 bg-white rounded-md shadow top-14 -left-16 dropdown-menu"
                style="padding: 16px 15px;"
                id="filter-dropdown"
                v-if="showFilters"
                v-click-away="closeFilter"
              >
                <li class="flex">
                  <field
                    label="Name"
                    labelFor="account"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="accountName"
                      type="text"
                      id="name"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>
                  <select-option
                    :filterDropdown="filterDropdown"
                    v-model="selectedNameFilter"
                  ></select-option>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(accountName = ''), applyFilter()"
                    />
                  </div>
                </li>

                <li class="flex">
                  <field
                    label="Address"
                    labelFor="address"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="searchedaddress"
                      type="text"
                      id="address"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>

                  <select-option
                    :filterDropdown="filterDropdown"
                    v-model="selectedaddressFilter"
                  ></select-option>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedaddress = ''), applyFilter()"
                    />
                  </div>
                </li>

                <li class="flex">
                  <field
                    label="Users"
                    labelFor="users"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="searchedUsers"
                      type="text"
                      id="users"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>

                  <select-option
                    :filterDropdown="numberDropdown"
                    v-model="selectedUsersFilter"
                  ></select-option>

                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedUsers = ''), applyFilter()"
                    />
                  </div>
                </li>
                <li class="flex justify-between">
                  <div class="flex items-center justify-center ml-3">
                    <a
                      @click.prevent="clearFilter()"
                      class="text-xs font-semibold no-underline text-psytechBlue"
                      >Clear all</a
                    >
                  </div>
                  <psytech-button
                    label="Apply"
                    @buttonWasClicked="applyFilter()"
                  ></psytech-button>
                </li>
              </ul>
            </div>
          </div>

          <!-- search -->
          <div class="relative pt-2 text-gray-600">
            <input
              class="h-10 px-5 pr-16 font-bold text-gray-700 bg-white border-gray-300 rounded-full border-1 focus:outline-none focus:ring-psytechBlueBtHover"
              type="search"
              name="search"
              placeholder="Search..."
              v-model="searchText"
              @input="filteredMainMethod()"
            />
            <button type="submit" class="absolute top-0 right-0 mt-5 mr-4">
              <svg
                class="w-4 h-4 text-gray-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style="enable-background: new 0 0 56.966 56.966"
                xml:space="preserve"
                width="512px"
                height="512px"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
          <!-- end search -->
        </div>
  <div class="ml-5">
    <div class="mr-10 sticky-header-footer md:pr-12 lg:pr-0">
      <DataTable
          :customers="customers"
          :paginator="true"
          :rows="50"
          :rowHover="true"
          :loading="loading"
          :rowsPerPageOptions="[10, 25, 50]"
          @rowData="setClientDetail({data: $event})"
          @editItemWasClicked="redirectToEditClient($event)"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      />
    </div>
  </div>

        </TabPanel>

        <TabPanel>
          <div class="flex p-4 md:mt-6">
            <div class="w-2/3">
              <div class="ml-1 font-bold text-medium md:mt-6">
                Credit Control
              </div>
              <div
                  class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200"
                  style="word-wrap: break-word"
              >
                {{accountDetail?.transferableCredits}}
              </div>
              <div class="grid w-6/12 grid-cols-2 gap-8 pb-3">
                <div class="ml-1 font-bold text-medium">Last Credit Update:</div>
                <div class="...">{{accountDetail?.lastCreditUpdate}}</div>
                <div class="ml-1 font-bold text-medium">Credit Limit:</div>
                <div class="...">{{accountDetail?.transferableCreditLimit}}</div>
              </div>

            </div>
            <div class="w-1/3">
            </div>
          </div>
        </TabPanel>
      </TabGroup>
    </div>

</div>
  <!-- </sticky-header> -->
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import StickyHeader from "@/components/StickyHeader";
import PsytechButton from "@/components/PsytechButton";
import DataTable from "@/components/Table.vue";
import { useStore } from "vuex";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import SelectOption from "@/components/SelectOption.vue";
import _ from "lodash";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import IconSVG from "@/components/IconSVG.vue";
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Loader from "@/components/Loader.vue";
import store from "../../../store/index";
import ErrorAlert from "@/components/ErrorAlert.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";
import { useRouter } from "vue-router";
import { useClientUser } from "@/components/composition/clientHelper.js";

export default {
  beforeRouteEnter(to, from, next) {
    const distributorDetail = store.getters["clientControl/getClientDetail"];
    if (!distributorDetail) {
      next({ name: "distributors-list" });
    }
    next();
  },
  components: {
    StickyHeader,
    PsytechButton,
    DataTable,
    Field,
    Control,
    Calendar,
    Loader,
    Button,
    SelectOption,
    IconSVG,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ErrorAlert,
    SuccessAlert,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

   const customers = ref();
    let prevCustomers = ref();
    let prevSearched = ref();
    let searchText = ref("");
    let accountName = ref("");
    let searchedaddress = ref("");
    let searchedUsers = ref("");
    let selectStatus = ref("");
    let selectedNameFilter = ref("contains");
    let selectedaddressFilter = ref("contains");
    let selectedUsersFilter = ref("isEqualTo");
    let prevMainSearchHistry = ref("");

    let showFilters = ref(false);
    const closeFilter = () => {
      if (showFilters.value) {
        showFilters.value = false;
      }
    };

    const calenderValue = ref(false);
    const prevMonth = ref(-1);
    const exportFileUrl = ref("");
    const exportFileRef = ref("");
    const exportAccountData = ref(null);
    const dates2= ref(null);

    const userTablePagination = (store.getters['clientControl/getUsersTablePag']);

    const { formatDate, numberDropdown, filterDropdown, filterMethod, subFilter } = useClientUser();
    const scrollPosition = ref(null);
    let showDialog = ref(false);
    let showMasterDialog = ref(false);
    let loader = ref(false);
    let errorText = ref("");
    let successText = ref("");

    const click = (e)=>{
      e.stopPropagation()
    }

    const loadAllClients = ()=>{
      loading.value = true;
       store
        .dispatch("clientControl/getClientAccountForDistributor")
        .then((res) => {
          let responseArray = res?.data?.data;
          customers.value = responseArray;
          customers.value.forEach(
            (customer) => (
              (customer.date = new Date(customer.creationDate)),
              (customer.name = customer.accountName),
              (customer.address = customer.accountAddress),
              (customer.users = customer.numberOfUsers)
            )
          );
          prevCustomers.value = customers.value;
          loading.value = false;
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    }

    const changePassword = async ()=>{
      loader.value = true;
      let emailChange = accountDetail.value?.email?.split(";")[0];
      store.dispatch("masterPannel/initateChangePassword",{email: emailChange })
          .then((res) => {
            if (res?.status==200){
              successText.value = "Email has been sent to the primary email holder of this account!";
            }
          })
          .catch(error=>{
            errorText.value = error?.message ?? "";
          })
          .finally(()=>{
            loader.value = false;
          });
    }

    let cf = ref()

     const filteredMainMethod = () => {
      // var sortKey = this.sortKey
      let value = searchText.value && searchText.value.toLowerCase();
      // Search  field is blank but dropdown filters have value, JUST go for dropdown filters
      if (!searchText.value) {
        prevMainSearchHistry.value = [];
        applyFilter();
        return;
      }
      // fileds to be check for filters
      if (searchedUsers.value || accountName.value || searchedaddress.value) {
        const searchableFields = ["accountName string", "accountAddress string", "numberOfUsers number", "creationDate number"]
        customers.value = filterMethod(prevSearched.value,searchableFields,value)

        // customers.value = filterMethod(prevSearched.value, value);
      } else {
        // default, When no filters is applied
        const searchableFields = ["accountName string", "accountAddress string", "numberOfUsers number", "creationDate number"]
        customers.value = filterMethod(prevCustomers.value,searchableFields,value)

        // customers.value = filterMethod(prevCustomers.value, value);
        prevMainSearchHistry.value = customers.value;
      }
    };

    const showCalender = async ()=>{
      await (calenderValue.value = true);
      cf.value.overlayVisible = true;
    }



    const hideCalendar = ()=>{
      calenderValue.value = false;
    }
    const closeCalendar = ()=>{
      if((dates2.value?.length == 2 && dates2.value[1] ==null) ){
        return;
      };
      const { formatExportDate } = useClientUser();
      const data = {
        startDate: formatExportDate(dates2.value[0]),
        endDate: formatExportDate(dates2.value[1]),
        accountId: accountDetail.value?.accountId
      }
      cf.value.overlayVisible = false;
      loader.value = true;
    }

    const accountDetail = computed(() => {
      return store.getters["clientControl/getClientDetail"];
    });

    const userArray = ref();
    let loading = ref();
    let masterUser = ref();

    const updateScroll = ()=> {
      scrollPosition.value = window.scrollY
      let added = false;
      if(window.scrollY > 200 && !added){
        added = true;
        const tableHead = document.getElementsByClassName("p-datatable-thead")[0];
        const tableBody = document.getElementsByClassName("p-datatable-tbody")[0];

        if( !(tableHead && tableBody) ){
          return
        }

        tableHead.style.position = "absolute";
        tableHead.style.top = "-200px";
        tableBody.classList.add("margin-table-body");
        tableHead.children[0].classList.add("header-footer");

      } else if(window.scrollY < 200){
        added = false;
         const tableHead = document.getElementsByClassName("p-datatable-thead")[0];
         const tableBody = document.getElementsByClassName("p-datatable-tbody")[0];

        if(tableHead){
          tableHead.style.position = null;
          tableHead.style.top = null;
          tableHead.children[0].classList.remove("header-footer");
        }

        if(tableBody){
          tableBody.classList?.remove("margin-table-body");
        }

      }
    }

    onMounted(() => {
      loadAllClients();
      window.addEventListener('scroll', updateScroll);
    });

    onUnmounted(()=>{
      store.commit("clientControl/setNewUser", false)
      window.removeEventListener('scroll', updateScroll);
    })

    //Search and filters starts from here
        const applyFilter = () => {
      let filteredData = [];
      if (searchText.value) {
        filteredData = prevMainSearchHistry.value;
      } else {
        filteredData = prevCustomers.value;
      }
      // Make sure search value has some valid value, then do filtering
      if (accountName.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.name && accountName.value
              ? false
              : accountName.value
              ? subFilter(
                  val.name.toLowerCase(),
                  accountName.value.toLowerCase().trim(),
                  selectedNameFilter.value
                )
              : true
          ) {
            return true;
          }
        });
      }
      // Make sure search value has some valid value, then do filtering
      if (searchedaddress.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.address && searchedaddress.value
              ? false
              : !!(searchedaddress.value
                  ? subFilter(
                      val.address.toLowerCase(),
                      searchedaddress.value.toLowerCase().trim(),
                      selectedaddressFilter.value
                    )
                  : true)
          ) {
            return true;
          }
        });
      }

      // Make sure search value has some valid value, then do filtering
      if (searchedUsers.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.users && val.users != 0 && searchedUsers.value
              ? false
              : !!(searchedUsers.value
                  ? subFilter(
                      +val.users,
                      +searchedUsers.value,
                      selectedUsersFilter.value
                    )
                  : true)
          ) {
            return true;
          }
        });
      }

      // CHECK wheather record is found againts applied filters
      customers.value = filteredData;
      prevSearched.value = filteredData;
    };

    const clearFilter = () => {
      searchText.value = "";
      accountName.value = "";
      searchedaddress.value = "";
      searchedUsers.value = "";
      customers.value = prevCustomers.value;
      prevSearched.value = [];
    };

    return {
      selectStatus,

      loadAllClients,
      showFilters,
      customers,
      prevCustomers,
      prevSearched,
      searchText,
      accountName,
      searchedaddress,
      searchedUsers,
      selectedNameFilter,
      selectedaddressFilter,
      selectedUsersFilter,
      prevMainSearchHistry,
      closeFilter,

      accountDetail,
      scrollPosition,
      calenderValue,
      formatDate,
      masterUser,
      userArray,
      hideCalendar,
      filteredMainMethod,
      applyFilter,
      clearFilter,
      prevMonth,
      exportAccountData,
      exportFileUrl,
      exportFileRef,
      userTablePagination,
      cf,
      click,
      loader,
      loading,
      showDialog,
      showMasterDialog,
      showCalender,
      closeCalendar,
      numberDropdown,
      filterDropdown,
      dates2,
      changePassword,
      errorText,
      successText
    };
  },
};
</script>
<style>
.header-footer{
  position: fixed !important;
  top: 80px;
  width: calc(100% - 315px)  !important;
}
.div-hover:hover *{
  cursor: pointer;
  color: #008ac0;
}
.div-hover:hover .drop-icon svg path{
  fill: #008ac0;
}
.dropdown .dropdown-menu {
  z-index: 1000;
}
.div-hover:hover svg path,
.div-hover:hover svg line {
  stroke: #008ac0;
  color: #008ac0;
}
#filter-dropdown {
  min-width: 465px;
  padding: 16px 15px;
  box-shadow: #3755634d 0px 8px 30px;
}
.margin-table-body{
  margin-top: 57px;
}
.calender .p-inputtext{
  border: 0;
  display: none;
}
.calender .p-button{
  background: #fff;
  color: #000;
  border: none;
  width: 1.5rem !important;
}
.p-datepicker:not(.p-disabled) .p-monthpicker .p-monthpicker-month:not(.p-disabled):focus {
  box-shadow: none !important;
}
.calender .p-button:enabled:active, .calender .p-button:enabled:hover{
  background: #fff;
  color: #000;
  border: none;
}
.calender .p-button:focus{
  box-shadow: none;
}
.export-btn{
  width: 90%;
  margin: 0 auto;
  background-color: #04B2E6;
  text-align: center;
  padding: 6px 0px;
  color: white;
  border-radius: 3px;
  cursor:pointer;
}
.export-deactivate{
  background-color: #E5E5E5;
  color: white;
  cursor:no-drop;
}
</style>
