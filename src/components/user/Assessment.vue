<template>
     <div class="w-11/12">
        <!--  -->
        <div class="pl-4 mb-10">
          <div class="flex items-center cursor-pointer" @click="collapsable.tests = !collapsable.tests">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.tests ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Tests :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.tests"
          >
            <div v-for="(item, index) in testsArray" :key="index">
              <check-radio-picker
                name="tests-checkbox"
                v-model="item.isDefaultTest"
                setValue="another"
                :options="{ [item.testID]: item.testID }"
              />
              <p class="ml-4 text-sm">{{ item.testName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised:
                {{ item.allowedUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>

        <!--  -->
        <div class="pl-4 mb-10">
          <div class="flex items-center cursor-pointer" @click="collapsable.batteries = !collapsable.batteries">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d="collapsable.batteries ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Batteries :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.batteries"
          >
            <div v-for="(item, index) in battriesArray" :key="index">
              <check-radio-picker
                name="batteries-checkbox"
                v-model="item.isDefaultBattery"
                setValue="another"
                :options="{ [item.batteryID]: item.batteryTitle }"
              />
              <p class="ml-4 text-sm">{{ item.batteryName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised: {{ item.allowUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>

        <!--  -->
        <div class="pl-4">
          <div class="flex items-center cursor-pointer" @click="collapsable.solutions = !collapsable.solutions">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d="collapsable.solutions? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Solutions :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.solutions"
          >
            <div v-for="(item, index) in solutionsArray" :key="index">
              <check-radio-picker
                name="solution-checkbox"
                v-model="item.isDefaultBattery"
                setValue="another"
                :options="{ [item.batteryID]: item.batteryTitle }"
              />
              <p class="ml-4 text-sm">{{ item.batteryName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised: {{ item.allowUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import ErrorSpan from "@/components/ErrorSpan";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Field from "@/components/Field";
import { useStore } from "vuex";
import Control from "@/components/Control";
import IconSVG from "@/components/IconSVG.vue";
export default {
 name: "client-control-user-detail",
 components: {
    CheckRadioPicker,
    Field,
    Control,
    IconSVG,
    ErrorSpan,
  },
   setup (props, { emit }) {
    const store = useStore();
    const collapsable = reactive({
      tests: true,
      batteries: true,
      solutions: true,
    });
    const testsArray = ref([]);
    const solutionsArray = ref([]);
    const battriesArray = ref([]);

    const loadAllCollectTests = () => {
      store
        .dispatch("clientControl/getCollectTests")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            testsArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const loadAllCollectSolutions = () => {
      store
        .dispatch("clientControl/getCollectSolutions")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            solutionsArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const loadAllCollectBattries = () => {
      store
        .dispatch("clientControl/getCollectBattries")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            battriesArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    onMounted(() => {
      loadAllCollectTests();
      loadAllCollectSolutions();
      loadAllCollectBattries();
    });
    
    const assessmentDetailMethod = ()=>{
        const tests = testsArray.value
        .map((item) => item.isDefaultTest && item.testID)
        .filter((item) => item);
      const solution = solutionsArray.value
        .map((item) => item.isDefaultBattery && item.batteryID)
        .filter((item) => item);
      const batteries = battriesArray.value
        .map((item) => item.isDefaultBattery && item.batteryID)
        .filter((item) => item);
        const data = {
            tests,
            solution,
            batteries
        }
        emit("assessmentsDetail",data)
    }

    return {
        collapsable,
        solutionsArray,
        battriesArray,
        testsArray,
        mdiChevronUp,
        mdiChevronDown,
        assessmentDetailMethod
     }  
    },
}
</script>