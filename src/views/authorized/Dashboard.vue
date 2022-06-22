<template>
  <section class="p-6 pt-8 bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white">
    <h1 class="text-2xl font-semibold leading-tight">{{$t("Dashboard")}}</h1>

  </section>
  <main-section>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
      <card-widget
        trend="Total"
        color="text-psytechBlue"
        :icon="mdiAccountMultiple"
        :number="widgetData?.activeUsers"
        label="Lifetime Active Users"
      />
      <card-widget
          trend="Total"
          color="text-psytechRed"
          :icon="mdiAccountLock"
          :number="widgetData?.dormantUsers"
          label="Total Dormant Accounts"
      />
      <card-widget
          trend="Total"
          color="text-blue-500"
          :icon="mdiFinance"
          :number="widgetData?.reportsGenerated"
          label="Reports Generated Until Today"
      />
      <card-widget
          trend="Total"
          color="text-red-400"
          :icon="mdiRefresh"
          :number="widgetData?.creditUpdates"
          label=" Total credit updates"
      />
      <card-widget
          trend="Total"
          color="text-green-500"
          :icon="mdiEmailAlert"
          :number="widgetData?.invitesSent"
          label="Invitations Sent"
      />
      <card-widget
          trend="Total"
          color="text-yellow-500"
          :icon="mdiChartTimelineVariant"
          :number="widgetData?.peopleAssessed"
          label="Number of People Assessed"
      />

    </div>
    <div>
        <!-- class="grid grid-cols-2 gap-6 mb-6 lg:grid-cols-2" -->
         <div>
          <p class="ml-1 text-lg font-bold">Client Insights:</p>
             <DataTable
                :customers="besidesWidgetData.clientInSights"
                :loading="loading"
                :sortTable="false"
                :paginator="true"
                :rows="5"
                :image="true"
                :rowsPerPageOptions="[5, 20, 30]"
                tableType="topClients"
                @rowClicked="redirectToDetail($event)"
              />
       </div>
       <!-- <div>
         <p class="ml-1 text-lg font-bold">Low Credit Clients:</p>
            <DataTable
                :customers="besidesWidgetData.lowCreditClients"
                :loading="loading"
                @rowClicked="''"
                :sortTable="false"
                tableType="lowCreditCLients"
                :image='true'
              />
       </div> -->

    </div>
    <div class="mt-4">
      <p class="ml-1 text-lg font-bold">Most Used Reports:</p>
       <DataTable
                :customers="besidesWidgetData.mostUsedReports"
                :loading="loading"
                @rowClicked="''"
                :sortTable="false"
                :rowHover="true"
                :first="($store.getters['clientControl/getIsNewUser'])? 0 : userTablePagination && userTablePagination.first"
                :paginator="true"
                :rowsPerPageOptions="[10, 20, 30]"
                :rows="10"
                tableType="mostUsedReports"
                :image='true'
              />
    </div>
    <div class="mb-2">
      <p class="ml-1 text-lg font-bold">Most Used Assessments:</p>
      <DataTable
          :customers="widgetData?.mostUsedTests"
          :loading="loading"
          @rowClicked="''"
          :sortTable="false"
          :rowHover="true"
          :first="($store.getters['clientControl/getIsNewUser'])? 0 : userTablePagination && userTablePagination.first"
          :paginator="true"
          :rowsPerPageOptions="[10, 20, 30]"
          :rows="10"
          tableType="mostUsedAssessments"
          :image='true'
      />
    </div>
  </main-section>
</template>
<script>
import { computed, ref, onMounted, reactive } from 'vue'
import utility from "../../components/composition/utility";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import CardWidget from "@/components/CardWidget";
import DataTable from "@/components/Table.vue";
import CardComponent from "@/components/CardComponent";
import TitleSubBar from "@/components/TitleSubBar";
import JbButton from "@/components/JbButton";
import TableList from "@/components/TableList";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


import {
  mdiAccountMultiple,
  mdiAccountLock,
  mdiRefresh,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiEmailAlert
} from "@mdi/js";

export default {
  name: "Dashboard",
  components: {
    TableList,
    TitleSubBar,
    DataTable,
    MainSection,
    CardWidget,
    TitleBar,
    Notification,
    JbButton
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const darkMode = computed(() => store.state.darkMode);
    const widgetData = ref();
    const loading = ref(false);
    const besidesWidgetData = reactive({
      clientInSights: null,
      lowCreditClients: null,
      mostUsedReports: null
    })

    onMounted(() => {
      fetchWidgetsData();
      getDashboardData()
    });

    const logoutHanlder = async () => {
       store.dispatch("auth/logoutAction", 'login')
    };


    const fetchWidgetsData = ()=>{
      store
          .dispatch("auth/getWidgetData")
          .then((res) => {
            let responseArray = res?.data?.data;
            widgetData.value = responseArray;
            console.log(widgetData);
          })
          .catch((error) => {
            console.log("error is...", error);
          }).finally(()=>{
      })
    }
    const getDashboardData = ()=>{
      loading.value = true;
      Promise.allSettled([
      store.dispatch("auth/getClientInSights"),
      store.dispatch("auth/getWidgetListLowCreditClients"),
      store.dispatch("auth/getWidgetMostUsedReports")
    ])
    .then(async results =>{
      const [clientInSights, lowCreditClients, mostUsedReports] = results;

      // clientInSights
       if(clientInSights.status== "fulfilled"){
         besidesWidgetData.clientInSights = await clientInSights.value.data.data;
       }

      // lowCreditClients
       if(lowCreditClients.status== "fulfilled"){
         besidesWidgetData.lowCreditClients = await lowCreditClients.value.data.data;
       }

      // mostUsedReports
       if(mostUsedReports.status== "fulfilled"){
         besidesWidgetData.mostUsedReports = await mostUsedReports.value.data.data;
       }

       console.log("besidesWidgetData",besidesWidgetData)

    }).catch(error=>{
      console.log("error", error)
      }).finally(()=>{
        loading.value = false;
      })
    }

  const redirectToDetail = e => {
      const DATA = {
        accountName: e.data.name,
        accountId: e.data.accountID,
        accountAddress: e.data.address,
        accountDescription: e.data.description,
      }
      store.commit("clientControl/setClientDetail", DATA);
      router.push({ name: "client-control-list-detail" });
    };

  // const setClientDetail = async e=>{
  //    console.log("2 e is...", e)
  //   return
  //     await store.commit("clientControl/setClientDetail", e.data);
  //     await (clientName.value = e.data.accountName)
  //   }

    return {
      logoutHanlder,
      fetchWidgetsData,
      redirectToDetail,
      // setClientDetail,
      darkMode,
      widgetData,
      mdiAccountMultiple,
      besidesWidgetData,
      loading,
      mdiAccountLock,
      mdiEmailAlert,
      mdiCartOutline,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiGithub,
      mdiRefresh,
      mdiChartPie,
    };
  },
};
</script>
