<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div class="pt-10">
      <div class="grid grid-cols-2 md:px-2">
      <div class="flex items-center ml-8">
        <div
          class="flex items-center justify-center text-white bg-black rounded rounded-full cursor-pointer w-9 h-9 "
          @click="$router.push({ name: 'support-control-list' })"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div class="w-2/5 ml-3 font-bold truncate text-medium">{{ ticketData && ticketData.subject }} </div>
      </div>
    </div>
    
    <!--  -->
     <div class="flex w-3/5 px-4 mt-6 ml-10">
         <div class="flex w-2/4">
             <span class="text-sm font-bold">Creation Date:</span>
             <span class="ml-2">{{ ticketData && ticketData.createdAt.split("T")[0] }}</span>
         </div>

          <div class="flex w-2/4">
             <span class="text-sm font-bold">Creation Time:</span>
             <span class="ml-2">{{ ticketData && ticketData.createdAt.split("T")[1].split("Z")[0] }}</span>
         </div>
     </div>
    
    <!--  -->
       <div class="w-10/12 px-4 mt-8 mb-4 ml-8">
          <div class="flex items-center cursor-pointer" @click="collapsable.description = !collapsable.description">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.description ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Description :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="pl-4 mt-2"
            v-if="collapsable.description"
          >
           <div
                class="p-4 mt-2 mb-4 text-justify bg-gray-200"
                style="word-wrap: break-word"
              >
               {{ ticketData?.descriptionText }}
              </div>
          </div>
          <!--  -->
        </div>

    <!--  -->
     <div class="w-10/12 px-4 mt-8 mb-4 ml-8">
          <div class="flex items-center cursor-pointer" @click="collapsable.attachments = !collapsable.attachments">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.attachments ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Attachments :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="pl-4 mt-2 mb-6"
            v-if="collapsable.attachments && ticketData?.allImages"
          >
            <p class="mb-1 text-sm font-bold">Images : </p>
            <div class="grid grid-cols-3 gap-1 overflow-hidden">
               <div v-for="(item, index) in ticketData?.allImages" :key="index" class="h-64 p-2 border w-80">
                     <p class="ml-4 font-bold">{{ item.imageName }}</p>
                     <img :src="item.imageUrl" class="w-full h-full" />
               </div>
            </div>
            <p class="mt-6 mb-1 text-sm font-bold">Files : </p>
            <div class="mb-8">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              <div class="grid grid-cols-3 gap-1 overflow-hidden">
            <li class="inline-block h-16 p-2 mr-4 border" v-for="(item, index) in ticketData?.allFiles" :key="index">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img src="../../../assets/svgs/ticketSVG/pdf.svg"  v-if="item.fileName.split('.').pop().toLowerCase() == 'pdf'" alt="Neil image" class="w-8 h-8">
                        <img src="../../../assets/svgs/ticketSVG/word.svg"  v-if="item.fileName.split('.').pop().toLowerCase() == 'doc'" alt="Neil image" class="w-8 h-8">
                        <img src="../../../assets/svgs/ticketSVG/excel.svg"  v-if="item.fileName.split('.').pop().toLowerCase() == 'xls'" alt="Neil image" class="w-8 h-8">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{ item.fileName }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <a
                          :href="item.fileUrl"
                          target="_blank"
                          class="cursor-pointer"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="25"
                                height="25"
                                class="inline-block"
                              >
                                <path :d="mdiCloudDownloadOutline" />
                              </svg>
                            </a>
                    </div>
                </div>
            </li>
              </div>
        </ul>      
            </div>

          </div>
          <!--  -->
        </div>

  <!-- post comment -->
     <div class="w-10/12 h-56 px-4 mt-8 mb-4 ml-8">
          <div class="flex items-center cursor-pointer" @click="collapsable.attachments = !collapsable.attachments">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.attachments ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">comment :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="h-32 pl-4 mt-2 mb-6"
            v-if="collapsable.attachments && ticketData?.allImages"
          >
            <QuillEditor theme="snow" v-model:content="conversationText" contentType="text" />
            <div class="flex justify-end">
              <div>
                   <psytech-button
                    type="Secondary"
                    label="Submit"
                    @buttonWasClicked="addNoteToTicketMethod"
                  ></psytech-button>
              </div>
               <div>
                   <psytech-button
                    type="black-small"
                    label="Cancel"
                    @buttonWasClicked="''"
                  ></psytech-button>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
    <div class="w-10/12 px-4 mt-8 mb-4 ml-8">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="(item, index) in ticketData && ticketData.conversations" :key="index">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           {{ item?.body_text }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{ item?.created_at.split("T")[0]+ " "+item?.created_at.split("T")[1].split("Z")[0] }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import Loader from "@/components/Loader.vue";
import { mdiChevronDown, mdiChevronUp, mdiCloudDownloadOutline } from "@mdi/js";
import PsytechButton from "@/components/PsytechButton";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useStore } from "vuex";

export default {
    components:{
        PsytechButton,
        QuillEditor,
        Loader,
    },
    setup(props, { emit }) {
    const loader = ref(false);
    const collapsable = reactive({
      description: true,
      attachments: true
    });

    const store = useStore();
    const ticketData = ref(null);

  const geTicketDetail = ()=>{
          store
        .dispatch("freshDesk/getIndividualTicket")
        .then((res) => {
            console.log("response is....", res.data)
            const DATA = res.data;
            ticketData.value = {
                subject: DATA.subject,
                descriptionText: DATA.description_text,
                createdAt: DATA.created_at,
                customFields: DATA.custom_fields,
                attachments: DATA.attachments,
                status: DATA.status,
                priority: DATA.priority,
                requester: DATA.requester,
                conversations: DATA.conversations,
                allImages: [],
                allFiles: []
            }

        // for files
          let allImages = []
          let allFiles = []
          for(let i=0; i< DATA.attachments.length; i++){
            if(DATA.attachments[i].name){

              let filesArray = DATA.attachments[i].name;
              
               let imageExtions = ["jpg", "jpeg", "png","svg"];
                if (imageExtions.includes(filesArray.split(".").pop().toLowerCase())) {
                  allImages.push({
                      imageName: DATA.attachments[i].name,
                      imageUrl: DATA.attachments[i].attachment_url
                  });
                }else {
                   allFiles.push({
                      fileName: DATA.attachments[i].name,
                      fileUrl: DATA.attachments[i].attachment_url
                  });
                }
          } // end if

        } // end for loop
        ticketData.value.allFiles = allFiles;
        ticketData.value.allImages = allImages;
        
        })
        .catch((error) => {
          console.log("error is...", error);
        });
  } 

   onMounted(() => {
     geTicketDetail()
    });

    const conversationText = ref("");

    const addNoteToTicketMethod = ()=>{
        loader.value = true;
        store
        .dispatch("freshDesk/addNoteToTicket", {
          body: conversationText.value
        })
          .then((res) => {
            conversationText.value = " ";
            geTicketDetail()
            
          }).catch((error) => {
          }).finally(()=>{
             loader.value = false;
          })
    }

    return {
        ticketData,
        mdiChevronDown,
        conversationText,
        mdiChevronUp,
        loader,
        mdiCloudDownloadOutline,
        addNoteToTicketMethod,
        collapsable
      }
    },
}
</script>
<style>


</style>
