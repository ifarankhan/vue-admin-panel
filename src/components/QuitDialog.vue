<template>
     <Dialog v-model:visible="quitDialog" :style="{width: '25vw'}" :modal="true">
          <template #header>
              <h3 class="text-lg font-medium">{{ headerText }}</h3>
            </template>
            <p class="text-sm font-medium">Changes you made may not be saved.</p>
            <p class="mt-4 text-sm font-semibold text-black">Are you sure you want to Cancel this Operation?</p>
            <template #footer>
               <div class="flex justify-between mb-4">
                  <div>
                   <psytech-button
                    label="NO"
                    type="outline"
                    :extraClasses="'text-sm font-medium text-psytechBlue px-10  border-psytechBlue'"
                    @buttonWasClicked="$emit('dialogClosed'),(quitDialog=false)"
                  ></psytech-button>
                </div>
                 <div> 
                   <psytech-button
                    label="YES"
                    type="danger"
                    @buttonWasClicked="$emit('quitConfirmed'), (quitDialog=false)"
                  ></psytech-button>
                </div>
               </div>
            </template>
        </Dialog>
</template>
<script>
import PsytechButton from "@/components/PsytechButton";
import Dialog from 'primevue/dialog';
import { ref } from "vue";
export default {
    props:{
        headerText:{
          type: String,
          default: 'Quit Editing'
        }
    },
    name: "quit-dialog",
    components:{
        PsytechButton,
        Dialog
    },
    setup() {
        const quitDialog = ref(true); 
        const closeQuitDialog = () => {
            quitDialog.value = false;
        };

        return {
            quitDialog,
            closeQuitDialog,
        }
    },
}
</script>

<style scoped>

</style>