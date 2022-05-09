<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div>
  <Dialog v-model:visible="showDialog" :style="{width: '30vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium text-black"> Top-up Transferable Credits </h3>
            </template>
           <div>
        <!--  -->
        <div class="flex">
            <div class="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
              
               <span class="text-lg font-bold">  {{ userData?.distributorUserName.trim().split(" ").map(item=> item[0].toUpperCase()).join("")  }} </span>
            </div>
            <div class="mt-1 ml-4">
                <p class="text-lg font-bold">{{ userData?.distributorUserName }}</p>
                <p class="text-xs">Your Credit Balance</p>
                <p class="text-xl font-black text-psytechBlue">{{ userData?.credits }}</p>
            </div>
        </div>
        <!--  -->

           <div class="mt-6">
               <field label="Credit Amount" labelFor="creditNumber">
                <control
                  v-model="transferrable.amount"
                  placeholder=" "
                />
                <error-span :error="v$.amount"></error-span>
              </field>
            </div>

          <div>
             <field label="Purchase Notes" labelFor="purchaseNotes">
              <control
                type="textarea"
                v-model="transferrable.purchaseNotes"
                placeholder="Purchase Notes"
              />
            </field>
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
                    label="SUBMIT"
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
import Loader from "@/components/Loader.vue";
import { mdiFileChartOutline, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";

import Field from "@/components/Field";
import Control from "@/components/Control";

import {helpers, required, integer} from "@vuelidate/validators";

export default {
    components:{
        Dialog,
        PsytechButton,
        Loader,
        Field,
        Control,
        ErrorSpan
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

    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    }) 
    
    const rules = computed(() => {
      return {
        amount: {
          required: helpers.withMessage("This field is required", required),
          integer: helpers.withMessage("Only integers are allowed", integer),
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
        userData,
        mdiFileChartOutline,
        toUpCreditMethod,
        mdiChevronUp,
        mdiChevronDown,
        v$,
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
</style>
