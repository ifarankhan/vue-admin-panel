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
         @valuedChanged="''"
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
              />
          </div>
      </TabPanel>

      <TabPanel>
         <CreditTopBar
         @datePicked="loadTransferedToMe($event)" />
          <div>
              <DataTable
                :customers="tableData[0]?.userUpdates"
                :rowHover="true"
                :paginator="true"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                :loading="loading"
                :image='true'
                tableType="creditTableSecond"
              />
          </div>
      </TabPanel>

      <TabPanel>
         <CreditTopBar 
         @datePicked="loadTransferedToMe($event)" />
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
              />
          </div>
      </TabPanel>

      </TabGroup>
    </div>
    </sticky-header>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/Table.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import StickyHeader from "@/components/StickyHeader";

import CreditTopBar from "@/components/credit/topBar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "demoTable",
  components: {
    DataTable,
    StickyHeader,
    CreditTopBar,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {  
    const store = useStore();
    let tableData = ref([])
    let error = ref(null)
    let loading = ref(false)
    let tabIndex = ref(0)
    let searchedText= ref("");

    const getData = (url, payload)=>{
      error.value = null
      store
        .dispatch(`creditControl/${url}`,payload)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if(RESPONSE_DATA.status ==200){
            tableData.value = RESPONSE_DATA.data;
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
        console.log(payload);
      tableData.value = []
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

  //  onMounted(() => {
  //     loadTransferedToMe(0);
  //   });

    const test = (e)=>{
      console.log("fslkjlksfd", e)
    }

    return {
      loadTransferedToMe,
      tableData,
      searchedText,
      getData,
      test,
      tabIndex,
      loading,
      error
    };
  },
};
</script>   

<style scoped>

</style>
