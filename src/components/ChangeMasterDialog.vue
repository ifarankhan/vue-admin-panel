<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div class="change-master-user">
  <Dialog v-model:visible="showDialog" :style="{width: '30vw',height:'auto'}" class="change-master-user" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">{{ topHeaderText }}</h3>
            </template>
      <div>
              <div class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert" v-if="showMsg">
              <strong class="font-bold">Error!</strong>
              <span class="block sm:inline">{{showMsg}}</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
            <p class="ml-2 text-sm font-semibold text-black w-80">Please select a Master User</p>
            <div class="mt-6 ml-2">
                 <select-option
                :filterDropdown="userArray"
                :customeWidth="true"
                :allyMarginRight="false"
                v-model="form.changedMasterUser"
                labelText="User Name / Email address"
                ></select-option>
            </div>
            <p class="ml-2">
              <error-span :error="v$.changedMasterUser"></error-span>
            </p>
            <div class="mt-3 ml-3" v-if="masterArray.length">
              <p class="text-sm font-semibold text-black w-80">Current Master User</p>
              <div class="flex items-center">
                <span><img class="inline-block w-12 h-12 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                <div>
                  <p>{{masterArray[0].name}}</p>
                  <p>{{masterArray[0].email}}</p>
                </div>
              </div>
            </div>
      </div>

            <template #footer>
               <div class="flex justify-between">
                  <div>
                   <psytech-button
                    label="Cancel"
                    type="outline"
                    :extraClasses="'text-sm font-medium text-psytechBlue px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('closeDialog'),(showDialog=false)"
                  ></psytech-button>
                </div>
                 <div>
                   <psytech-button
                    label="Save"
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
import SelectOption from "@/components/SelectOption";
import store from "../store/index";
import Loader from "@/components/Loader.vue";
import {useStore} from "vuex";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import {email, helpers, maxLength, minLength, numeric, required} from "@vuelidate/validators";

export default {
    props:{
        topHeaderText:{
            type: String,
            default: "Account"
        },
        name:{
            type: String,
            default: ''
        },
      providersArray:{
          type: Array,
          default:[]
      },
      currentMaster:{
          type: Array,
          default:[]
      },
      accountId:{
        type: Number,
        default:0
      }
    },
    components:{
        Dialog,
        PsytechButton,
        SelectOption,
        Loader,
        ErrorSpan
    },
    setup(props, { emit }) {
       const showDialog = ref(true);
       const showMsg = ref();
       const userArray = ref();
       const masterArray = ref();
      const form = reactive({
        changedMasterUser: "",
      });
      const store = useStore();
      const loading= ref();
       const openDialog = () => {
            showDialog.value = true;
        };
       const closeDialog = () => {
           showDialog.value = false;
        };

      const rules = computed(() => {
        return {
          changedMasterUser: {
            required: helpers.withMessage(
                "One user must be selected",
                required
            ),
          },
        };
      });
      const v$ = useVuelidate(rules, form);
       const changeMaster = ()=>{
         if (v$.value.$validate() && v$.value.$error) {
           return true;
         }
         loading.value = true;
         //console.log(props.accountId);
         //console.log(changedMasterUser.value);
         store
             .dispatch("clientControl/changeMasterUser",{
               accountId: props.accountId,
               userId: form.changedMasterUser,

             })
             .then((res) => {
               let responseArray = res?.data?.data;
               if(responseArray.updatedMasterUser){
                 closeDialog();
                 emit('refreshUserList');
               }else {
                 showMsg.value = "There is some issue with the API";
               }

             })
             .catch((error) => {
               console.log("error is...", error);
               showMsg.value = error;
             }).finally(()=>{
              loading.value = false;
         })
       }
      userArray.value = props.providersArray.map(item=> {
        return {
          text: item.email,
          value: item.userId
        }
      }).sort(function(a, b) {
        return a.text.toLowerCase() === b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
      });
      masterArray.value = props.currentMaster.map(item=> {
        return {
          name: item.firstName,
          email: item.email
        }
      });

    return {
        showDialog,
        userArray,
        masterArray,
        form,
        openDialog,
        closeDialog,
        changeMaster,
        v$,
        showMsg
      }
    },
}
</script>
<style>
.change-master-user .p-dialog-content{
  height:50vh;
}
</style>
