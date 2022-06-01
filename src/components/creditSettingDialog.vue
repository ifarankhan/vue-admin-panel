<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div>
  <Dialog v-model:visible="showDialog" :style="{width: '50vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h2 class="text-lg font-bold text-black"> Credit Settings </h2>
            </template>
           <div>
        <!--  -->
        <div class="flex">
            <div class="mt-1">
                <p class="font-medium text-md">Purchase Credit from:</p>
            </div>
        </div>
        <!--  -->
         <div class="flex flex-row mt-4">
           <div class="w-64 mt-2">
             <div class="form-check">
               <input class="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
               <label class="inline-block text-gray-800 form-check-label aling-i-icon" for="flexRadioDefault1">
                 Psytech International <span style="color:gray"><icon :path="mdiAlertCircle" size="20" v-tooltip="{value:' In this case, If any user of any client updates its credit, the credit will be purchased from Psytech International and the distributer will receive the invoice for that purchase.',class:'tooltip-style'}"  /></span>
               </label>
             </div>
           </div>
           <div class="w-64 mt-2">
             <div class="form-check">
               <input class="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
               <label class="inline-block text-gray-800 form-check-label aling-i-icon" for="flexRadioDefault2">
                 Distributor <span style="color:gray"><icon :path="mdiAlertCircle" size="20" v-tooltip="{value:'In this case, If any user of any client updates its credit, that credit will be transferred from the Distributer’s Transferable Credit Pool to that Users’ Account. But if the Distributer’s Transferable Credit Pool is empty then the credit will be purchased from Psytech International and the distributer will receive the invoice for that purchase.',class:'tooltip-style'}"  /></span>
               </label>
             </div>
           </div>
         </div>

           </div>
            <template #footer>
               <div class="flex mb-6">
                  <div class="ml-4">
                   <psytech-button
                    label="CANCEL"
                    type="outline"
                    :extraClasses="'text-sm font-medium text-psytechBlue px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('closeDialog'),(showDialog=false)"
                  ></psytech-button>
                </div>
                 <div>
                   <psytech-button
                    label="SAVE SETTINGS"
                    type="primary"
                    :extraClasses="'text-sm font-medium px-10  border-psytechBlue'"
                    @buttonWasClicked="toUpCreditMethod()"
                  ></psytech-button>
                </div>
               </div>
            </template>
        </Dialog>
  </div>
</template>

<script>
import { ref, computed,reactive } from 'vue';
import PsytechButton from "@/components/PsytechButton";
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import Loader from "@/components/Loader.vue";
import { mdiFileChartOutline, mdiChevronDown, mdiChevronUp,mdiAlertCircle } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import Icon from '@/components/Icon';
import Field from "@/components/Field";
import Control from "@/components/Control";

import {helpers, required, numeric} from "@vuelidate/validators";


export default {
    components:{
        Dialog,
        PsytechButton,
        Loader,
        Field,
        Control,
        ErrorSpan,
        Tooltip,
        Icon
    },
    directives: {
      'tooltip': Tooltip
    },
    setup(props, { emit }) {
      const transferrable = reactive({
          amount:"",
          purchaseNotes: ""
        })
       const showDialog = ref(true);
       const showMsg = ref();

       const openDialog = () => {
            showDialog.value = true;
        };
       const closeDialog = () => {
           showDialog.value = false;
        };

       const creditPurchaseType = ref();

    const rules = computed(() => {
      return {
        amount: {
          required: helpers.withMessage("This field is required", required),
          numeric: helpers.withMessage("Only numeric values are allowed", numeric),
        }
      };
    });

    const v$ = useVuelidate(rules, transferrable);
    const toUpCreditMethod = ()=>{
      v$.value.$validate();
      if (
        v$.value.amount.$invalid
      ) {
        return true;
      }
      emit("toUpCreditData",transferrable)
        // console.log("activeBlocked",activeBlocked.value)
    }

    return {
        showDialog,
        transferrable,
        openDialog,
        closeDialog,
        mdiFileChartOutline,
        toUpCreditMethod,
        mdiChevronUp,
        mdiChevronDown,
        mdiAlertCircle,
        v$,
        creditPurchaseType,
        showMsg
      }
    },
}
</script>
<style>
.floating-input>textarea:focus~label,
.floating-input>textarea:not(:placeholder-shown)~label{
  width: 100% !important;
}
label.aling-i-icon span{
  display:inline-block;
}
.tooltip-style .p-tooltip-text {
  width:300px;
}
</style>
