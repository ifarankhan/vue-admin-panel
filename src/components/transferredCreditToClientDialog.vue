<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div>
  <Dialog v-model:visible="showDialog" :style="{width: '30vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium text-black"> Transfer Credits to Client </h3>
            </template>
           <div>
        <!--  -->
           <div class="mt-2 ml-2">

             <div class="p-2 mb-2 rounded-md bg-psytechLightGray">
               <div class="flex items-center">
                 <p class="text-base">
                   This credit will be transferred from the transferrable credit pool
                 </p>
               </div>
             </div>
             <select-option
                :filterDropdown="clients"
                :customeWidth="true"
                :allyMarginRight="false"
                :emitCustomEvent="true"
                :loader="!clients.length"
                @itemWasSelected="fetchListOfUsers($event)"
                v-model="transferredCreditToClient.client"
                :labelText="'Please Select Client'"
                ></select-option>
            </div>
            <p>
                <error-span :error="v$.client"></error-span>
            </p>

        <!--  -->
         <div class="mt-6 ml-2">
            <select-option
                :filterDropdown="clientUsers"
                :customeWidth="true"
                :allyMarginRight="false"
                :loader="userLoader"
                :openSlectList="(!userLoader && !clientUsers.length) ? false: true"
                v-model="transferredCreditToClient.user"
                :labelText="'Please Select User'"
                ></select-option>
            </div>
            <p v-if="showDefaultUsertext" class="mt-1 ml-2 text-sm font-semibold text-red-600"> No user found in this account</p>
            <p v-if="!showDefaultUsertext">
                <error-span :error="v$.user"></error-span>
            </p>

           <div class="mt-6">
               <field label="Credit Amount" labelFor="creditNumber">
                <control
                  v-model="transferredCreditToClient.amount"
                  placeholder=" "
                />
                <error-span :error="v$.amount"></error-span>
              </field>
            </div>

          <div>
             <field label="Purchase Notes" labelFor="purchaseNotes">
              <control
                type="textarea"
                v-model="transferredCreditToClient.purchaseNote"
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
import { ref, computed, reactive, onMounted } from 'vue';
import PsytechButton from "@/components/PsytechButton";
import Dialog from 'primevue/dialog';
import Loader from "@/components/Loader.vue";
import { mdiFileChartOutline, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import SelectOption from "@/components/SelectOption.vue";
import { useStore } from "vuex";

import Field from "@/components/Field";
import Control from "@/components/Control";

import {helpers, required, numeric} from "@vuelidate/validators";

export default {
    components:{
        Dialog,
        PsytechButton,
        SelectOption,
        Loader,
        Field,
        Control,
        ErrorSpan
    },
    setup(props, { emit }) {
      const store = useStore();
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

    const transferredCreditToClient = reactive({
        client: "",
        user:"",
        amount: "",
        purchaseNote: ""
    })

    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    })

    const rules = computed(() => {
      return {
        client: {
          required: helpers.withMessage("This field is required", required),
        },
        user: {
          required: helpers.withMessage("This field is required", required),
        },
        amount: {
          required: helpers.withMessage("This field is required", required),
          numeric: helpers.withMessage("Only numeric values are allowed", numeric),
        }
      };
    });

   const clients = ref([]);
   onMounted(() => {
      store
        .dispatch("clientControl/getClientAccount")
        .then((res) => {
          let responseArray = res?.data?.data;
          clients.value = responseArray.map(item=>{
              return {
                  value: item.accountId,
                  text: item.accountName
              }
          });
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    });

    const clientUsers = ref([]);
    const userLoader = ref(false);
    const showDefaultUsertext = ref(false);
    const fetchListOfUsers = (event)=>{
        clientUsers.value = [];
        userLoader.value = true;
        showDefaultUsertext.value = false;
        transferredCreditToClient.user = "";
      store
          .dispatch("clientControl/getAccountUsers",{
            accountId: event.value
          })
          .then((res) => {
            let responseArray = res?.data?.data;
            if(!responseArray.length){
                showDefaultUsertext.value = true;
            }

             clientUsers.value = responseArray.map(item=>{
                 if(item.isMasterAccount){
                    transferredCreditToClient.user = item.userId;
                 }
              return {
                  value: item.userId,
                  email: item.email,
                  isMasterAccount: item.isMasterAccount,
                  text: item.firstName
              }
          });
          })
          .catch((error) => {
            console.log("error is...", error);
          }).finally(()=>{
            userLoader.value = false;
      })
    }

    const v$ = useVuelidate(rules, transferredCreditToClient);
    const toUpCreditMethod = ()=>{
      v$.value.$validate();
      if (
        v$.value.client.$invalid ||
        v$.value.user.$invalid ||
        v$.value.amount.$invalid
      ) {
        return true;
      }
      emit("transferCreditClientData",transferredCreditToClient)
    }

    return {
        showDialog,
        transferrable,
        openDialog,
        closeDialog,
        userLoader,
        userData,
        clients,
        clientUsers,
        showDefaultUsertext,
        mdiFileChartOutline,
        fetchListOfUsers,
        transferredCreditToClient,
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
