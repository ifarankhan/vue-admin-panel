<template>
  <div class="px-8">
    <sticky-header>
      <h1 class="mt-6 mb-8 ml-3 text-2xl font-normal leading-tight">Credit Control</h1>
      <div class="ml-4">
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
                  <span class="-ml-6"> Transfered to Me </span>
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
                  Transfered by Client to Users
                </button>
              </Tab>
            </TabList>
          </div>
        </div>

     <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)"
         @valuedChanged="searchedDataTransferedToMe($event)"
        />
          <div>
              <DataTable
                :customers="tableData"
                :rowHover="true"
                :paginator="true"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                :loading="loading"
                :image='true'
                tableType="creditTableFirst"
                @rowClicked="updateDialogData($event)"
                @correctCreditUpdate="showDialog = true"
              />
          </div>
      </TabPanel>

      <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)"
         @valuedChanged="searchedDataTransferedToClient($event)" />
          <div>
              <DataTable
                :customers="tableData"
                :clientName="''"
                :rowHover="true"
                :paginator="true"
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
         @valuedChanged="searchedDataTransferedClientToUser($event)" />
          <div>
              <DataTable
                :customers="tableData"
                :rowHover="true"
                :paginator="true"
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
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/Table.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import StickyHeader from "@/components/StickyHeader";
import _ from "lodash";
import CreditUpdateDialog from "@/components/credit/UpdateCreditDialog.vue";
import ViewCreditDialog from "@/components/credit/ViewCreditDialog.vue";

import CreditTopBar from "@/components/credit/topBar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "demoTable",
  components: {
    DataTable,
    StickyHeader,
    CreditTopBar,
    CreditUpdateDialog,
    ViewCreditDialog,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {  
    const store = useStore();
    const showDialog = ref(false);
    const showViewDialog = ref(false);
    const dialogData = ref('');
    let tableData = ref([])
    let persistedData = ref([]);
    let error = ref(null)
    let loading = ref(false)
    let tabIndex = ref(0)

    const getData = (url, payload)=>{
      error.value = null
      store
        .dispatch(`creditControl/${url}`,payload)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          let updatedData = []
          if(RESPONSE_DATA.status ==200){
            
            if(RESPONSE_DATA.data.length && RESPONSE_DATA.data[0]?.userUpdates){
              // const formatedData = []
              //  console.log("up if")
              // const arrayData = RESPONSE_DATA.data.map(record=> {
              //   console.log("up")
              //   const data = record.userUpdates.map(item=> {
                  // updatedData.push({
                  //   accountName:record.accountName,
                  //   accountID: record.accountID,
                  //   masterUserEmail: record.masterUserEmail,
                  //   adminFirstName: record.masterUserFirstName,
                  //   adminLastName: record.masterUserLastName,
                  //   ...item,
                  // })
              //     return data
              //   })
              //   formatedData.push(...updatedData)
              //   return updatedData 
              // }).flat()
              for (let index = 0; index < RESPONSE_DATA.data.length; index++) {
                // const element = array[index];
                // console.log("first...",RESPONSE_DATA.data[0].userUpdates)
                for (let j = 0; j < RESPONSE_DATA.data[index].userUpdates.length; j++) {
                  // console.log("RESPONSE_DATA.data[i].userUpdates",RESPONSE_DATA.data[index].userUpdates[j])
                  // // const userUpdate = RESPONSE_DATA.data[index].userUpdates;
                  // console.log("...RESPONSE_DATA.data[index].userUpdates[j]",RESPONSE_DATA.data[index].accountName)
                  // console.log("...RESPONSE_DATA.data[index].userUpdates[j]",RESPONSE_DATA.data[index].accountName)
                  // console.log("...RESPONSE_DATA.data[index].userUpdates[j]",RESPONSE_DATA.data[index].accountName)
                  // console.log("...RESPONSE_DATA.data[index].userUpdates[j]",RESPONSE_DATA.data[index].accountName)
                    updatedData.push({
                    accountName:RESPONSE_DATA.data[index].accountName,
                    accountID: RESPONSE_DATA.data[index].accountID,
                    masterUserEmail: RESPONSE_DATA.data[index].masterUserEmail,
                    adminFirstName: RESPONSE_DATA.data[index].masterUserFirstName,
                    adminLastName: RESPONSE_DATA.data[index].masterUserLastName,
                    creditLimit: RESPONSE_DATA.data[index].userUpdates[j].creditLimit,
                    currentCredits: RESPONSE_DATA.data[index].userUpdates[j].currentCredits,
                    dateOfUpdate: RESPONSE_DATA.data[index].userUpdates[j].dateOfUpdate, 
                    requestAmount: RESPONSE_DATA.data[index].userUpdates[j].requestAmount, 
                    // dongleID: RESPONSE_DATA.data[index].userUpdates[j].dongleID,
                    email: RESPONSE_DATA.data[index].userUpdates[j].email,
                    familyName: RESPONSE_DATA.data[index].userUpdates[j].familyName,
                    firstName: RESPONSE_DATA.data[index].userUpdates[j].firstName,
                    // issueID: RESPONSE_DATA.data[index].userUpdates[j].issueID,
                    maxCreditUpdate: RESPONSE_DATA.data[index].userUpdates[j].maxCreditUpdate,
                    newUpdate: RESPONSE_DATA.data[index].userUpdates[j].newUpdate,
                    // potentialFailedUpdate: RESPONSE_DATA.data[index].userUpdates[j].potentialFailedUpdate,
                    purchaseID: RESPONSE_DATA.data[index].userUpdates[j].purchaseID,
                    // requestAmount: RESPONSE_DATA.data[index].userUpdates[j].requestAmountt,
                    sharedCredit: RESPONSE_DATA.data[index].userUpdates[j].sharedCredit,
                    updateDate: RESPONSE_DATA.data[index].userUpdates[j].updateDate,
                    updateID: RESPONSE_DATA.data[index].userUpdates[j].updateID,
                    userID: RESPONSE_DATA.data[index].userUpdates[j].userID,
                    userType: RESPONSE_DATA.data[index].userUpdates[j].userType
                  })
                }
                
              }
              console.log("arrayData")
              tableData.value = updatedData;
              persistedData.value = updatedData;
            } else {
              tableData.value = RESPONSE_DATA.data;
              persistedData.value = RESPONSE_DATA.data;
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
      const searchableFields = ["transferDate number", "amount number"]
      const result = filterMethod(prevResult,searchableFields,e)
      tableData.value = result;
    }
    

    const searchedDataTransferedToClient = (e)=>{
      const prevResult = _.cloneDeep(persistedData?.value);
      if(!e){
        tableData.value =  _.cloneDeep(persistedData?.value);
        return
      }
      const searchableFields = ["accountName string","masterUserEmail string", "masterUserEmail string","adminFirstName string","adminLastName string" , "dateOfUpdate number", "requestAmount number"]
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
        return data.filter(customer=>(item.split(" ")[1] == "string"? customer[item.split(" ")[0]].toLowerCase().indexOf(value) > -1: String(customer[item.split(" ")[0]]).indexOf(value) > -1))
      }).flat()
      return _.uniqWith(matchedArray, _.isEqual)
    }
  
  const clientToUsersDetailDialog = ({data})=>{
    dialogData.value = {
        clientType: "User Account",
        clientName: data.accountName,
        accountAdmin: `${data.masterUserFirstName} ${data.masterUserLastName}`,
        email: data.masterUserEmail,
        creditRequested: data.amount,
        creditLimit: data.creditLimit,
        purchaseNote: data.purchaseID,
        creditsBefore: data?.creditsBefore??'',
        maxCreditLimit: data.maxCreditUpdate??'',
        sharedCredit: data.sharedCredit,
        updateDateAndTime: data.dateOfUpdate
      }
  }

    const updateDialogData = ({data})=>{
      dialogData.value = {
        clientType: "",
        clientName: data.accountName,
        accountAdmin: `${data.masterUserFirstName} ${data.masterUserLastName}`,
        email: data.masterUserEmail,
        creditRequested: data.amount,
        creditLimit: data.creditLimit,
        maxCreditLimit: data.maxCreditUpdate,
        sharedCredit: data.sharedCredit,
        updateDateAndTime: data.transferDate
      }
    }

  const clientDetailDialog = ({data})=>{
    console.log("data",data)
    dialogData.value = { 
        clientType: "Client Account",
        clientName: data.accountName,
        accountAdmin: `${data.adminFirstName} ${data.adminLastName}`,
        email: data.masterUserEmail,
        creditsBefore: data?.currentCredits??'',
        creditRequested: data.requestAmount,
        creditLimit: data.creditLimit,
        maxCreditLimit: data.maxCreditUpdate,
        sharedCredit: data.sharedCredit,
        purchaseNote: data.purchaseID,
        updateDateAndTime: data.dateOfUpdate
      }
  }
   

    return {
      loadTransferedToMe,
      tableData,
      persistedData,
      updateDialogData,
      clientDetailDialog,
      clientToUsersDetailDialog,
      searchedDataTransferedToMe,
      searchedDataTransferedToClient,
      searchedDataTransferedClientToUser,
      filterMethod,
      getData,
      tabIndex,
      loading,
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
