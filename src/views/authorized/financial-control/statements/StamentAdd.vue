<template>
<Loader v-if="statement.loader" :toBeBigger="true" />
  <div class="p-8">
    <sticky-header :icon="mdiPlus" title="Create & Send Statement">
    </sticky-header>
    <main-section class="grid grid-cols-3 gap-4">
      <div class="col-span-3 form">
        <div class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert" v-if="showMsg">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{showMsg}}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
        </div>
        <!--  -->
        <div class="p-4 bg-gray-200">
          <p class="text-sm">
            <span class="font-extrabold">Note:</span>
            This statement will be sent to the selected Sistributor only.
          </p>
        </div>

        <!--  -->
        <div class="w-11/12">
             <div class="w-4/12 pt-2 mt-4">
                  <select-option
                    :filterDropdown="distributors"
                    :customeWidth="true"
                    :allyMarginRight="false"
                    :emitCustomEvent="true"
                    :loader="false"
                    @itemWasSelected="''"
                    v-model="statement.distributorId"
                    :labelText="'Please Select Distributor'"
                    ></select-option>
                  <p>
                      <error-span :error="v$.distributorId"></error-span>
                  </p>
              </div>
        </div>
        <!--  -->
        <div class="w-11/12">
        <p class="mt-4 mb-2 ml-2 font-semibold">Please select statement period: </p>
            <div class="flex">
                <div class="ml-3 mr-6 w-60">
                  <Datepicker
                    autoApply
                    v-model="statement.fromDate"
                    :closeOnAutoApply="true"
                    :enableTimePicker="false"
                    placeholder="From Date"
                    ></Datepicker>
                    <p>
                      <error-span :error="v$.fromDate"></error-span>
                  </p>
                </div>
                <div class="w-60">
                  <Datepicker
                    autoApply
                    v-model="statement.toDate"
                    :closeOnAutoApply="true"
                    :enableTimePicker="false"
                    placeholder="To Date"
                    ></Datepicker>
                    <p>
                      <error-span :error="v$.toDate"></error-span>
                      <error-span :error="v$.toDate.toDateLimit"></error-span>
                  </p>
                </div>
            </div>
        </div>

      </div>
    </main-section>
  </div>
  <!-- Bottom Navigation -->
  <sticky-footer>
      <div class="flex justify-center mt-1 mb-5 -ml-8">
        <div class="w-11/12 border-t-2 border-teal-600"></div>
      </div>

      <div class="w-11/12 mb-3">
        <div class="flex w-1/2 ml-12">
          <div>
            <psytech-button
                label="Cancel"
                type="black-small"
                @buttonWasClicked="$router.push({name: 'view-statements'})"
            ></psytech-button>
          </div>
          <div>
            <psytech-button
                label="Create & Send"
                :type="showStep==0?'light':'black'"
                @buttonWasClicked="addStatementMethod()"
            ></psytech-button>
          </div>
        </div>
      </div>
  </sticky-footer>
</template>
<script>

import StickyHeader from "@/components/StickyHeader";
import MainSection from "@/components/MainSection";
import Field from "@/components/Field";
import Control from "@/components/Control";
import ErrorSpan from "@/components/ErrorSpan";
import {mdiPlus} from '@mdi/js';
import { ref, onMounted, reactive, computed } from "vue";
import utility from "@/components/composition/utility";
import {helpers, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import PsytechButton from "@/components/PsytechButton";
import SelectOption from "@/components/SelectOption";
import { useStore } from "vuex";
import { saveAs } from 'file-saver';
import Loader from "@/components/Loader.vue";
import StickyFooter from "@/components/StickyFooter";
import {useClientUser} from "@/components/composition/clientHelper";

export default {
  name:"FinancialControlAddStatement",
  components:{
    StickyHeader,
    StickyFooter,
    PsytechButton,
    MainSection,
    Loader,
    Field,
    Control,
    ErrorSpan,
    SelectOption,
  },
  setup () {
    const statement = reactive({
      fromDate: "",
      toDate: "",
      distributorId: "",
      loader: true
    });

    const distributors = ref([]);
    onMounted(() => {
      store
        .dispatch("masterPannel/getAllDirtributorList")
        .then((res) => {
          let responseArray = res?.data?.data;
          distributors.value = responseArray.map(item=>{
              return {
                  value: item.id,
                  text: item.name
              }
          });
          statement.loader = false;
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    });
    const showMsg = ref();
    const store = useStore()

    const rules = computed(() => {
      return {
        fromDate: {
          required: helpers.withMessage("From Date is required", required),
        },
        toDate: {
          required: helpers.withMessage("To Date is required", required),
          toDateLimit: helpers.withMessage("To Date must be greater then from date", function(val){
            return +statement.fromDate <= +val
          }),
        },
        distributorId:{
          required: helpers.withMessage(
              "Please select distributor",
              required
          ),
        }
      };
    });

    const v$ = useVuelidate(rules, statement);
    const { formatExportDate } = useClientUser();
    const addStatementMethod = () => {
      v$.value.$validate();
      if (
        v$.value.fromDate.$invalid ||
        v$.value.toDate.$invalid ||
        v$.value.distributorId.$invalid
      ) {
        return true;
      }

      const DATA = {
        startDate: formatExportDate(statement.fromDate),
        endDate: formatExportDate(statement.toDate),
        distributorId: statement.distributorId
      }
      store.commit("financialControl/setDistributorName", { distributorName: distributors.value.find(item=> item.value == statement.distributorId).text})
      statement.loader = true;
      store
          .dispatch("clientControl/exportPartnerStatement", DATA)
          .then((res) => {
            const RESPONSE = res.data.data;
            saveAs(RESPONSE.partnerStatement, 'statement.xls')
            const { navigateTo } = utility('view-statements'); navigateTo();
          })
          .catch((error) => {
          }).finally(()=>{
            statement.loader = false;
          })

    };

    return {
      mdiPlus,
      v$,
      statement,
      addStatementMethod,
      distributors,
      showMsg
    }
  }
}
</script>

