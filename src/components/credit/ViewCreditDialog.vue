<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div class="update-credit">
  <Dialog v-model:visible="showDialog" :style="{width: '35vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">{{ topHeaderText }}</h3>
            </template>
    <div>
             
      <!--  -->
      <div class="mb-4">
          <div class="flex items-center cursor-pointer" @click="collapsable.accountDetail = !collapsable.accountDetail">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                class="inline-block"
              >
                <path :d="collapsable.accountDetail ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="text-sm font-semibold">Account Details :</span>
            <div class="flex-auto ml-1 border-t-2 border-gray-300"></div>
          </div>
          <div class="pl-2 ml-6 border-l-4 border-psytechBlueBtHover" v-if="collapsable.accountDetail">
              <div class="flex mt-2 mb-2">
                  <p class="text-xs font-bold text-black w-52">Client Type:</p>
                  <p> {{ data?.clientType }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Client Name:</p>
                  <p> {{ data?.clientName }}</p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Account Admin:</p>
                  <div class="flex items-center justify-center mr-1 text-xs text-white rounded-full w-7 h-7" style="background-color: rgba(0, 0, 0, 0.4);">
                    {{ data.accountAdmin && data.accountAdmin.split(" ").map(item=> item[0]?.toUpperCase()).join("") }}
                    </div>
                  <p> {{ data?.accountAdmin && data.accountAdmin }} </p>
              </div>
              <div class="flex">
                  <p class="text-xs font-bold text-black w-52">Email:</p>
                  <p> {{ data?.email }}</p>
              </div>
          </div>
        </div>

         <div>
          <div class="flex items-center mt-6 cursor-pointer" @click="collapsable.creditDetail = !collapsable.creditDetail">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                class="inline-block"
              >
                <path :d="collapsable.creditDetail ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="text-sm font-semibold">Credit Details :</span>
            <div class="flex-auto ml-1 border-t-2 border-gray-300"></div>
            <span class="px-2 text-xs font-semibold">Available Credit: </span>
            <span class="inline-block px-2 text-xs font-semibold text-white rounded-full bg-psytechBlue"> {{ data?.creditRequested }} </span>
            <span></span>
          </div>
          <div class="pl-2 ml-6 border-l-4 border-psytechBlueBtHover" v-if="collapsable.creditDetail">
              <div class="flex my-2">
                  <p class="text-xs font-bold text-black w-52">Credit Limit:</p>
                  <p> {{ data?.creditLimit? data?.creditLimit: 'No Limit' }} </p>
              </div>
               <div class="flex my-2">
                  <p class="text-xs font-bold text-black w-52">Maximum Credit Limit:</p>
                  <p> {{ data?.maxCreditLimit? data?.maxCreditLimit: 'No Limit' }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Shared Credit:</p>
                  <p> {{ data?.sharedCredit?"Yes":"No" }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Credit Requested:</p>
                  <p>  {{ data?.creditRequested }} </p>
              </div>
             <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Credit Before Update:</p>
                  <p>  {{ data?.creditsBefore }}  </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Date of Update:</p>
                  <p> {{ data?.updateDateAndTime.split("T")[0] }} </p>
              </div>
              <div class="flex">
                  <p class="text-xs font-bold text-black w-52">Time of Update:</p>
                  <p> {{ data?.updateDateAndTime.split("T")[1].split("Z")[0] }} </p>
              </div>
          </div>

        <div class="flex items-center mt-6 cursor-pointer" @click="collapsable.purchaseDetail = !collapsable.purchaseDetail">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                class="inline-block"
              >
                <path :d="collapsable.purchaseDetail ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="text-sm font-semibold">Purchase Note :</span>
            <div class="flex-auto ml-1 border-t-2 border-gray-300"></div>
          </div>

              <div class="p-2 ml-4 rounded-md bg-psytechLightGray" v-if="collapsable.purchaseDetail">
                <div class="flex items-center">
                    <p class="text-base">
                    {{ data.purchaseNote }}
                    </p>
                </div>
            </div>
            
        </div>
        <!--  -->
           </div>
            <template #footer>
               <div class="flex mb-6">
                  <div class="ml-4">
                   <psytech-button
                    label="UPDATE CREDIT"
                    type="outline"
                    :extraClasses="'text-sm font-medium text-psytechBlue px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('openCreditDialog'),(showDialog=false)"
                  ></psytech-button>
                </div>
                 <div>
                   <psytech-button
                    label="CLOSE"
                    type="primary"
                    :extraClasses="'text-sm font-medium px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('closeDialog'),(showDialog=false)"
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
import {useStore} from "vuex";
import { mdiFileChartOutline, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";

import Field from "@/components/Field";
import Control from "@/components/Control";

import {email, helpers, maxLength, minLength, numeric, required} from "@vuelidate/validators";

export default {
    props:{
        topHeaderText:{
            type: String,
            default: "Request to Correct Credit Update"
        },
        data:{
            default: ""
        }
    },
    components:{
        Dialog,
        PsytechButton,
        Loader,
        Field,
        Control,
        ErrorSpan
    },
    setup(props, { emit }) {
      const updateCredit = reactive({
          correctCredit:"",
          correctionReason: ""
        })
      const collapsable = reactive({
          accountDetail: true,
          creditDetail: true,
          purchaseDetail: true
        })
       const showDialog = ref(true);
       const showMsg = ref();

      const store = useStore();
      const loading= ref();
       const openDialog = () => {
            showDialog.value = true;
        };
       const closeDialog = () => {
           showDialog.value = false;
        };

    return {
        showDialog,
        updateCredit,
        openDialog,
        closeDialog,
        collapsable,
        mdiFileChartOutline,
        mdiChevronUp,
        mdiChevronDown,
        showMsg
      }
    },
}
</script>
<style>
.update-credit .p-dialog-content{
  height: 70vh;
}
</style>
