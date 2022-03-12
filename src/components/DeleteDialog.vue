<template>
          <Dialog v-model:visible="showDialog" :style="{width: 'auto', maxWidth:'35%'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">Delete {{ topHeaderText }}</h3>
            </template>
            <p class="pb-5 text-sm font-semibold text-black w-100">Are you sure you want to delete the following {{ topHeaderText }}?</p>
            <div class="flex mt-1">
              <div class="flex items-center justify-center w-10 h-10 text-white rounded-full" style="background-color: rgba(0, 0, 0, 0.4);">
               {{ name && name[0].toUpperCase() }}
              </div>
              <div class="pt-2 pl-2">
                <div class="mt-1 ml-1 text-sm font-medium text-black truncate w-80">{{ name && name }}</div>
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
