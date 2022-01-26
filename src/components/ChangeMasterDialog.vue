<template>
  <Loader v-if="loader" :toBeBigger="true" />
          <Dialog v-model:visible="showDialog" :style="{width: '35vw',height:'auto'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">{{ topHeaderText }}</h3>
            </template>
            <p class="text-sm font-semibold text-black w-80">Please select a Master User</p>
            <div class="flex mt-1">
                <select-option
                    :filterDropdown="userArray"
                    labelText="User Name / Email address"
                    :customeWidth="true"
                    v-model="form.changedMasterUser"
                ></select-option>
            </div>
            <p>
              <error-span :error="v$.changedMasterUser"></error-span>
            </p>
            <div class="mt-3 ml-1" v-if="masterArray">
              <p class="text-sm font-semibold text-black w-80">Current Master User</p>
              <p>{{masterArray[0].name}}</p>
              <p>{{masterArray[0].email}}</p>
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
               }

             })
             .catch((error) => {
               console.log("error is...", error);
             }).finally(()=>{
              loading.value = false;
         })
       }
      userArray.value = props.providersArray.map(item=> {
        return {
          text: item.email,
          value: item.userId
        }
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
      }
    },
}
</script>
<style>
.p-dialog-content{
  height:50vh;
}
</style>
