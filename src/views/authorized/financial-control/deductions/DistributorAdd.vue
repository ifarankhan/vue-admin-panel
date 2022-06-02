<template>
<Loader v-if="form.loader" :toBeBigger="true" />
  <div class="p-8">
    <sticky-header :icon="mdiPlus" title="Create Invoice Deduction">
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
        <div
            v-if="showSuccessAlert"
            class="flex items-center justify-center px-2 py-1 m-1 font-medium text-green-700 bg-white bg-green-100 border border-green-300 rounded-md "
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
            created successfully.
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

        <!--  -->
        <div class="p-4 bg-gray-200" v-if="userData.isMasterPanelUser">
          <p class="text-sm">
            <span class="font-extrabold">Note:</span>
            This invoice will be sent to the selected Distributor and the cost of item added in this invoice will be deducted from the final invoice. Example: Expenses, Over charges, etc.
          </p>
        </div>

        <form action="#">
          <div class="flex flex-wrap sm:-mx-1 md:-mx-2 lg:-mx-1 xl:-mx-px">
            <div class="w-1/5 pt-2 sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px" v-if="userData.isMasterPanelUser">
                  <select-option
                    :filterDropdown="distributors"
                    :customeWidth="true"
                    :allyMarginRight="false"
                    :emitCustomEvent="true"
                    @itemWasSelected="''"
                    v-model="form.distributorId"
                    :labelText="'Please Select Distributor'"
                    ></select-option>
                  <p>
                      <error-span :error="v$.distributorId"></error-span>
                  </p>
              </div>
            <!--  -->
              <div class="pt-2 sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px" :class="[userData.isMasterPanelUser?'w-1/5':'w-1/4']">
                  <select-option
                      :filterDropdown="itemTypeArray"
                      labelText="Item Type"
                      :customeWidth="true"
                      v-model="form.itemType"
                  ></select-option>
                  <p>
                    <error-span :error="v$.itemType"></error-span>
                </p>
              </div>
            
            <!--  -->
            <div class="pt-2 sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px"
            :class="[userData.isMasterPanelUser?'w-1/5': 'w-1/4']">
              <select-option
                  :filterDropdown="quantityArray"
                  labelText="Quantity"
                  :customeWidth="true"
                  v-model="form.quantity"
              ></select-option>
               <p>
                <error-span :error="v$.quantity"></error-span>
            </p>
            </div>

          <div class="relative -ml-2 overflow-hidden sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px"
            :class="[userData.isMasterPanelUser?'w-1/5': 'w-1/4']">
              <field label="Total Cost" labelFor="number">
                <control type="text" v-model="form.totalCost" placeholder="Total Cost" />
                <span class="absolute right-2 top-3">{{ userData.invoiceCurrency }}</span>
                <error-span :error="v$.totalCost"></error-span>
              </field>
            </div>

            <div class="ml-2 overflow-hidden sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px calendar"
            :class="[userData.isMasterPanelUser?'w-1/5': 'w-1/4']">
                <control type="date" v-model="form.date" name="expenseDate" placeholder="Expense Date" />
                <error-span :error="v$.date"></error-span>
            </div>
          </div>
          
          <!--  -->
            <div class="overflow-hidden">
              <field label="Item Description / Expense details " labelFor="accountAddress" :applyMargin="false">
                <control
                    type="textarea"
                    v-model="form.itemDescription"
                    placeholder="Item"
                />
                <error-span :error="v$.itemDescription"></error-span>
              </field>
            </div>
        
          <divider />
        </form>
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
                @buttonWasClicked="$router.push({name: 'view-deductions'})"
            ></psytech-button>
          </div>
          <div>
            <psytech-button
                label="Send"
                :type="showStep==0?'light':'black'"
                @buttonWasClicked="addDeductionsMethod()"
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
import Loader from "@/components/Loader.vue";
import StickyFooter from "@/components/StickyFooter";
import {useClientUser} from "@/components/composition/clientHelper";

export default {
  name:"FinancialControlDeductionDistributorAdd",
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
    const form = reactive({
      totalCost:"",
      itemType: "",
      quantity: "",
      date: "",
      error: "",
      distributorId: "",
      itemDescription: "",
      loader:true,
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
          form.loader = false;
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    });
    const showMsg = ref();
    const store = useStore()
    const showSuccessAlert = ref(false);
    const itemTypeArray =[
          {
            text :'Credits',
            value :'Credits',
          },
          {
            text :'Customisation',
            value :'Customisation',
          },
          {
            text :'Expenses',
            value :'Expenses',
          },
          {
            text :'Materials',
            value :'Materials',
          },
          {
            text :'Training Courses',
            value :'Training Courses',
          },
          {
            text :'Surcharge',
            value :'Surcharge',
          }
        ];
    const quantityArray =[
      {
        text :'1',
        value :1,
      },
      {
        text :'2',
        value :2,
      },
      {
        text :'3',
        value :3,
      },
      {
        text :'4',
        value :4,
      },
      {
        text :'5',
        value :5,
      },
      {
        text :'6',
        value :6,
      },
      {
        text :'7',
        value :7,
      },
      {
        text :'8',
        value :8,
      },
      {
        text :'9',
        value :9,
      },
      {
        text :'10',
        value :10,
      }
    ];

    const rules = computed(() => {
      return {
        totalCost: {
          required: helpers.withMessage("Total Cost is required", required),
          numeric: helpers.withMessage("Only numeric values are allowed", numeric),
        },
        itemType: {
          required: helpers.withMessage(
              "Item type is required",
              required
          ),
        },
        distributorId:{
          required: helpers.withMessage(
              "Please select distributor",
              required
          ),
        },
        quantity: {
          required: helpers.withMessage("This field is required", required),
        },
        date: {
            required: helpers.withMessage(
                "Date is required",
                required
            ),
        },
        itemDescription: {
          required: helpers.withMessage(
              "Item description / expense details required",
              required
          ),
        },
      };
    });

    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    });

    const v$ = useVuelidate(rules, form);
    const { formatExportDate } = useClientUser();
    const addDeductionsMethod = () => {
      v$.value.$validate();
      if (
        v$.value.totalCost.$invalid ||
        v$.value.itemType.$invalid ||
        v$.value.quantity.$invalid ||
        v$.value.date.$invalid ||
        (v$.value.distributorId.$invalid &&  userData.value.isMasterPanelUser)
      ) {
        return true;
      }

      const DATA = {
        invoiceDate: formatExportDate(form.date),
        item: form.itemType,
        price: +form.totalCost,
        quantity: form.quantity,
        description: form.itemDescription
      }
      showSuccessAlert.value = false;
      if( userData.value.isMasterPanelUser ){
        DATA.partnerId = form.distributorId
      }
      console.log("data is...", DATA)
      form.error = ''
      form.loader = true;
      store
          .dispatch("financialControl/addDeduction", DATA)
          .then((res) => {
            const RESPONSE = res.data.data
            if(RESPONSE.partnerCreditDeductionAdded){
              const { navigateTo } = utility('financial-control-deduction-list'); navigateTo();
            }else {
              showMsg.value = "Error while sending distributor credit correction";
            }
          })
          .catch((error) => {
          }).finally(()=>{
            form.loader = false;
          })

    };

    return {
      mdiPlus,
      form,
      v$,
      userData,
      itemTypeArray,
      quantityArray,
      showSuccessAlert,
      addDeductionsMethod,
      distributors,
      showMsg
    }
  }
}
</script>
<style>
.clanderField{
  height: 42px;
  margin-top: 9px;
  border: 1px solid #9ca3af4d;
  border-radius: 4px;
}
.calendar span.p-calendar {
  border: none !important;
}
</style>
