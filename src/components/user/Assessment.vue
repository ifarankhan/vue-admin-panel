<template>
     <div class="w-11/12">
        <!--  -->
        <div class="pl-4 mb-10" v-if="userType && userType !== 1">
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
                v-model="testsArray[testsArray.indexOf(item)].isDefaultTest"
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
        <div class="pl-4 mb-10" v-if="userType && userType !== 1">
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
                v-model="battriesArray[battriesArray.indexOf(item)].isDefaultBattery"
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
                v-model="solutionsArray[solutionsArray.indexOf(item)].isDefaultBattery"
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
  props:{
    editUser:{
      type: Boolean,
      default: false
    },
    userType:{
      type: Number
    }
  },
   setup (props, { emit }) {
    console.log('props.userType....', props.userType)
    const store = useStore();
    const indUserDetail = store.getters['clientControl/getIndClientUser'];
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
            if(props.editUser){
              testsArray.value = RESPONSE_DATA.data.map(item=> {
                if(indUserDetail.tests.find(x=>x.testID == item.testID )){
                   return {
                    ...item,
                    isDefaultTest: true
                  }
                } else{
                   return {
                    ...item,
                    isDefaultTest: false
                  }
                }
               
              });
            } else{
               testsArray.value = RESPONSE_DATA.data;
            }
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
            if(props.editUser){ 
              solutionsArray.value = RESPONSE_DATA.data.map(item=>{
                if(indUserDetail.solutions.find(x=>x.batteryID == item.batteryID )){
                   return {
                    ...item,
                    isDefaultBattery: true
                  }
                } else{
                   return {
                    ...item,
                    isDefaultBattery: false
                  }
                }
              });
            }else{
              solutionsArray.value = RESPONSE_DATA.data;
            }
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
            if(props.editUser){ 
              battriesArray.value = RESPONSE_DATA.data.map(item=>{
                if(indUserDetail.defaultBatteries.find(x=>x.batteryID == item.batteryID )){
                   return {
                    ...item,
                    isDefaultBattery: true
                  }
                } else{
                   return {
                    ...item,
                    isDefaultBattery: false
                  }
                }
              });
            } else{
              battriesArray.value = RESPONSE_DATA.data;
            }
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
      let tests;
      let solution;
      let batteries;

      if(props.userType){
        tests = testsArray.value
        .map((item) => {
          if(item.isDefaultTest && item.testID){
            return {
              testid: item.testID,
              allowunsupervised: item.allowedUnsupervised
            }
          }
        })
        .filter((item) => item);

      // 
      batteries = battriesArray.value
        .map((item) => {
          if(item.isDefaultBattery && item.batteryID){
            return {
              batteryid: item.batteryID,
              allowunsupervised: true
            }
          }
        })
        .filter((item) => item);

    } // end if
      
      solution = solutionsArray.value
        .map((item) => {
          if(item.isDefaultBattery && item.batteryID){
            return {
              batteryid: item.batteryID,
              allowunsupervised: true
            }
          }
        })
        .filter((item) => item);

      let data;
       if(props.userType !=1){
         data = {
            tests,
            solution,
            batteries
          }
       } else {
          data = {
            tests: [],
            solution,
            batteries:[]
          }
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