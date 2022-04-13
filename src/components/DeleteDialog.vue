<template>
          <Dialog v-model:visible="showDialog" :style="{width: 'auto', maxWidth:'35%'}" :modal="true" @hide="$emit('closeDialog')">
          <template #header>
              <h3 class="text-lg font-medium">Delete {{ topHeaderText }}</h3>
            </template>
            <p class="pb-5 text-sm font-semibold text-black w-100">Are you sure you want to delete the following {{ topHeaderText }}?</p>
            <div class="flex mt-1">
              <div class="flex items-center justify-center w-10 h-10 text-white">
                <span  v-if="topHeaderText=='User'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 36 36">
                    <g id="Group_36687" data-name="Group 36687" transform="translate(-1443 -5)">
                      <path id="Path_145" data-name="Path 145" d="M18,0A18,18,0,1,1,0,18,18,18,0,0,1,18,0Z" transform="translate(1443 5)" fill="#f2f2f2"/>
                      <g id="Group_512" data-name="Group 512" transform="translate(1452.474 12.579)">
                        <g id="Group_511" data-name="Group 511" transform="translate(0)">
                          <circle id="Ellipse_23" data-name="Ellipse 23" cx="4.093" cy="4.093" r="4.093" transform="translate(4.436)" fill="#ddd"/>
                          <path id="Path_146" data-name="Path 146" d="M447.424,2826.3c0,2.872-3.818,4-8.528,4s-8.529-1.125-8.529-4,3.818-8.031,8.529-8.031S447.424,2823.434,447.424,2826.3Z" transform="translate(-430.367 -2809.458)" fill="#ddd"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <span v-else>
                  <svg width="50" height="50" viewBox="0 0 36 36.136">
                    <defs>
                      <linearGradient id="linear-gradient" x1="0.5" x2="0.514" y2="0.628" gradientUnits="objectBoundingBox">
                        <stop offset="0" stop-color="#103c58"/>
                        <stop offset="1" stop-color="#455080"/>
                      </linearGradient>
                    </defs>
                    <g id="Group_36418" data-name="Group 36418" transform="translate(-1418.376 -241.376)">
                      <g id="Group_872" data-name="Group 872" transform="translate(1418 241)" opacity="0.114">
                        <rect id="Rectangle_3484" data-name="Rectangle 3484" width="36" height="36" rx="5" transform="translate(0.376 0.376)" fill="url(#linear-gradient)"/>
                        <path id="Path_12665" data-name="Path 12665" d="M230.322,838.457l2.2-2.2a2.7,2.7,0,0,1,4.1,0c2.149,2.195,9.61,9.029,9.61,9.029s0,6.022,0,6.028a2.37,2.37,0,0,1-.857,1.891Z" transform="translate(-209.857 -817.853)" fill="#7a8aaf"/>
                        <path id="Path_12664" data-name="Path 12664" d="M200.984,838.69l9.634-9.107s2.331-2.5,4.527,0c.949,1.08,16.107,16.029,21.153,20.976a2.9,2.9,0,0,1-1.619.755H203.261a2.722,2.722,0,0,1-2.235-2.362Z" transform="translate(-200.608 -814.802)" fill="#cdd5e0"/>
                        <ellipse id="Ellipse_595" data-name="Ellipse 595" cx="2.991" cy="2.778" rx="2.991" ry="2.778" transform="translate(23.932 5.556)" fill="#fff"/>
                      </g>
                    </g>
                  </svg>
                </span>
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
