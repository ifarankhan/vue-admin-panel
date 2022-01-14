<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <!-- quit-dialog -->
  <quit-dialog 
    v-if="showQuitDialog" 
    headerText="Quit Editing"
    @dialogClosed="(showQuitDialog = false)" 
    @quitConfirmed="onConformQuitDialog" 
  />

  <div class="p-5">
    <h1
      class="pb-3 pl-6 mt-10 ml-1 text-3xl font-normal leading-tight bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white"
    >
      <span>
        <svg viewBox="0 0 24 24" width="35" height="35" class="inline-block">
          <path :d="mdiPlus" />
        </svg>
      </span>
      Edit User
    </h1>
    <!-- {{ viewUserDetail }}  -->
    <Tabs 
    :enabledClick="true"
    :showStep="showStep"
    :userType="userDetail.userType"
    @updatedShowStep="(showStep=$event)"
    />
    
    <!-- middle section step == 0 -->
    <div class="flex p-4 ml-3 md:mt-6" v-show="showStep ==0">
      <User-detail 
      ref="userDetailRef"
      :disableUserStaus="false"
      :onUserEdit="true"
      @valid="checkForValidity($event)"
      @userTypeSelected="updateUserType($event)"
      @isEmailTaken="emailIsTaken = $event"
      @userDetail="setUserDetail($event)"
       />
    </div>

    <!-- step == 1 -->
    <div class="flex p-4 ml-2 md:mt-6" v-show="showStep ==1">
     <training-selection 
      ref="trainingDetailRef"
      @valid="checkForValidity($event)"
      @trainingSelectionDetail="setUserDetail($event)" />
    </div>

    <!-- step == 2 -->
    <div class="flex p-4 md:mt-10" v-show="showStep ==2">
      <Assessments
       ref="assessmentsRef"
       @valid="checkForValidity($event)"
       @assessmentsDetail="setUserDetail($event)" />
    </div>

    <!-- showStep == 3 -->
    <div class="flex p-4 md:mt-6" v-show="showStep ==3">
      <credit-control 
       ref="creditControlRef"
       :shareAndAlowCreditVal="userDetail.allowedToUpdateCredit"
       @valid="checkForValidity($event)"
       @creditControlDetail="setUserDetail($event)"
       />
    </div>

    <!-- bottom navigation -->
    <div class="flex justify-center mt-20 -ml-8">
      <div class="w-11/12 border-t-2 border-teal-600"></div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div class="flex justify-center w-11/12 mb-3">
    <div class="flex w-1/2 ml-12">
     <div>
      <psytech-button
        label="Cancel"
        type="dark"
        @buttonWasClicked="showQuitDialog = true"
      ></psytech-button>
     </div>
    <div>
        <psytech-button
          label="Update User"
          type="black"
          @buttonWasClicked="updateAccountUserMethod()"
        ></psytech-button>
      </div>
     </div>
    <div class="flex justify-end w-1/2">
      <div>
        <psytech-button
          label="Back"
          :type="showStep==0?'light':'dark'"
          :enabledBackBtn="true"
          @buttonWasClicked="goToBackHandler()"
        ></psytech-button>
      </div>
      <div v-if="showStep != 3">
        <psytech-button
          label="Next"
          type="black"
          @buttonWasClicked="gotoNextHandler()"
        ></psytech-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { mdiPlus } from "@mdi/js";
import MainSection from "@/components/MainSection";
import utility from "@/components/composition/utility";
import PsytechButton from "@/components/PsytechButton";
import IconSVG from "@/components/IconSVG.vue";
import Loader from "@/components/Loader.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import Tabs from '@/components/user/Tabs.vue';
import QuitDialog from '@/components/QuitDialog.vue';
import UserDetail from '@/components/user/UserDetail.vue';
import CreditControl from '@/components/user/CreditControl.vue';
import Assessments from '@/components/user/Assessment.vue';
import TrainingSelection from '@/components/user/TrainingSelection.vue';
import { useStore } from "vuex";
import _ from "lodash";
import store from "../../../../store/index";

export default {
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters["clientControl/getClientDetail"];
    if (!accountDetail) {
      next({ name: "list-page" });
    }
    next();
  },
  name: "client-control-add-user",
  components: {
    MainSection,
    UserDetail,
    QuitDialog,
    Loader,
    Tabs,
    TrainingSelection,
    Assessments,
    CreditControl,
    IconSVG,
    PsytechButton,
    ErrorAlert,
    utility,
  },
  setup() {
    const store = useStore();
    let userDetaialTabData = ref("");
    const trainingSelectionTabData = ref(null);
    const assessmentsTabData = ref(null);
    const creditControlTabData = ref(null);
    const userDetailRef = ref('');
    const assessmentsRef = ref(''); 
    const creditControlRef = ref(''); 
    const trainingDetailRef = ref('');
    let isInvalid = ref(true);
    let userDetailData = reactive(null)
    const showQuitDialog = ref(false);
    let errorText = ref("");
    let loader = ref(false);
    const emailIsTaken = ref(false);
    let viewUserDetail = ref(null);
    const userDetail = reactive({
      userType: "",
      allowedToUpdateCredit: 0,
      sharedCredit: 0,
    });

    const updateUserType = (e)=>{
    if (e == 3) {
      userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 1;
    } else{
      userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 0;
     }
    }
        
    const setUserDetail = (e)=>{
      userDetailData = e;
    }

    const checkForValidity = (e)=>{
      if(e.done){
        e.done()
        isInvalid.value = true;
      } else{
       e.notDone()
       isInvalid.value = false;
      }
    }

    const showStep = ref(0);
   
    const goToBackHandler = () => {
      if (showStep.value <= 0) {
        return;
      }

      if (showStep.value == 2) {
        if (userDetail.userType == 1 || userDetail.userType == 4) {
          showStep.value = showStep.value - 2;
          return true;
        }
      }
      showStep.value = showStep.value - 1;
    };

    const gotoNextHandler = async () => {
      if (showStep.value >= 3) {
        return true;
      }
      
      if(showStep.value ==1){
        trainingDetailRef?.value?.trainingDetailMethod()
      }
      
      if(showStep.value ==2){
        assessmentsRef?.value?.assessmentDetailMethod()
      }

      if(!isInvalid.value){
        return true
      }

      if (
        !emailIsTaken.value &&
        (userDetail.userType == 1 || userDetail.userType == 4)
      ) {
        if (showStep.value == 0) {
          showStep.value = showStep.value + 2;
          return true;
        }
      }

      if (!emailIsTaken.value) {
        showStep.value = showStep.value + 1;
      }
    };

   const onConformQuitDialog = () =>{
      store.commit("clientControl/setIndividualClientUserDetail", null);
      const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
    }

    const updateAccountUserMethod =  async() => {
      if(showStep.value ==0){
        await userDetailRef?.value?.userDetailMethod()
      }
      const data = {
        firstname:userDetailData?.firstname,
        familyname:userDetailData?.familyname,
        email:userDetailData?.email,
        pin:userDetailData?.pin,
        active:userDetailData && userDetailData.activeBlocked? true: false,
        receiveEmailNotifications: userDetailData && userDetailData.sendNotifications?true: false
      }
      loader.value = true;
       store
        .dispatch("clientControl/updateIndUserDetail", data)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
            loader.value = false;
            const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
          } else {
            throw new Error(RESPONSE_DATA.data.message);
          }
        })
        .catch((error) => {
          loader.value = false;
          errorText.value = error?.message ?? "";
        });
    };
    return {
      checkForValidity,
      userDetaialTabData,
      onConformQuitDialog,
      trainingSelectionTabData,
      assessmentsTabData,
      creditControlTabData,
      userDetailRef,
      assessmentsRef,
      creditControlRef,
      trainingDetailRef,
      showStep,
      isInvalid,
      userDetailData,
      emailIsTaken,
      viewUserDetail,
      updateUserType,
      goToBackHandler,
      gotoNextHandler,
      userDetail,
      updateAccountUserMethod,
      setUserDetail,
      loader,
      errorText,
      showQuitDialog,
      mdiPlus,
    };
  },
};
</script>
<style scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}
</style>

