<template>
          <Dialog v-model:visible="showDialog" :style="{width: '25vw'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">{{ topHeaderText }}</h3>
            </template>
            <p class="text-sm font-semibold text-black w-80">Please select a Master User</p>
            <div class="flex mt-1">
              <div class="flex items-center justify-center w-10 h-10 text-white rounded-full" style="background-color: rgba(0, 0, 0, 0.4);">
                <select-option
                    :filterDropdown="providersArray"
                    labelText="User Name / Email address"
                    :customeWidth="true"
                    v-model="changedMasterUser"
                ></select-option>
              </div>
              <div>
                <span class="mt-1 ml-1 text-sm font-medium text-black">{{ name && name }}</span>
              </div>
            </div>
            <template #footer>
               <div class="flex justify-between">
                  <div>
                   <psytech-button
                    label="NO"
                    type="outline"
                    :extraClasses="'text-sm font-medium text-psytechBlue px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('closeDialog'),(showDialog=false)"
                  ></psytech-button>
                </div>
                 <div>
                   <psytech-button
                    label="YES"
                    type="danger"
                    @buttonWasClicked="$emit('dialogConfirmed'), (showDialog= false)"
                  ></psytech-button>
                </div>
               </div>
            </template>
        </Dialog>
</template>

<script>
import { ref } from 'vue';
import PsytechButton from "@/components/PsytechButton";
import Dialog from 'primevue/dialog';

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
      }
    },
    components:{
        Dialog,
        PsytechButton
    },
    setup() {
       const showDialog = ref(true);
       const openDialog = () => {
            showDialog.value = true;
        };
       const closeDialog = () => {
           showDialog.value = false;
        };

    return {
        showDialog,
        openDialog,
        closeDialog
      }
    },
}
</script>
