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
        label="Active Users"
      />
      <card-widget
          trend="Total"
          color="text-psytechRed"
          :icon="mdiAccountLock"
          :number="widgetData?.dormantUsers"
          label="Dormant Accounts"
      />
      <card-widget
          trend="Total"
          color="text-blue-500"
          :icon="mdiFinance"
          :number="widgetData?.reportsGenerated"
          label="Reports Generated"
      />
      <card-widget
          trend="Total"
          color="text-red-400"
          :icon="mdiRefresh"
          :number="widgetData?.creditUpdates"
          label="Distributor Credit Updates"
      />
      <card-widget
          trend="Total"
          color="text-green-500"
          :icon="mdiCurrencyUsd"
          :number="widgetData?.creditsSold"
          label="Credit Sold"
      />
      <card-widget
          trend="Total"
          color="text-yellow-500"
          :icon="mdiChartTimelineVariant"
          :number="widgetData?.transferableCredits"
          label="Transferable Credits"
      />

    </div>
    <div class="grid grid-cols-2 gap-6 mb-6 lg:grid-cols-2">
      <table-list title="Low Credit Clients" />
      <table-list title="Top 5 Clients" :see-all="false"/>
      <table-list title="Most Used Tests"  />
    </div>
  </main-section>
</template>
<script>
import { computed, ref, onMounted, reactive } from 'vue'
import utility from "../../components/composition/utility";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import TitleSubBar from "@/components/TitleSubBar";
import JbButton from "@/components/JbButton";
import TableList from "@/components/TableList";
import { useStore } from "vuex";


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
  mdiCurrencyUsd
} from "@mdi/js";

export default {
  name: "Dashboard",
  components: {
    TableList,
    TitleSubBar,
    MainSection,
    CardWidget,
    TitleBar,
    Notification,
    JbButton
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const widgetData = ref();

    onMounted(() => {
      fetchWidgetsData();
    });

    const logoutHanlder = async () => {
       store.dispatch("auth/logoutAction", 'login')
    };


    const fetchWidgetsData = ()=>{
      //loading.value = true;
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
        //loading.value = false;
      })
    }
    return {
      logoutHanlder,
      fetchWidgetsData,
      darkMode,
      widgetData,
      mdiAccountMultiple,
      mdiAccountLock,
      mdiCurrencyUsd,
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
