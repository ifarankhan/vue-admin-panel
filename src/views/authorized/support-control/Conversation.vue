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
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nisi accusamus dolor provident aliquid dolores ipsum hic voluptatibus dolorem minus est, delectus illo. Fuga impedit tempore ut ipsam provident deserunt?
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
            <p class="mb-2 text-sm font-bold">Images : </p>
            <div class="grid grid-cols-3 gap-1 overflow-hidden">
               <div v-for="(item, index) in ticketData?.allImages" :key="index" class="h-64 p-2 border w-80">
                     <p class="ml-4 font-bold">{{ item.imageName }}</p>
                     <img :src="item.imageUrl" class="w-full h-full" />
               </div>
            </div>

            <p class="mt-4 mb-2 text-sm font-bold">Files : </p>
          </div>
          <!--  -->
        </div>

</div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import Loader from "@/components/Loader.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PsytechButton from "@/components/PsytechButton";
import { useStore } from "vuex";

export default {
    components:{
        PsytechButton,
        Loader,
    },
    setup(props, { emit }) {

    const collapsable = reactive({
      description: true,
      attachments: true
    });

    const store = useStore();
    const ticketData = ref(null);

   onMounted(() => {
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
                   allImages.push({
                      imageName: DATA.attachments[i].name,
                      imageUrl: DATA.attachments[i].attachment_url
                  });
                }
          } // end if
        //   this.$set(this.allConversation[i],'allImages', allImages)
        //   this.$set(this.allConversation[i],'allFiles', allFiles)

        } // end for loop
        ticketData.value.allFiles = allFiles;
        ticketData.value.allImages = allImages;
        // console.log("all files....", ticketData.value.allFiles);
        // console.log("all images....", ticketData.value.allImages);
        
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    });

    return {
        ticketData,
        mdiChevronDown,
        mdiChevronUp,
        collapsable
      }
    },
}
</script>
<style>


</style>
