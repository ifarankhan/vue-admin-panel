<template>
  <section class="p-6 pt-8 bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white">
    <h1 class="text-2xl font-semibold leading-tight">{{$t("Dashboard")}}</h1>

  </section>
  <main-section>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
      <card-widget
        trend="12%"
        trend-type="up"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="67876"
        label="Credit Update"
      />
      <card-widget
        trend="12%"
        trend-type="down"
        color="text-blue-500"
        :icon="mdiCartOutline"
        :number="200"
        prefix=""
        label="No of tests"
      />
      <card-widget
        trend="Overflow"
        trend-type="alert"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="125"
        suffix=""
        label="Reports Generated"
      />
      <card-widget
          trend="up"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix=""
          label="Active Users"
      />
      <card-widget
          trend="up"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="80000"
          suffix=""
          label="Total Credit Sold"
      />
      <card-widget
          trend="up"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="5200"
          suffix=""
          label="Avialable transferable credits"
      />

      <card-widget
          trend="up"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="21"
          suffix=""
          label="Dormant accounts"
      />
    </div>
    <div class="grid grid-cols-2 gap-6 mb-6 lg:grid-cols-2">
      <table-list title="Low Credit Clients" />
      <table-list title="Top 5 Clients" :see-all="false"/>
      <table-list title="Most Used Tests"  />
      <table-demo></table-demo>

    </div>
  </main-section>
</template>
<script>
import { computed, ref, onMounted } from 'vue'
import utility from "../../components/composition/utility";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import TitleSubBar from "@/components/TitleSubBar";
import JbButton from "@/components/JbButton";
import TableList from "@/components/TableList";

import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
} from "@mdi/js";
import TableDemo from '../../components/TableDemo.vue';

export default {
  name: "Dashboard",
  components: {
    TableList,
    TitleSubBar,
    MainSection,
    CardWidget,
    TitleBar,
    Notification,
    JbButton,
    TableDemo
  },
  setup() {
    const logoutHanlder = async () => {
       store.dispatch("auth/logoutAction", 'login')
    };

    const titleStack = ref(["Admin", "Dashboard"]);
    const darkMode = computed(() => store.state.darkMode);
    return {
      logoutHanlder,
      darkMode,
      mdiAccountMultiple,
      mdiCartOutline,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiGithub,
      mdiChartPie,
    };
  },
};
</script>
