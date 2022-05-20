<template>
  <div class="p-8">
    <sticky-header :icon="mdiPlus" title="Create Invoice Deduction">
    </sticky-header>
    <main-section class="grid grid-cols-3 gap-4">
      <div class="col-span-3 form">
        <error-alert
            v-if="form.error"
            @dismissError="form.error = ''"
            :error="form.error"
            :showTranslatedError="false"
        />
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

        <form action="#" @submit.prevent="submit">
          <div class="flex flex-wrap  sm:-mx-1 md:-mx-2 lg:-mx-1 xl:-mx-px">

            <div class="w-1/5 sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px pt-2">
              <select-option
                  :filterDropdown="itemTypeArray"
                  labelText="Item Type"
                  :customeWidth="true"
                  v-model="form.itemType"
              ></select-option>
            </div>

            <div class="w-1/5 sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px pt-2">
              <select-option
                  :filterDropdown="quantityArray"
                  labelText="Quantity"
                  :customeWidth="true"
                  v-model="form.quantity"
              ></select-option>
            </div>

            <div class="w-1/5 overflow-hidden sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px">
              <field label="Total Cost" labelFor="number">
                <control type="number" v-model="form.totalCost" placeholder="Total Cost" />
                <error-span :error="v$.totalCost"></error-span>
              </field>
            </div>

            <div class="w-1/5 overflow-hidden sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px">
                <control type="date" v-model="form.date" name="expenseDate" placeholder="Expense Date" />
                <error-span :error="v$.date"></error-span>
            </div>

            <div class="w-4/5 overflow-hidden sm:my-1 sm:px-1 md:my-2 md:px-2 lg:my-1 lg:px-1 xl:my-px xl:px-px">
              <field label="Client Address" labelFor="accountAddress">
                <control
                    type="textarea"
                    v-model="form.accountAddress"
                    placeholder="Account Address"
                />
                <error-span :error="v$.accountAddress"></error-span>
              </field>
            </div>

          </div>


          <divider />
        </form>
      </div>
    </main-section>
  </div>
</template>
<script>

import StickyHeader from "@/components/StickyHeader";
import MainSection from "@/components/MainSection";
import Field from "@/components/Field";
import Control from "@/components/Control";
import ErrorSpan from "@/components/ErrorSpan";
import {mdiPlus} from '@mdi/js';
import { ref, reactive, computed } from "vue";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SelectOption from "@/components/SelectOption";
import utility from "@/components/composition/utility";


export default {
  name:"FinancialControlDeductionDistributorAdd",
  components:{
    StickyHeader,
    MainSection,
    Field,
    Control,
    ErrorSpan,
    SelectOption,
  },
  setup () {
    const form = reactive({
      totalCost: 0,
      itemType: "",
      quantity: "",
      date: "",
      error: "",
      loader:false,
      addAnother: false,
    });
    const showSuccessAlert = ref(false);
    const itemTypeArray =[
          {
            text :'faran',
            value :'faran',
          },
          {
            text :'this',
            value :'thsi',
          },
          {
            text :'okkk',
            value :'ok',
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
          required: helpers.withMessage("Company Name is required", required),
          minLength: minLength(4),
          maxLength: maxLength(255),
        },
        trainingprovider: {
          required: helpers.withMessage(
              "Account Details are required",
              required
          ),
          minLength: minLength(10),
          maxLength: maxLength(255),
        },
        accountAddress: {
          required: helpers.withMessage(
              "Account Address are required",
              required
          ),
          minLength: minLength(10),
          maxLength: maxLength(255),
        },
      };
    });

    const v$ = useVuelidate(rules, form);
    const submit = () => {
      if (v$.value.$validate() && v$.value.$error) {
        return true;
      }
      showSuccessAlert.value = false;
      form.error = ''
      form.loader = true;
      store
          .dispatch("clientControl/postClientDetails", {
            accountName: form.companyName,
            accountAddress: form.accountAddress,
            description: form.accountDetails,
          })
          .then((res) => {
            const RESPONSE = res?.data;
            if(RESPONSE.status == 500){
              throw new Error(RESPONSE.data.message)
            } else if (RESPONSE.data.message) {
              throw new Error(RESPONSE.data.message);
            } else if (!form.addAnother) {
              store.commit("clientControl/setClientDetail", {
                accountName: form.companyName,
                accountDescription: form.accountDetails,
                accountAddress: form.accountAddress,
                numberOfUsers: 0,
                accountId: RESPONSE.data.accountId,
                creationDate: new Date()
              });
              store.commit("clientControl/setClientDetail", {
                accountId: RESPONSE.data.accountId,
                accountName: form.companyName,
                accountDescription: form.accountDetails,
                accountAddress: form.accountAddress,
                creationDate: new Date(),
                numberOfUsers: 0,
              });
              const { navigateTo } = utility("client-control-list-detail");
              navigateTo();
            } else {
              clientName.value = form.companyName;
              showSuccessAlert.value = true;
              v$.value.$reset();
              form.companyName = "";
              form.accountDetails = "";
              form.accountAddress = "";
            }
          })
          .catch((error) => {
            form.error = error?.message ?? "";
          })
          .finally(() => {
            form.loader = false;
          });
    };

    const cancel = () => {
      const { navigateTo } = utility("dashboard");
      navigateTo();
    };


    return {
      mdiPlus,
      form,
      v$,
      itemTypeArray,
      quantityArray,
      cancel,
      showSuccessAlert,
      submit,
    }
  }
}
</script>
