<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div>
  <Dialog v-model:visible="showDialog" :style="{width: '40vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
     <Loader v-if="loader" :toBeBigger="true" />
          <template #header>
              <h3 class="text-lg font-medium text-black"> Create a Ticket</h3>
            </template>
           <div>
        <!--  -->
           <div class="mt-6">
             <field label="Subject" labelFor="subject">
               <control
                   v-model="ticket.subject"
                   placeholder=" "
               />
               <error-span :error="v$.subject"></error-span>
             </field>
           </div>
           <div class="mt-6 ml-2">
            <select-option
                :filterDropdown="clients"
                :customeWidth="true"
                :allyMarginRight="false"
                :emitCustomEvent="true"
                :loader="!clients.length"
                @itemWasSelected="fetchListOfUsers($event)"
                v-model="ticket.client"
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
                v-model="ticket.user"
                :labelText="'Please Select User'"
                ></select-option>
            </div>
            <p v-if="showDefaultUsertext" class="mt-1 ml-2 text-sm font-semibold text-red-600"> No user found in this account</p>
            <p v-if="!showDefaultUsertext">
                <error-span :error="v$.user"></error-span>
            </p>
      <!--  -->
        <div class="mt-6 ml-2">
            <select-option
                :filterDropdown="fresDeskStatuses"
                :customeWidth="true"
                :allyMarginRight="false"
                v-model="ticket.status"
                :labelText="'Ticket Status'"
                ></select-option>
            </div>

      <!--  -->
        <div class="mt-6 ml-2">
            <select-option
                :filterDropdown="fresDeskPriorities"
                :customeWidth="true"
                :allyMarginRight="false"
                v-model="ticket.priority"
                :labelText="'Ticket Priority'"
                ></select-option>
            </div>

          <div>
             <field label="Ticket Details" labelFor="ticketDetails">
              <control
                type="textarea"
                v-model="ticket.details"
                placeholder="Ticket Details"
              />
            </field>
          </div>
           <p>
              <error-span :error="v$.details"></error-span>
          </p>
           <div class="m-2">
               <control
                   type="imageupload"
                   @imagesUploaded="(ticket.attachments = $event)"
                   placeholder=" "
               />
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
                    @buttonWasClicked="ticketMethod"
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
import { useClientUser } from "@/components/composition/clientHelper.js";

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
       const { fresDeskStatuses, fresDeskPriorities } = useClientUser();
      const store = useStore();

       const showDialog = ref(true);
       const showMsg = ref();
       const loader = ref(false);

       const openDialog = () => {
            showDialog.value = true;
        };
       const closeDialog = () => {
           showDialog.value = false;
        };

    const ticket = reactive({
        subject: "",
        details: "",
        client: "",
        user:"",
        status: 2,
        priority: 1,
        due_by: '',
        attachments: null
    })

    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    })

   const clients = ref([]);
   onMounted(() => {
      store
        .dispatch("freshDesk/getClientAccountForSupport")
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
        ticket.user = "";
      store
          .dispatch("freshDesk/getClinetAccountUsersForSupport",{
            accountId: event.value
          })
          .then((res) => {
            let responseArray = res?.data?.data;
            console.log("responseArray", responseArray)
            if(!responseArray.length){
                showDefaultUsertext.value = true;
            }

             clientUsers.value = responseArray.map(item=>{
                 if(item.isMasterAccount){
                   ticket.user = item.userId;
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
    
    const rules = computed(() => {
      return {
        subject: {
          required: helpers.withMessage("This field is required", required),
        },
        details: {
          required: helpers.withMessage("This field is required", required),
        },
        client: {
          required: helpers.withMessage("This field is required", required)
        },
        user: {
          required: helpers.withMessage("This field is required", required)
        }
      };
    });
    const v$ = useVuelidate(rules, ticket);
    const ticketMethod = ()=>{
      v$.value.$validate();
      if (
        v$.value.subject.$invalid ||
        v$.value.details.$invalid ||
        v$.value.client.$invalid ||
        v$.value.user.$invalid
      ) {
        return true;
      }
      // extract client name
      ticket.client = (clients.value.filter(item=> {
        return item.value == ticket.client
      })[0]).text

      // extract user name
     const selectedUser = (clientUsers.value.filter(item=> {
        return item.value == ticket.user
      })[0])
      ticket.user = selectedUser.text + "-"+ selectedUser.email
      loader.value = true;
      emit("ticketData",ticket)
    }

    return {
        showDialog,
        openDialog,
        closeDialog,
        userLoader,
        loader,
        userData,
        clients,
        fresDeskPriorities,
        fresDeskStatuses,
        clientUsers,
        showDefaultUsertext,
        mdiFileChartOutline,
        fetchListOfUsers,
        ticket,
        ticketMethod,
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
.p-fileupload-buttonbar > :nth-child(2) {
  display: none !important;
}
.p-fileupload-choose:not(.p-disabled):active,
.p-fileupload-choose:not(.p-disabled):hover{
  background: #008ac0;
  color: #ffffff;
  border-color: #1baae1;
}
.p-button {
  color: #ffffff;
  background: #1baae1;
  border: 1px solid #1baae1;
  padding: 4px 20px;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 25px;
}
.ticket-due-date ::placeholder, .ticket-due-date svg {
  color: #008ac0;
  font-size: 0.75rem;
  font-weight: 600;
}
.p-button:enabled:hover {
  background: #008ac0;
  color: #ffffff;
  border-color: #1baae1;
}

</style>
