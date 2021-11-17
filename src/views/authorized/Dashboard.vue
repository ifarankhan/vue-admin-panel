<template>
  <hero-bar>{{$t("Dashboard")}}</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        trend="12%"
        trend-type="up"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="512"
        label="Clients"
      />
      <card-widget
        trend="12%"
        trend-type="down"
        color="text-blue-500"
        :icon="mdiCartOutline"
        :number="7770"
        prefix="$"
        label="Sales"
      />
      <card-widget
        trend="Overflow"
        trend-type="alert"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix="%"
        label="Performance"
      />
    </div>
  </main-section>
</template>
<script>
import { computed, ref, onMounted } from 'vue'
import utility from "../../components/composition/utility";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import TitleSubBar from "@/components/TitleSubBar";
import JbButton from "@/components/JbButton";
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

export default {
  name: "Dashboard",
  components: {
    TitleSubBar,
    MainSection,
    CardWidget,
    HeroBar,
    TitleBar,
    Notification,
    JbButton,
  },
  setup() {
    const logoutHanlder = async () => {
      await localStorage.removeItem("authToken");
      const { navigateTo } = utility("login");
      navigateTo();
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
