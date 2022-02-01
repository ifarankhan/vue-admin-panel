<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div>
  <Dialog v-model:visible="showDialog" :style="{width: '35vw',height:'auto'}" class="update-credit" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">{{ topHeaderText }}</h3>
            </template>
           <div>
            <div>
               <field label="Please tell us the correct number of credits for this update" labelFor="creditNumber">
                <control
                  v-model="updateCredit.correctCredit"
                  placeholder=" "
                />
              </field>
            </div>
            <!--  -->
            <div class="mt-4">
               <field label="Please tell us the reason for this correction" labelFor="correction">
                <control
                  v-model="updateCredit.correctionReason"
                  placeholder=" "
                />
              </field>
            </div>
            <!--  -->
            <div class="h-12 mt-4 rounded-md bg-psytechLightGray">
                <div class="flex items-center p-2">
                <div>
                    <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
                    <path :d="mdiFileChartOutline"/>
                    </svg>
                </div>
                    <p class="text-base">
                    <span class="font-semibold">Note:</span>
                    Any correction are submitted to Psytech for approval
                    </p>
                </div>
            </div>
            <!--  -->
      <div class="mt-6 mb-4">
          <div class="flex items-center cursor-pointer" @click="collapsable.batteries = !collapsable.batteries">
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
          <div class="pl-2 ml-6 border-l-4 border-psytechBlueBtHover">
              <div class="flex mt-2 mb-2">
                  <p class="text-xs font-bold text-black w-52">Client Type:</p>
                  <p> {{ data?.clientType }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Client Name:</p>
                  <p> {{ data?.clientName }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Account Admin:</p>
                    <div class="flex items-center justify-center mr-1 text-xs text-white rounded-full w-7 h-7" style="background-color: rgba(0, 0, 0, 0.4);">
                    {{ data?.accountAdmin.split(" ").map(item=> item[0].toUpperCase()).join("") }}
                    </div>
                  <p> {{ data?.accountAdmin }} </p>
              </div>
              <div class="flex">
                  <p class="text-xs font-bold text-black w-52">Admin Email Address:</p>
                  <p> {{ data?.email }} </p>
              </div>
          </div>
        </div>

         <div>
          <div class="flex items-center cursor-pointer" @click="collapsable.batteries = !collapsable.batteries">
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
            <span class="text-sm font-semibold">Credit Details :</span>
            <div class="flex-auto ml-1 border-t-2 border-gray-300"></div>
            <span class="px-2 text-xs font-semibold">Available Credit: </span>
            <span class="inline-block px-2 text-xs font-semibold text-white rounded-full bg-psytechBlue"> {{ data?.creditRequested }} </span>
            <span></span>
          </div>
          <div class="pl-2 ml-6 border-l-4 border-psytechBlueBtHover">
              <div class="flex my-2">
                  <p class="text-xs font-bold text-black w-52">Credit Limit:</p>
                  <p> {{ data?.creditLimit }} </p>
              </div>
               <div class="flex my-2">
                  <p class="text-xs font-bold text-black w-52">Maximum Credit Limit:</p>
                  <p> {{ data?.maxCreditLimit? data?.maxCreditLimit: 'No Limit' }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Credit Requested:</p>
                  <p>  {{ data?.creditRequested }} </p>
              </div>
              <div class="flex mb-2">
                  <p class="text-xs font-bold text-black w-52">Shared Credit:</p>
                  <p>  {{ data?.sharedCredit?"Yes":"No" }} </p>
              </div>
              <div class="flex">
                  <p class="text-xs font-bold text-black w-52">Date of Update:</p>
                  <p> {{ data?.updateDateAndTime.split("T")[0] }} </p>
              </div>
          </div>
        </div>
        <!--  -->
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
                    @buttonWasClicked="changeMaster()"
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
          accountDetail: true
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

    //   const v$ = useVuelidate(rules, form);
    //    if (v$.value.$validate() && v$.value.$error) {
    //        return true;
    //      }


    return {
        showDialog,
        updateCredit,
        openDialog,
        closeDialog,
        collapsable,
        mdiFileChartOutline,
        mdiChevronUp,
        mdiChevronDown,
        // v$,
        showMsg
      }
    },
}
</script>
<style>
.update-credit .p-dialog-content{
  /* height: 30vh; */
}
</style>
