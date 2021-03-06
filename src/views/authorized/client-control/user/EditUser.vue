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
   <div class="sticky-head">
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
   </div>
    <div class="mt-40 clear">
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
            :onEditUser="true"
            @valid="checkForValidity($event)"
            @trainingSelectionDetail="setUserDetail($event)" />
      </div>

      <!-- step == 2 -->
      <div class="flex p-4 md:mt-10" v-show="showStep ==2">
        <Assessments
            ref="assessmentsRef"
            :editUser="true"
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
    </div>

  </div>

  <!-- Bottom Navigation -->
  <sticky-footer>
    <!-- bottom navigation -->
    <div class="flex justify-center mt-1 mb-5 -ml-8">
      <div class="w-11/12 border-t-2 border-teal-600"></div>
    </div>
    <div class="flex justify-center w-11/12 mb-3">
      <div class="flex w-1/2 ml-12">
        <div>
          <psytech-button
              label="Cancel"
              type="black-small"
              @buttonWasClicked="showQuitDialog = true"
          ></psytech-button>
        </div>
        <div>
          <psytech-button
              label="Update"
              type="black-small"
              @buttonWasClicked="updateAccountUserMethod()"
          ></psytech-button>

        </div>
      </div>
      <div class="flex justify-end w-1/2">
        <div>
          <psytech-button
              label="Back"
              :type="showStep==0?'light':'black'"
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
  </sticky-footer>

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
import StickyFooter from "@/components/StickyFooter";
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
    StickyFooter
  },
  setup() {
    const store = useStore();
    const indUserDetail = (store.getters['clientControl/getIndClientUser']);
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
      userType: indUserDetail?.userType??'',
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

    // const activeTabUser = 0;
    let showStep = ref(0);

    if(indUserDetail?.activateTab){
      showStep.value = +indUserDetail.activateTab;
    }

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

  const updateUserCreditSettingMethod = ()=>{ 
    console.log("userDetailData",userDetailData)
      store
        .dispatch("clientControl/updateUserCreditSetting", {isFromEdit: true, loadCreditsFromDistributor: JSON.parse(userDetailData.creditRadioBtn) == true? false: true })
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
            loader.value = false;
            store.commit("clientControl/setIndividualClientUserDetail", null);
            const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
          } 
        })
        .catch((error) => {  }); 
    }

  const updateMethodAction = (actionName, data)=>{
     loader.value = true;
     store
      .dispatch(`clientControl/${actionName}`, data)
      .then((res) => {
        const RESPONSE_DATA = res.data;
        if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
          loader.value = false;
          if(actionName == 'updateIndCredit'){
            updateUserCreditSettingMethod()
          } else{
            store.commit("clientControl/setIndividualClientUserDetail", null);
            const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
          }
        } else {
          throw new Error(RESPONSE_DATA.data.message);
        }
      })
      .catch((error) => {
        loader.value = false;
        errorText.value = error?.message ?? "";
      });
  }

    const updateAccountUserMethod =  async() => {

      if(showStep.value ==0){
        await userDetailRef?.value?.userDetailMethod()

        if(!isInvalid.value || emailIsTaken.value){
          return
        }

        const data = {
          firstname:userDetailData?.firstname,
          familyname:userDetailData?.familyname,
          username:userDetailData?.email,
          pin:userDetailData?.pin,
          allowUpdateCredits: false,
          sharedCreditsUserID: userDetailData?.supervisor??'',
          active:userDetailData && +userDetailData.activeBlocked? false: true,
          receiveEmailNotifications: userDetailData && +userDetailData.sendNotifications?true: false
        }

      updateMethodAction('updateIndUserDetail',data)
      return true
      }

      if(showStep.value ==1){
        await trainingDetailRef?.value?.trainingDetailMethod()
        if(!isInvalid.value){
          return
        }
        updateMethodAction('updateIndUserTraining',userDetailData)
        return
      }

      if(showStep.value ==2){
        await assessmentsRef?.value?.assessmentDetailMethod()
        const data = {
          tests: userDetailData.tests,
          solution: userDetailData.solution,
          batteries: userDetailData.batteries,
        }

        updateMethodAction('updateIndUserAssessment',data)
        return
      }

      if(showStep.value ==3){
        await creditControlRef?.value?.creditControlMethod()
        if(!isInvalid.value){
          return
        }

        const data = {
          amount: +userDetailData.credits,
          currentCredits: userDetailData.currentCredits,
          updater: '',
          reference: userDetailData.purchaseId
        }

        updateMethodAction('updateIndCredit',data)

        return
      }

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
      updateMethodAction,
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
.sticky-head{
  position: fixed;
  width: 100%;
  margin: 0 auto;
  background: white;
  z-index: 1000;
  padding-bottom: 15px;
}
</style>

