<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div class="">
     <div class="w-8/12 px-4 mt-8 mb-4 ml-8" v-if="showError">
     <error-alert
            @dismissError="showError = false"
            :error="`The ticket is either not there or you don't have permission`"
            :showTranslatedError="false"
          />
     </div>

      <div class="fixed z-30 grid w-7/12 h-10 grid-cols-2 px-4 py-10 -mr-4 bg-white">
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
        <div class="ml-3 font-bold text-medium">{{ ticketData && ticketData.subject }} </div>
      </div>
    </div>
  

    <!--  -->
    <div class="flex pt-14">
       <div class="w-7/12 px-4 mt-12 mb-4 ml-8">
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

     <!--  -->
     <div class="px-4 mt-8 mb-4" v-if="!showError">
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
            <div class="grid grid-cols-12 mx-auto bg-gray-200 max-w-7xl" v-if="ticketData?.allImages.length">
               <div v-for="(item, index) in ticketData?.allImages" :key="index" class="col-span-6 ml-4">
                     <p class="ml-4 font-bold break-words">{{ item.imageName }}</p>
                     <img :src="item.imageUrl" class="inline-block object-fill pb-2" />
               </div>
            </div>
            <p class="" v-else> No Image was Added</p>
            <p class="mt-6 mb-1 text-sm font-bold">Files : </p>
            <div class="mb-8" v-if="ticketData?.allFiles.length">
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
            <p class="" v-else> No File was Added</p>
          </div>
          <!--  -->
        </div>

          <!-- post comment -->
          <!-- {{ showUpdateBtn }} -->
     <div class="px-4 mt-8 mb-4" v-if="showUpdateBtn">
          <div class="flex items-center cursor-pointer" @click="collapsable.comments = !collapsable.comments">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.comments ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">comment :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="h-32 pl-4 mt-2 mb-6"
            v-if="collapsable.comments"
          >
            <QuillEditor theme="snow" v-model:content="conversationText" contentType="html" />
            <div class="flex justify-end">
              <div>
                   <psytech-button
                    type="Secondary"
                    label="Add Comment"
                    :smallYPadding="true"
                    @buttonWasClicked="addNoteToTicketMethod()"
                  ></psytech-button>
              </div>
               <div>
                   <psytech-button
                    type="black-small"
                    label="Cancel"
                    :smallYPadding="true"
                    @buttonWasClicked="clearConversation()"
                  ></psytech-button>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
    <div class="px-4 pt-8 mt-16 mb-4">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <!-- {{ ticketConversation?.length }} -->
            <li class="py-3 sm:py-4" v-for="(item, index) in ticketData && ticketConversation" :key="index">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-10 h-10 text-white rounded-full" style="background-color: rgba(0, 0, 0, 0.4);" v-if=" item && item.contactName"> {{ item.contactName[0].toUpperCase() }} </div>
                    </div>
                    <div class="flex-1 min-w-0 ml-2">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{ item?.contactName }}
                        </p>
                        <div class="text-sm text-gray-500 dark:text-gray-400" v-html="item?.body">
                        </div>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white" v-if="item && item.created_at">
                        {{ item?.created_at.split("T")[0] + " "+ item.created_at.split("T")[1].split("Z")[0] }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </div>

    <!-- Right Pannel -->
       <div class="fixed p-8 mr-20 border rounded-2xl custom-height" style="z-index: 35;">
          <div class="mt-4">
             <span class="text-sm font-bold">Ticket Status:</span>
             <span class="px-3 py-0.5 ml-2 text-sm text-white bg-green-700 rounded-md pb-1.5">{{ ticketData && fresDeskStatuses.find(item=> item.value == +ticketData.status).text }}</span>
          </div>

          <!--  -->
          <div class="mt-4">
             <span class="text-sm font-bold">Creation Date:</span>
             <span class="ml-2" >{{ formatDate(ticketData && ticketData.createdAt.split("T")[0]) }}</span>
          </div>

          <!--  -->
          <div class="mt-4">
             <span class="text-sm font-bold">Creation Time:</span>
             <span class="ml-2" v-if="ticketData && ticketData.createdAt">{{ ticketData.createdAt.split("T")[1].split("Z")[0] }}</span>
         </div>

        <!--  -->
          <div class="mt-4">
             <span class="text-sm font-bold">Client Name:</span>
             <span class="ml-2" v-if="ticketData && ticketData.createdAt">{{ ticketData.customFields.cf_client }}</span>
         </div>

        <!--  -->
          <div class="mt-4">
             <span class="text-sm font-bold">Account User:</span>
             <span class="ml-2" v-if="ticketData && ticketData.createdAt">
               {{ `${ticketData.customFields.cf_clientuser.split("-")[0]} (${ticketData.customFields.cf_clientuser.split("-")[1]})` }}
             </span>
         </div>

        <!--  -->
           <div class="flex items-center mt-6 -ml-1 cursor-pointer" @click="collapsable.assignedTo = !collapsable.assignedTo">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.assignedTo ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Assigned to :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <div class="w-3/4 mt-4 ml-2" v-if="collapsable.assignedTo">
    <label class="block">
    <input type="text" value="Psytech Support" disabled class="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "/>
  </label>
            </div>

         <!--  -->
           <div class="flex items-center mt-6 -ml-1 cursor-pointer" @click="collapsable.priority = !collapsable.priority">
            <span
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d=" collapsable.priority ? mdiChevronDown: mdiChevronUp" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Priority :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <div class="w-3/4 mt-4 ml-2" v-if="collapsable.priority">
            <select-option
                :filterDropdown="fresDeskPriorities"
                :customeWidth="true"
                :allyMarginRight="false"
                v-model="ticketPriority"
                :labelText="'Ticket Priority'"
                ></select-option>
            </div>
          <!-- priority button -->
            <div class="mt-6" v-if="showUpdateBtn">
                   <psytech-button
                    type="Secondary"
                    label="Update"
                    :smallYPadding="true"
                    @buttonWasClicked="updateTicketFields()"
                  ></psytech-button>
              </div>
        </div>
    </div>
    
</div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import Loader from "@/components/Loader.vue";
import { mdiChevronDown, mdiChevronUp, mdiCloudDownloadOutline } from "@mdi/js";
import PsytechButton from "@/components/PsytechButton";
import { QuillEditor } from '@vueup/vue-quill';
import store from "../../../store/index";
import SelectOption from "@/components/SelectOption.vue";
import { useClientUser } from "@/components/composition/clientHelper.js";
import ErrorAlert from "@/components/ErrorAlert.vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import _ from "lodash";
import Button from 'primevue/button';

export default {
    components:{
        PsytechButton,
        QuillEditor,
        SelectOption,
        ErrorAlert,
        Loader,
        Button
    },
    setup(props, { emit }) {
    const { fresDeskStatuses, formatDate, fresDeskPriorities } = useClientUser();
    const router = useRouter();
    const loader = ref(false);
    let showError = ref("");
    let ticketConversation = ref([]);

    const collapsable = reactive({
      description: true,
      attachments: true,
      comments: true,
      assignedTo: true,
      priority: true
    });

    const store = useStore();
    const ticketData = ref(null);
    const ticketPriority = ref();

   onMounted(() => {
     getIndividualTicketData()
    });

    const conversationText = ref("");
    const clearConversation = ()=>{
      let element = document.getElementsByClassName("ql-editor");
      element[0].innerHTML = "";
    }

    const isBase64 = str => {
        if (str ==='' || str.trim() ===''){ return false; }
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    const addNoteToTicketMethod = ()=>{
     pageNoForConversation.value = 1;
     ticketConversation.value = [];
     let URL;
     let route = router.currentRoute?.value?.params?.id?.split("/")[0];
     if(conversationText.value == "" || conversationText.value == "\n") return;
      try {
         if(isBase64(route))
         URL = atob(route);
         
      } catch (error) {
        console.log("error...", error)
      }

     let element = document.getElementsByClassName("ql-editor");
        loader.value = true;
        store
        .dispatch("freshDesk/addNoteToTicket", {
          body: conversationText.value,
          user_id: ticketData.value.requester,
          ticketId: +URL.split("-")[0]
        })
          .then((res) => {
            if(res.status == 201){
              loadTicketConversation();
            }
            }).catch((error) => {
          }).finally(()=>{
             element[0].innerHTML = "";
             loader.value = false;
          })
    }
  
  const pageNoForConversation = ref(1);
  const loadTicketConversation = ()=>{
      let URL;
      let route = router.currentRoute?.value?.params?.id?.split("/")[0];
      try {
         if(isBase64(route))
         URL = atob(route);
      } catch (error) {
        console.log("error...", error)
      }
      
      if(URL?.split("-")[1] != JSON.parse(localStorage.getItem("userData")).freshdeskCompanyID){
        showError.value = true;
        return
      }

      let freshDeskContacts = [];
      let freshDeskAgents = [];
      let CONVERSATIONS = [];
      // ticketConversation.value = [];

      Promise.allSettled([ 
      store.dispatch("freshDesk/getTicketConversation",{ticketId: URL?.split("-")[0], pageNo: pageNoForConversation.value }), 
      store.dispatch("freshDesk/getAllContacts"),
      store.dispatch("freshDesk/getAllAgents"),
    ]) 
    .then(async results =>{
      const [ticketConversationData, allContacts, allAgents] = results; 
      if(ticketConversationData.status== "fulfilled"){
        CONVERSATIONS = await ticketConversationData.value.data;
            if(CONVERSATIONS.length == 0){
             return
            }
            if(ticketConversation.value?.length){
              ticketConversation.value.push(...CONVERSATIONS)
            } else{
              ticketConversation.value = CONVERSATIONS;
            }
          pageNoForConversation.value += 1;
      }

      // all contacts
       if(allContacts.status== "fulfilled"){
        freshDeskContacts = await allContacts.value.data;
       } 
       
      // all agents
       if(allAgents.status== "fulfilled"){
          freshDeskAgents = await allAgents.value.data;
          freshDeskAgents = freshDeskAgents.map(item=> {
            return {
              id: item.id,
              name: item.contact.name,
              email: item.contact.email
            }
          })
       }

      //  console.log("CONVERSATIONS",CONVERSATIONS)

      const mergedContactsAndAgents = [...freshDeskContacts, ...freshDeskAgents]
      
         const formattedData =  ticketConversation.value.map(item=>{
           const itemFound = mergedContactsAndAgents.find(x=> x.id == item.user_id)
           if(itemFound){
             return {
                ...item,
                contactName: itemFound.name,
                contactEmail: itemFound.email
             }
           }
         })

        const data = _.cloneDeep(formattedData);
        ticketConversation.value = (data).sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime() );
        loadTicketConversation(); 
        // showUpdateBtn.value = false;
    }).catch(error=>{ 
      // showUpdateBtn.value = true;
      console.log("error", error) 
      }).finally(()=>{
        // loading.value = false;
      })
  }

  const showUpdateBtn = ref(false);
  const getIndividualTicketData = ()=>{
      let URL;
      let route = router.currentRoute?.value?.params?.id?.split("/")[0];
      try {
         if(isBase64(route))
         URL = atob(route);
      } catch (error) {
        console.log("error...", error)
      }
      
      if(URL?.split("-")[1] != JSON.parse(localStorage.getItem("userData")).freshdeskCompanyID){
        showError.value = true;
        return
      }
      showUpdateBtn.value = true;
      Promise.allSettled([ 
      store.dispatch("freshDesk/getIndividualTicket", {ticketId: URL?.split("-")[0] })
    ]) 
    .then(async results =>{
      const [ticketDetail] = results;
      // console.log("ticketConversation",ticketConversation)

      // ticket detail
       if(ticketDetail.status== "fulfilled"){
          const DATA = await ticketDetail.value.data;
            ticketData.value = {
                subject: DATA.subject,
                descriptionText: DATA.description_text,
                createdAt: DATA.created_at,
                customFields: DATA.custom_fields,
                attachments: DATA.attachments,
                status: DATA.status,
                priority: DATA.priority,
                requester: DATA.requester_id,
                conversations: DATA.conversations,
                allImages: [],
                allFiles: []
            }

        ticketPriority.value = +DATA.priority;
        
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

       }

      loadTicketConversation();     
    
        // showUpdateBtn.value = false;
    }).catch(error=>{ 
      // showUpdateBtn.value = true;
      console.log("error", error) 
      }).finally(()=>{
        // loading.value = false;
      })
    }

    const updateTicketFields = ()=>{
      const route =  router.currentRoute?.value?.params?.id?.split("/")[0];
      let URL;
      try {
         if(isBase64(route))
         URL = atob(route);
      } catch (error) {
        console.log("error...", error)
      }
      console.log("route",route)
       loader.value = true;

        store
        .dispatch("freshDesk/updateTicketStatus", {
          priority: ticketPriority.value,
          ticketId: +URL.split("-")[0]
        })
          .then((res) => {
            ticketPriority.value = res.data.priority;
          }).catch((error) => {
          }).finally(()=>{
             loader.value = false;
          })
    }

    return {
        ticketData,
        mdiChevronDown,
        showUpdateBtn,
        conversationText,
        fresDeskPriorities,
        loadTicketConversation,
        fresDeskStatuses,
        mdiChevronUp,
        ticketPriority,
        ticketConversation,
        loader,
        formatDate,
        showError,
        clearConversation,
        mdiCloudDownloadOutline,
        updateTicketFields,
        addNoteToTicketMethod,
        collapsable
      }
    },
}
</script>
<style scoped lang="scss">
  .custom-height {
    height: 620px;
    right: -90px;
    margin-right: 150px;
    width: 30%;
  }
 
</style>
