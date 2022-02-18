<template>
  <div class="px-8">
    <Loader v-if="loader" :toBeBigger="true" />
    <sticky-header>
      <h1 class="mt-6 mb-8 ml-3 text-2xl font-normal leading-tight">Credit Control</h1>
      <div class="flex mb-2 ml-4">
         <div class="inline-block px-10 py-1.5 border-2 border-black rounded-md mr-10 cursor-pointer" @click="showSection = 1">My Credit </div>
         <div class="inline-block px-10 py-1.5 border-2 border-black rounded-md ml-6 cursor-pointer" @click="showSection = 2">Credit History</div>
      </div>
      
      <div class="flex" v-if="showSection == 1">
         <div class="relative p-4 mt-10 ml-4 mr-12 border-2 border-gray-300 rounded-md w-72">
            <div class="flex">
              <div>
                <p class="text-sm font-semibold"> Transferable Credit </p>
                <p class="mb-2 text-lg font-bold text-black"> {{ userData?.credits  }} </p>
              </div>
              <div></div>
            </div>
            <!--  -->
            <div class="absolute inline-block py-1.5 rounded-full text-white bg-psytechBlue cursor-pointer px-10 ml-6" @click="topUpCreditDialog = true"> Top Up credit </div>
          </div>

          <div class="relative p-4 mt-10 ml-4 border-2 border-gray-300 rounded-md w-72">
            <div class="flex">
              <div>
                <p class="text-sm font-semibold"> My Clients </p>
                <p class="mb-2 text-lg font-bold text-black"> 400 </p>
              </div>
              <div></div>
            </div>
            <!--  -->
            <div class="absolute inline-block py-1.5 rounded-full text-white bg-psytechBlue cursor-pointer px-4 ml-3"> Transfer Credit to clients </div>
          </div>
      
      </div>
      <topUpCreditDialog
      v-if="topUpCreditDialog"
      @closeDialog="topUpCreditDialog = false"
      @toUpCreditData="topUpCreditMethod($event)" />

      <div class="ml-4" v-if="showSection == 2">
      <TabGroup>
        <div class="box-border flex border-b-2 md:pr-12 lg:pr-0">
          <div class="flex-shrink-0 w-1/2" id="export_account">
            <TabList class="flex space-x-1 bg-blue-900/20 rounded-xl">
              <Tab as="template" v-slot="{ selected }">
                <button
                  @click="(tableData = [], tabIndex =0)"
                  :class="[
                    'block md:px-6 sm:px-4 sm:text-sm sm:py-3 md:py-4 font-bold text-black active mr-8 hover:text-psytechBlueBtHover focus:outline-none sm:px-3 sm:py-2',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  <span class="-ml-6"> Top Up credits </span>
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                  @click="(tableData = [], tabIndex =1)"
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Transfered to Client
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                  @click="(tableData = [], tabIndex =2)"
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Users Credit Update
                </button>
              </Tab>
            </TabList>
          </div>
        </div>

     <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)"
         @exportCSV="downloadExportFile"
         :data="tableData.length"
         @valuedChanged="searchedDataTransferedToMe($event)"
        />
          <div>
              <DataTable
                :customers="tableData"
                :rowHover="true"
                ref="exportRef"
                :paginator="true"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                :loading="loading"
                :image='true'
                tableType="creditTableFirst"
                @rowClicked="updateDialogData($event)"
                @correctCreditUpdate="(showDialog = true)"
              />
          </div>
      </TabPanel>

      <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)"
         @valuedChanged="searchedDataTransferedToClient($event)"
         @exportCSV="downloadExportFile"
         :data="tableData.length" />
          <div>
              <DataTable
                :customers="tableData"
                :clientName="''"
                :rowHover="true"
                :paginator="true"
                ref="exportRef"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                :loading="loading"
                :image='true'
                tableType="creditTableSecond"
                @rowData="clientDetailDialog({data: $event})"
                @rowClicked="(clientDetailDialog($event)), (showViewDialog=true)"
                @correctCreditUpdate="showDialog = true"
              />
          </div>
      </TabPanel>

      <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)"
         @exportCSV="downloadExportFile"
         :data="tableData.length"
         @valuedChanged="searchedDataTransferedClientToUser($event)" />
          <div>
              <DataTable
                :customers="tableData"
                :rowHover="true"
                :paginator="true"
                ref="exportRef"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                :loading="loading"
                :image='true'
                tableType="creditTableThird"
                @rowData="(clientToUsersDetailDialog({data:$event}))"
                @rowClicked="(clientToUsersDetailDialog($event)),((showViewDialog=true))"
                @correctCreditUpdate="showDialog = true"
              />
          </div>
      </TabPanel>

      </TabGroup>
    </div>
    </sticky-header>
    <credit-update-dialog
    v-if="showDialog"
    :data="dialogData"
    @correctCreditUpdate="creditCorrection($event)"
    @closeDialog="showDialog = false" />

    <view-credit-dialog
    v-if="showViewDialog"
    topHeaderText="Credit Details"
    :data="dialogData"
    @openCreditDialog="(showDialog=true),(showViewDialog = false)"
    @closeDialog="showViewDialog = false" />
  </div>
</template>

<script>
import { reactive, computed , ref } from "vue";
import DataTable from "@/components/Table.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import StickyHeader from "@/components/StickyHeader";
import _ from "lodash";
import CreditUpdateDialog from "@/components/credit/UpdateCreditDialog.vue";
import ViewCreditDialog from "@/components/credit/ViewCreditDialog.vue";
import PsytechButton from "@/components/PsytechButton";
import Loader from "@/components/Loader.vue";
import { mdiFileDelimitedOutline } from '@mdi/js';
import CardWidget from "@/components/CardWidget";
import Icon from '@/components/Icon'
import topUpCreditDialog from "@/components/topUpCreditDialog.vue";

import CreditTopBar from "@/components/credit/topBar.vue";
import { useStore } from "vuex";
export default {
  name: "demoTable",
  components: {
    DataTable,
    StickyHeader,
    CreditTopBar,
    CardWidget,
    CreditUpdateDialog,
    topUpCreditDialog,
    ViewCreditDialog,
    PsytechButton,
    TabGroup,
    TabList,
    Loader,
    Icon,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {
    const store = useStore();
    const showSection = ref(1);
    const showDialog = ref(false);
    const topUpCreditDialog = ref(false);
    const showViewDialog = ref(false);
    const exportRef = ref("");
    const dialogData = ref('');
    let tableData = ref([])
    let persistedData = ref([]);
    let error = ref(null)
    let loading = ref(false)
    let loader = ref(false);
    let tabIndex = ref(0)

    const getData = (url, payload)=>{
      error.value = null
      store
        .dispatch(`creditControl/${url}`,payload)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          let updatedData = []
          if(RESPONSE_DATA.status ==200){

            if(RESPONSE_DATA.data.length && tabIndex.value ==1){
              const formattedData = RESPONSE_DATA.data.map(item=>{
                return {
                  ...item,
                  date: item.dateOfUpdate?.split(" ")[0],
                  time: item.dateOfUpdate?.split(" ")[1],
                  adminFullName: `${item.masterUserFirstName?item.masterUserFirstName:' '} ${item.masterUserLastName?item.masterUserLastName:' '}`,
                }
              })

              tableData.value = formattedData;
              persistedData.value = formattedData;
            } else {
              tableData.value = RESPONSE_DATA.data;
              const formattedDate = RESPONSE_DATA.data.map(item=>{
                return {
                  ...item,
                  date: item.dateOfUpdate?.split("T")[0],
                  time: item.dateOfUpdate?.split("T")[1]?.split("Z")[0],
                }
              })
              tableData.value = formattedDate;
              persistedData.value = formattedDate;
            }
          }
        })
        .catch((error) => { })
        .finally(()=>{
          loading.value = false;
        })
    }

    const loadTransferedToMe = (e)=>{
      if(!e.startDate || !e.endDate){
        return
      }

      const startDate = new Date(e.startDate)
      const endDate = new Date(e.endDate)
      const payload = {
        startDate : `${startDate.getFullYear()}-${ String(startDate.getMonth() +1).padStart(2, '0') }-${ String(startDate.getDate()).padStart(2, '0') }`,
        endDate : `${endDate.getFullYear()}-${ String(endDate.getMonth() +1).padStart(2, '0') }-${ String(endDate.getDate()).padStart(2, '0') }`,
      }
      tableData.value = [];
      persistedData.value = [];
      loading.value = true;
      if(tabIndex.value === 0){
        getData('transferedToMeAction', payload)
        return true
      }
      if(tabIndex.value === 1){
         getData('distributorCreditHistoryAction', payload)
        return true
      }
      if(tabIndex.value == 2){
         getData('transferedClientToUserAction', payload)
        return true
      }
    }

  const searchedDataTransferedToMe = (e)=>{
      const prevResult = _.cloneDeep(persistedData?.value);
      if(!e){
        tableData.value =  _.cloneDeep(persistedData?.value);
        return
      }
      const searchableFields = ["date number", "time number", "amount number"]
      const result = filterMethod(prevResult,searchableFields,e)
      tableData.value = result;
    }

    const searchedDataTransferedToClient = (e)=>{
      const prevResult = _.cloneDeep(persistedData?.value);
      if(!e){
        tableData.value =  _.cloneDeep(persistedData?.value);
        return
      }
      const searchableFields = ["accountName string","masterUserEmail string","adminFullName string" , "date number", "time number", "requestAmount number"]
      const result = filterMethod(prevResult,searchableFields,e)
      tableData.value = result;
    }

  const searchedDataTransferedClientToUser = (e)=>{
      const prevResult = _.cloneDeep(persistedData?.value);
      if(!e){
        tableData.value =  _.cloneDeep(persistedData?.value);
        return
      }
      const searchableFields = ["email string", "accountName string", "firstName string", "dateOfUpdate number", "amount number"]
      const result = filterMethod(prevResult,searchableFields,e)
      tableData.value = result;
    }

  const filterMethod = (data, searchableFields, value) => {
      const matchedArray = searchableFields.map(item=> {
        return data.filter(customer=>(item.split(" ")[1] == "string"? customer[item.split(" ")[0]]?.toLowerCase().indexOf(value) > -1: String(customer[item.split(" ")[0]]).indexOf(value) > -1))
      }).flat()
      return _.uniqWith(matchedArray, _.isEqual)
    }

  const clientToUsersDetailDialog = ({data})=>{
    dialogData.value = {
        clientType: "User Account",
        userID: data.userID,
        updaterId:data.updateID,
        clientName: data.accountName,
        accountAdmin: `${data.masterUserFirstName?data.masterUserFirstName:' '} ${data.masterUserLastName?data.masterUserLastName:' '}`,
        email: data.masterUserEmail,
        creditRequested: data.amount,
        creditLimit: data.creditLimit,
        purchaseNote: data.purchaseID,
        creditsBefore: data?.creditsBefore??'',
        currentCredits: data.amount,
        maxCreditLimit: data.maxCreditUpdate??'',
        sharedCredit: data.sharedCredit,
        updateDateAndTime: data.dateOfUpdate
      }
  }

    const updateDialogData = ({data})=>{

      dialogData.value = {
        updaterId: data.creditTransferId,
        clientType: "",
        userID: "",
        clientName: data.accountName??'',
        accountAdmin: `${data.masterUserFirstName?data.masterUserFirstName:' '} ${data.masterUserLastName?data.masterUserLastName:' '}`,
        email: data.masterUserEmail??'',
        creditRequested: data.amount,
        creditLimit: data.creditLimit,
        maxCreditLimit: data.maxCreditUpdate,
        sharedCredit: data.sharedCredit,
        updateDateAndTime: data.transferDate
      }
    }

  const clientDetailDialog = ({data})=>{
    dialogData.value = { 
        clientType: "Client Account",
        userID: data.userID,
        updaterId:data.updateID,
        clientName: data.accountName,
        accountAdmin: `${data.masterUserFirstName?data.masterUserFirstName:' '} ${data.masterUserLastName?data.masterUserLastName:' '}`,
        email: data.masterUserEmail,
        creditsBefore: data?.currentCredits??'',
        currentCredits: data.currentCredits,
        creditRequested: data.requestAmount,
        creditLimit: data.creditLimit,
        maxCreditLimit: data.maxCreditUpdate,
        sharedCredit: data.sharedCredit,
        purchaseNote: data.purchaseID,
        updateDateAndTime: data.dateOfUpdate
      }
  }

  const creditCorrection = (e)=>{
      const data = {
        amount: +e.correctCredit,
        reason: e.correctionReason,
        userid: dialogData.value?.userID,
        updateid: dialogData.value.updaterId
      }
      loader.value = true;
       store
        .dispatch(`creditControl/creditCorrectionAction`,data)
        .then((res) => {
          if(res.data.data.distributorCreditCorrectionSubmitted){
            showDialog.value = false;
          }
        })
        .catch((error) => { })
        .finally(()=>{
          loader.value = false;
        })
  }
  const downloadExportFile = ()=>{
    exportRef.value.exportCSV()
  }
  const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    })

  const topUpCreditMethod = (e)=>{
     loader.value = true;
       store
        .dispatch("creditControl/topUpCreditAction",{
          amount: +e.amount,
          purchaseNote: e.purchaseNotes
        })
        .then((res) => {
          if(res.data.status == 200){
            topUpCreditDialog.value = false;
          }
        })
        .catch((error) => { 
          console.log("errror", error)
        })
        .finally(()=>{
          loader.value = false;
        })
  }

    return {
      loadTransferedToMe,
      tableData,
      creditCorrection,
      persistedData,
      updateDialogData,
      topUpCreditMethod,
      clientDetailDialog,
      clientToUsersDetailDialog,
      searchedDataTransferedToMe,
      searchedDataTransferedToClient,
      searchedDataTransferedClientToUser,
      mdiFileDelimitedOutline,
      topUpCreditDialog,
      filterMethod,
      exportRef,
      userData,
      showSection,
      downloadExportFile,
      getData,
      tabIndex,
      loading,
      loader,
      showDialog,
      showViewDialog,
      dialogData,
      error
    };
  },
};
</script>

<style scoped>

</style>
