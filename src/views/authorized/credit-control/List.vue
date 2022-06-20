<template>
  <div class="px-8">
    <Loader v-if="loader" :toBeBigger="true" />
    <sticky-header>
      <h1 class="mt-6 mb-8 ml-3 text-2xl font-normal leading-tight">Credit Control</h1>
      <div class="flex mb-2 ml-4">
         <div class="inline-block px-10 py-1.5 border-2 border-psytechBlue rounded-md  mr-10 cursor-pointer font-semibold" :class="[showSection == 1?'bg-psytechBlue text-white':'text-psytechBlue']" @click="showSection = 1">Credit History</div>
         <div class="inline-block px-10 py-1.5 border-2 border-psytechBlue rounded-md ml-6 cursor-pointer font-semibold" :class="[showSection == 2?'bg-psytechBlue text-white':'text-psytechBlue']" @click="showSection = 2">Credit Transactions </div>
      </div>

    <div
        v-if="showSuccessAlert"
        class="flex items-center justify-center w-2/5 px-2 py-1 m-1 mt-10 font-medium text-green-700 bg-white bg-green-100 border border-green-300 rounded-md"
      >
        <div slot="avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 mx-2 feather feather-check-circle"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div
          class="items-center flex-initial max-w-full font-normal text-large"
        >
          {{ successMessage }}
        </div>
        <div class="flex flex-row-reverse flex-auto">
          <div @click="showSuccessAlert = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 ml-2 rounded-full cursor-pointer feather feather-x hover:text-green-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      <div class="flex" v-if="showSection == 2">
         <div class="relative p-4 mt-10 ml-4 mr-12 border-2 border-gray-300 rounded-md w-72">
            <div class="flex">
              <div>
                <p class="text-sm font-semibold"> Transferable Credit </p>
                <p class="mb-2 text-lg font-bold text-black"> {{ ($store.getters['auth/getUserDataSavedInLocalStorage'])?.credits  }} </p>
              </div>
              <div></div>
            </div>
            <!--  -->
            <div class="absolute inline-block py-1.5 rounded-full text-white bg-psytechBlue cursor-pointer px-10 ml-6" @click="(topUpCreditDialog = true,  showSuccessAlert = false)"> Top Up credit </div>
          </div>

          <div class="relative p-4 mt-10 ml-4 border-2 border-gray-300 rounded-md w-72">
            <div class="flex">
              <div>
                <p class="text-sm font-semibold"> My Clients </p>
                <p class="mb-2 text-lg font-bold text-black"> {{ '--' }} </p>
              </div>
              <div></div>
            </div>
            <!--  -->
            <div class="absolute inline-block py-1.5 rounded-full text-white bg-psytechBlue cursor-pointer px-4 ml-3" @click="(showCreditToClientDialog = true,  showSuccessAlert = false)"> Transfer Credit to clients </div>
          </div>

      </div>
      <topUpCreditDialog
      v-if="topUpCreditDialog"
      @closeDialog="topUpCreditDialog = false"
      @toUpCreditData="topUpCreditMethod($event)" />

      <div class="ml-4" v-if="showSection == 1">
      <TabGroup>
        <div class="box-border flex border-b-2 md:pr-12 lg:pr-0">
          <div class="flex-shrink-0 w-1/2" id="export_account">
            <TabList class="flex space-x-1 bg-blue-900/20 rounded-xl">
              <Tab as="template" v-slot="{ selected }">
                <button
                    @click="(tableData = [], tabIndex =2,getData('transferedClientToUserAction'))"
                    :class="[
                    'block py-4 pr-3 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none sm:py-2',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Users Credit Update
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                    style="padding-left:25px"
                  @click="(tableData = [], tabIndex =0,getData('transferedToMeAction'))"
                  :class="[
                    'block px-6 sm:px-4 sm:text-sm sm:py-3 md:py-4 font-bold text-black active mr-8 hover:text-psytechBlueBtHover focus:outline-none ',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  <span class="-ml-6"> Transferable Credits </span>
                </button>
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <button
                  @click="(tableData = [], tabIndex =1,getData('distributorCreditHistoryAction'))"
                  :class="[
                    'block px-6 py-4 sm:px-4 sm:text-sm sm:py-3 font-bold text-black active hover:text-psytechBlueBtHover focus:outline-none',
                    selected ? 'border-b-2 border-gray-400' : 'border-0',
                  ]"
                >
                  Transferred to Client
                </button>
              </Tab>
            </TabList>
          </div>
        </div>
      <TabPanel>
        <CreditTopBar
            @datePicked="loadTransferedToMe($event)"
            @exportCSV="sortDataForExport" 
            :data="tableData.length"
            @valuedChanged="searchedDataTransferedClientToUser($event)" />
        <div>
          <DataTable
              :customers="tableData"
              :emitSortedData="true"
              :rowHover="true"
              :paginator="true"
              @sortingCriteria="sortTableDataForExport($event)"
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
                tableType="creditTableFirst"
                :image='true'
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

    <credit-to-clientDialog
    v-if="showCreditToClientDialog"
    @closeDialog="showCreditToClientDialog = false"
    @transferCreditClientData="sendCallCreditToClient($event)" />

    <credit-setting-dialog
    v-if="showSettingsDialog"
    @closeDialog="showSettingsDialog = false"
    />

  </div>
</template>

<script>
import { reactive, computed , ref } from "vue";
import DataTable from "@/components/Table.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import StickyHeader from "@/components/StickyHeader";
import _ from "lodash";
import { saveAs } from 'file-saver';
import ExcelJS from "exceljs";
import CreditUpdateDialog from "@/components/credit/UpdateCreditDialog.vue";
import ViewCreditDialog from "@/components/credit/ViewCreditDialog.vue";
import PsytechButton from "@/components/PsytechButton";
import Loader from "@/components/Loader.vue";
import { mdiFileDelimitedOutline } from '@mdi/js';
import CardWidget from "@/components/CardWidget";
import Icon from '@/components/Icon'
import topUpCreditDialog from "@/components/topUpCreditDialog.vue";
import * as XLSX from 'xlsx/xlsx.mjs';
// import XLSX from 'xlsx'
// import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
import creditToClientDialog from "@/components/transferredCreditToClientDialog.vue";

import CreditTopBar from "@/components/credit/topBar.vue";
import { useStore } from "vuex";
import CreditSettingDialog from "@/components/creditSettingDialog";
export default {
  name: "demoTable",
  components: {
    CreditSettingDialog,
    DataTable,
    StickyHeader,
    CreditTopBar,
    CardWidget,
    CreditUpdateDialog,
    topUpCreditDialog,
    creditToClientDialog,
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
    const showCreditToClientDialog = ref(false);
    const topUpCreditDialog = ref(false);
    const showViewDialog = ref(false);
    let successMessage = ref(null);
    const exportRef = ref("");
    const dialogData = ref('');
    const showSuccessAlert = ref(false);
    let tableData = ref([])
    let persistedData = ref([]);
    let error = ref(null)
    let loading = ref(false)
    let loader = ref(false);
    let tabIndex = ref(2)
    let showSettingsDialog = ref(false);
    const getData = (url, payload)=>{
      loading.value = true;
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

    // for first time API Call
    getData('transferedClientToUserAction')

    const loadTransferedToMe = (e)=>{
      if(!e.startDate || !e.endDate){
        return
      }

      tableData.value = [];
      persistedData.value = [];
      loading.value = true;
      if(tabIndex.value === 0){
        getData('transferedToMeAction')
        return true
      }
      if(tabIndex.value === 1){
         getData('distributorCreditHistoryAction')
        return true
      }
      if(tabIndex.value == 2){
         getData('transferedClientToUserAction')
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

  const topUpCreditMethod = (e)=>{
     loader.value = true;
       store
        .dispatch("creditControl/topUpCreditAction",{
          amount: +e.amount,
          purchaseNote: e.purchaseNotes
        })
        .then(async (res) => {
          if(res.data.status == 200){
            if(res.data.data){
              const DATA = JSON.parse(localStorage.getItem("userData"))
              const NEW_DATA = {
                ...DATA,
                credits: res.data.data.newTransferableCreditsAmount
              }
              await localStorage.setItem("userData", JSON.stringify(NEW_DATA))
              store.dispatch("auth/localStorageDataAction")
            }
            successMessage.value = "Top-up Credit Added Successfully."
            topUpCreditDialog.value = false;
            showSuccessAlert.value = true;
          }
        })
        .catch((error) => {
          console.log("errror", error)
        })
        .finally(()=>{
          loader.value = false;
        })
  }

  const sendCallCreditToClient = (e)=>{
    const DATA = {
          accountId: e.client,
          userId: e.user,
          amount: +e.amount,
          purchaseNote: e.purchaseNote
      }
    loader.value = true;
       store
        .dispatch("creditControl/transferCreditClientAction",DATA)
        .then(async (res) => {
          if(res.data.status == 200){
            if(res.data.data){
              console.log("response is....", res)
            }
            successMessage.value = "Credit Transferred Successfully.";
            showCreditToClientDialog.value = false;
            showSuccessAlert.value = true;
          }
        })
        .catch((error) => {
          console.log("errror", error)
        })
        .finally(()=>{
          loader.value = false;
        })
  }

  const sortedAndGroupedData = reactive({
    groupedData: null
  });

  const sortTableDataForExport = ({ sortField, sortOrder})=>{
    let sortedArray = _.orderBy(tableData.value,sortField , [sortOrder ==1 ?'asc': 'desc']);
    let groupedData = _.groupBy(sortedArray, "accountName")

    sortedAndGroupedData.groupedData = groupedData;
  }

  const sortDataForExport = ()=>{
    let groupedData;
    if(sortedAndGroupedData.groupedData){
      groupedData = sortedAndGroupedData.groupedData
    } else{
       let sortedArray = _.orderBy(tableData.value,'accountName' , ['asc']);
       groupedData = _.groupBy(sortedArray, "accountName")
    }
    
    // var wb = XLSX.utils.book_new() // make Workbook of Excel
    // Object.keys(groupedData).forEach(function(key) {
      
    //   XLSX.utils.book_append_sheet(wb,  XLSX.utils.json_to_sheet(groupedData[key]) , key) // sheetAName is name of Worksheet  

    // });
    //  // export Excel file
    //  XLSX.utils.sheet_add_aoa(wb, Heading, { origin: 'A1' });
    //   XLSX.writeFile(wb, 'creadits_update.xlsx') // name of the file is 'book.xlsx'

  let wb = new ExcelJS.Workbook();
  let workbookName = "Credit Updates Summery.xlsx";

   Object.keys(groupedData).forEach(function(key) {
    // groupedData[key]
       let ws = wb.addWorksheet(`${key}`
      );

    // Columns
  ws.columns = [
    { 
      key: "accountID", 
      header: "Account ID", 
      width: 15 ,
      style: {
        alignment: { horizontal: "center" },
      }
    },
    {
      key: "userID",
      header: "User ID",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
      }
    },
    { 
      key: "email", 
      header: "Email", 
      width: 30,
      style: {
        alignment: { horizontal: "center" },
      }
    },
    {
      key: "accountName",
      header: "Account Name",
      width: 40,
      style: {
        alignment: { horizontal: "center" },
        font: { color: { argb: "008000" } }
      }
    },
    { 
      key: "purchaseID", 
      header: "Purchase ID",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
      } 
    },
    {
      key: "amount",
      header: "Amount",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
        numFmt: "0.0"
      }
    },
    {
      key: "dateOfUpdate",
      header: "Date Of Update",
      width: 30,
      style: { 
        alignment: { horizontal: "center" },
        numFmt: "mm/dd/yyyy"
         }
    },
    {
      key: "firstName",
      header: "First Name",
      width: 30,
      style: { alignment: { wrapText: true, horizontal: "center" }, numFmt: '@' },
    },
    {
      key: "familyName",
      header: "Family Name",
      width: 30,
      style: { alignment: { wrapText: true, horizontal: "center" }, numFmt: '@' },
    },
     {
      key: "creditsBefore",
      header: "Credits Before",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
        numFmt: "0.0"
      }
    },
     {
      key: "creditLimit",
      header: "Credit Limit",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
        numFmt: "0.0"
      }
    },
     {
      key: "userType",
      header: "User Type",
      width: 15,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "sharedCredit",
      header: "Shared Credit",
      width: 15,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "dongleID",
      header: "Dongle ID",
      width: 15,
      style: {
        alignment: { horizontal: "center" },
        numFmt: "0.0"
      }
    },
    {
      key: "operator",
      header: "Operator",
      width: 15,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "masterUserId",
      header: "Master User ID",
      width: 15,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "masterUserEmail",
      header: "Master User Email",
      width: 25,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "masterUserFirstName",
      header: "Master User First Name",
      width: 25,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "masterUserLastName",
      header: "Master User Last Name",
      width: 25,
      style: {
        alignment: { horizontal: "center" }
      }
    },
    {
      key: "submittedBy",
      header: "Submitted By",
      width: 30,
      style: {
        alignment: { horizontal: "center" },
      }
    },
    {
      key: "correctionReason",
      header: "Correction Reason",
      width: 30,
       style: {
        alignment: { horizontal: "center" },
      }
    },
    {
      key: "psytechApproved",
      header: "Psytech Approved",
      width: 20,
       style: {
        alignment: { horizontal: "center" },
      }
    },
    {
      key: "psytechComment",
      header: "Psytech Comment",
      width: 30,
       style: {
        alignment: { horizontal: "center" },
      }
    }
    
  ];

  ws.getRow(1).font = { bold: true };
  
  ws.addRows(groupedData[key]);
 
  // Merge cells
  // ws.mergeCells(`A${groupedData[key].length+2}:F${groupedData[key].length +4}`);
  // ws.getCell(`A${groupedData[key].length+2}:F${groupedData[key].length +4}`).style = {
  //   font: {
  //     size: 20,
  //     bold: true
  //   },
  //   alignment: {
  //     horizontal: 'right', 
  //     vertical: 'middle',
  //     wrapText: true
  //   }
  // };

// ws.getCell(`E${groupedData[key].length+2}:F${groupedData[key].length +4}`).value = 'Total Amount = '+ `${ groupedData[key].map(item => item.amount).reduce(function (result, item) {
//   return result + item;
// }, 0) }`;
  
//   ws.getRow(`E${groupedData[key].length+2}`).outlineLevel = 1;
//   ws.getRow(`E${groupedData[key].length+3}}`).outlineLevel = 1;
//   ws.getRow(`E${groupedData[key].length+4}`).outlineLevel = 1;
  
});

  wb.xlsx.writeBuffer()
    .then(function(buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        workbookName
      );
  });
   
  
  }

    return {
      loadTransferedToMe,
      tableData,
      creditCorrection,
      persistedData,
      updateDialogData,
      topUpCreditMethod,
      sortDataForExport,
      successMessage,
      clientDetailDialog,
      clientToUsersDetailDialog,
      sortTableDataForExport,
      sortedAndGroupedData,
      sendCallCreditToClient,
      searchedDataTransferedToMe,
      searchedDataTransferedToClient,
      searchedDataTransferedClientToUser,
      showCreditToClientDialog,
      mdiFileDelimitedOutline,
      topUpCreditDialog,
      filterMethod,
      showSuccessAlert,
      exportRef,
      showSection,
      downloadExportFile,
      getData,
      showSettingsDialog,
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
