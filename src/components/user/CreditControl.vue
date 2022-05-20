<template>
     <div class="w-3/4">
        <!--  -->
        <div>
          <p class="pl-4 ml-1.5 text-sm font-semibold">Credit Control</p>
          <div class="flex ml-3.5">
            <div class="w-full">
              <field label="Available Credit" labelFor="credit">
                <control
                  :disabled="true"
                  v-model="creditControl.currentCredits"
                  placeholder=" "
                />
              </field>
            </div>
            <div class="w-full">
              <psytech-button
                @buttonWasClicked="toggleCredits = true"
                :smallText="true"
                label="Update Credits"
                type="outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </psytech-button>
            </div>
          </div>
        </div>
        <!--  -->

        <div
          class="w-6/12 p-2 mt-4 ml-6 rounded-md bg-psytechLightGray"
          v-if="toggleCredits"
        >
            <field label="Update Amount" labelFor="update-amount">
              <control v-model="updateCredit.credits" placeholder=" " maxlength="4" />
            </field>

            <field label="Purchase Note" labelFor="purchaseNote">
              <control
                type="textarea"
                v-model="updateCredit.purchaseId"
                placeholder=" "
              />
            </field> 
            
          <div class="ml-3">
            <error-span :error="v$.credits"></error-span>
          </div>
        </div>

        <!--  -->
        <div class="mt-8 ml-2">
          <p class="pl-4 mb-2 text-sm font-semibold">Shared Credit</p>
          <div class="flex justify-between w-1/5 pl-4 ml-1">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                name="shared-credit"
                :disabled="true"
                v-model="creditControl.sharedCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="w-9/12 p-4 mt-8 ml-5 rounded-md bg-psytechLightGray">
        <div class="flex">
          <div>
            <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
              <path :d="mdiFileChartOutline"/>
            </svg>
          </div>
            <p class="text-base">
              <span class="font-semibold">Note:</span>
              If shared, the Master User holds all credits for the clients
              account. All users in the account will have access to this pool of
              credits.
            </p>
          </div>
        </div>

        <!--  -->
        <div class="mt-8 ml-2">
          <p class="pl-4 mb-2 text-sm font-semibold">
            Allowed to update Credit
          </p>
          <div class="flex justify-between w-1/5 pl-4 ml-1">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                :disabled="true"
                name="update-credit"
                v-model="creditControl.allowedToUpdateCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>
        
         <!--  -->
         <div class="mt-8 ml-2">
          <p class="pl-4 mb-2 text-sm font-semibold">
            Purchase Credit from: {{ indUserDetail?.loadCreditsFromDistributor }} 
          </p>
          <div class="flex flex-row mt-1 ml-4">
           <div class="w-86">
             <div class="form-check">
               <input v-model="updateCredit.creditRadioBtn" value="false" class="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
               <label class="inline-block -mt-2 text-gray-800 form-check-label aling-i-icon" for="flexRadioDefault1">
                 Psytech International <i> (Default) </i> <span style="color:gray"><icon :path="mdiAlertCircle" size="20" v-tooltip="{value:' In this case, If any user of any client updates its credit, the credit will be purchased from Psytech International and the distributer will receive the invoice for that purchase.',class:'tooltip-style'}"  /></span>
               </label>
             </div>
           </div>
           <div class="w-64 ml-16">
             <div class="form-check">
               <input v-model="updateCredit.creditRadioBtn" value="false" class="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
               <label class="inline-block -mt-2 text-gray-800 form-check-label aling-i-icon" for="flexRadioDefault2">
                 Distributor <span style="color:gray"><icon :path="mdiAlertCircle" size="20" v-tooltip="{value:'In this case, If any user of any client updates its credit, that credit will be transferred from the Distributer’s Transferable Credit Pool to that Users’ Account. But if the Distributer’s Transferable Credit Pool is empty then the credit will be purchased from Psytech International and the distributer will receive the invoice for that purchase.',class:'tooltip-style'}"  /></span>
               </label>
             </div>
           </div>
         </div>
         </div>
      </div>
</template>
<script>
import { ref, reactive, computed, watch } from "vue";
import { mdiFileChartOutline, mdiAlertCircle } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import PsytechButton from "@/components/PsytechButton";
import Icon from '@/components/Icon';
import Tooltip from 'primevue/tooltip';
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import { useStore } from "vuex";
import Control from "@/components/Control";
import SelectOption from "@/components/SelectOption.vue";
import { useClientUser } from "@/components/composition/clientHelper.js";
import {
  numeric,
  helpers,
  maxValue
} from "@vuelidate/validators";
export default {
 name: "client-control-credit-control",
 props: ['shareAndAlowCreditVal'],
 components: {
    CheckRadioPicker,
    SelectOption,
    PsytechButton,
    Tooltip,
    Field,
    Icon,
    Control,
    ErrorSpan,
  },
  directives: {
      'tooltip': Tooltip
  },
   setup (props, { emit }) {
     const store = useStore();
     const indUserDetail = (store.getters['clientControl/getIndClientUser'])?.userDetails;
     const { notifications } = useClientUser();
     const creditControl = reactive({
      currentCredits: indUserDetail?.credits??0,
      allowedToUpdateCredit: +props.shareAndAlowCreditVal,
      sharedCredit: +props.shareAndAlowCreditVal,
      creditRadioBtn: indUserDetail?.loadCreditsFromDistributor
    });
    const updateCredit = reactive({ 
      currentCredits: indUserDetail?.credits??0,
      credits: "",
      purchaseId: "",
      creditRadioBtn: true
    });

     watch(
      () => props.shareAndAlowCreditVal,
      (currentValue, _) => {
        creditControl.sharedCredit = currentValue;
        creditControl.allowedToUpdateCredit = currentValue;
      }
    );

    const toggleCredits = ref(false);
   
    const rules = computed(() => {
      return {
         credits: {
          numeric: helpers.withMessage("Numeric values are allowed", numeric),
          minValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            (val)=>{
              if(val ==0 || val  >=20){
                return true
              } else{
                return false
              }
            }
          ),
          maxValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            maxValue(1000)
          ),
        },
      }
    });

   const v$ = useVuelidate(rules, updateCredit);

   const creditControlMethod = ()=>{
      v$.value.$validate();
      if ( 
        (v$.value.credits.$invalid)
      ) {
        emit("valid", { notDone: ()=> {} })
        return true;
      }
       emit("valid", { done: ()=> {
        emit("creditControlDetail",updateCredit)
      } })
    }

    return {
        creditControlMethod,
        updateCredit,
        creditControl,
        toggleCredits,
        notifications,
        mdiFileChartOutline,
        mdiAlertCircle,
        v$
     }  
    },
}
</script>

<style>
label.aling-i-icon span{
  display:inline-block;
}
.tooltip-style .p-tooltip-text {
  width:300px;
}
</style>


