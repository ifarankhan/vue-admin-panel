<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <!-- quit-dialog -->
  <quit-dialog 
    v-if="showQuitDialog" 
    headerText="Quit Editing"
    @dialogClosed="(showQuitDialog = false)"
    @quitConfirmed="$router.push({ name: 'client-control-list-detail' })"
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
      Add User
    </h1>
    <Tabs 
    :showStep="showStep"
    :enabledClick="false"
    :userType="userDetail.userType"
    />
    
    <div class="flex w-2/3 p-4 ml-3 md:mt-6" v-if="errorText">
      <div class="w-3/4">
          <error-alert
            @dismissError="errorText = ''"
            :error="errorText"
            :showTranslatedError="false"
          />
      </div>
    </div>

    <!-- middle section step == 0 -->
    <div class="flex p-4 ml-3 md:mt-6" v-show="showStep ==0">
      <User-detail 
      ref="userDetailRef"
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
       :userType="userDetail.userType"
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
    <div class="w-1/12 ml-12">
      <psytech-button
        label="Cancel"
        type="black-small"
        @buttonWasClicked="showQuitDialog = true"
      ></psytech-button>
    </div>
    <div class="flex justify-end w-11/12">
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
      <div v-if="showStep == 3">
        <psytech-button
          label="Create User"
          type="black"
          @buttonWasClicked="addAccountUserMethod()"
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
    store.commit("clientControl/setIndividualClientUserDetail", null);
    
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
    const userDetail = reactive({
      userType: "",
      allowedToUpdateCredit: 0,
      sharedCredit: 0,
    });

    let showStep = ref(0);

    const updateUserType = (e)=>{
      // showStep.value = e;
      userDetail.userType = +e;
    if (e == 3) {
      userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 1;
    } else{
      userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 0;
     }
    }
        
    const setUserDetail = (e)=>{
      const data = _.cloneDeep(e)
      const prevData = _.cloneDeep(userDetailData) 
      userDetailData = {
        ...prevData,
        ...data
      }
      // console.log("userDetailData",userDetailData) 
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
      
      if(showStep.value ==0){
        await userDetailRef?.value?.userDetailMethod()
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

    const updateUserCreditSettingMethod = (payload)=>{
      store
        .dispatch("clientControl/updateUserCreditSetting", payload)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
            loader.value = false;
            const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
          } 
        })
        .catch((error) => {  }); 
    }

    const addAccountUserMethod =  () => {
      creditControlRef?.value?.creditControlMethod()
      if(!isInvalid.value){
        return
      }
      const data = _.cloneDeep(userDetailData)
      data.userType = Number(userDetailData.userType);

      if(!userDetailData.supervisor){
        delete data.supervisor;
      }

      delete data.currentCredits;

      if(userDetailData.userType !=3){
        data.supervisor = 0
      }

      if(+userDetailData.userType === 1 || +userDetailData.userType === 4){
        data.traininglevel = [];
        data.trainingprovider = "";
        data.trainingyear = "";
        data.trainingdetails = "";
        data.traininglevelother = "";
      }
      console.log("userDetailData",data)
      // return 
      data.sendNotifications =
        userDetailData.sendNotifications == 1 ? true : false;
      data.credits = +data?.credits;
      errorText.value = "";
      loader.value = true;
      store
        .dispatch("clientControl/postAddAccountUser", data)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
            store.commit("clientControl/setClientDetail", {
              incrementAccUser: true,
            });
            updateUserCreditSettingMethod({
              userid: RESPONSE_DATA.data.userId,
              loadCreditsFromDistributor: data.creditRadioBtn == true? false: true 
            })
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
      userDetailRef,
      assessmentsRef,
      creditControlRef,
      trainingDetailRef,
      showStep,
      isInvalid,
      userDetailData,
      emailIsTaken,
      updateUserType,
      goToBackHandler,
      gotoNextHandler,
      userDetail,
      addAccountUserMethod,
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

