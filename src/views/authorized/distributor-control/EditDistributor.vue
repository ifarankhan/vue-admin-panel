<template>
  <sticky-header :icon="mdiPencilOutline" image="true" title="Edit Distributor Account" showStepper="ture" :showStep="showStep">
      
  </sticky-header>
  <Loader v-if="form.loader" :toBeBigger="true" />
  <div class="flex w-2/3 p-4 ml-3 md:mt-6" v-if="form.error">
      <div class="w-3/4">
          <error-alert
            @dismissError="form.error = ''"
            :error="form.error"
            :showTranslatedError="false"
          />
      </div>
    </div>
      <div class="flex p-4 ml-4 md:mt-6">
      <div class="w-2/3" v-if="showStep == 0">
        <div class="mt-8 ml-3">
          <div class="flex w-11/12 -ml-2">
            <div class="w-full">
              <field label="Distributor Name" labelFor="email">
                <control
                  type="text"
                  v-model="form.distributorName"
                  placeholder=" "
                />
              </field>
            </div>
            <div class="w-full">
              <field label="Email Address/User Name" labelFor="email">
                <control
                  type="text"
                  v-model="form.distributorEmail"
                  placeholder="Email"
                />
              </field>
            </div>
          </div>
          <div class="flex w-11/12 -ml-2">
            <span class="inline-block w-full">
              <error-span :error="v$.distributorName"></error-span>
            </span>
            <span class="inline-block w-full">
              <error-span :error="v$.distributorEmail"></error-span>
            </span>
          </div>

          <!--  -->
          <div class="flex w-11/12 -ml-2">
            <div class="w-full">
              <field label="Account Address" labelFor="email">
                <control
                  type="textarea"
                  :smallTextArea="true"
                  v-model="form.distributorAddress"
                  placeholder="Name"
                />
              </field>
            </div>
          </div>
          <!--  -->

      <!--  -->
        <div class="flex w-11/12 -ml-2">
            <div class="flex w-full my-2 input-switcher">
              <span class="px-2 ml-1">Distributor Status: </span>
              <div class="ml-4"> <InputSwitch  :style="{height: '25px', widht: '30px'}" v-model="form.statusSwitcher" /> <p class="-mt-8 ml-14">{{ `${form.statusSwitcher?'Active':'In-Active'}` }}</p></div>
            </div>
        </div>
        </div>

        </div>

        <!--  -->
         <div class="w-2/3" v-if="showStep == 1">
              <div class="ml-1 font-bold text-medium md:mt-6">
                Credit Control
              </div>
              <div
                  class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200"
                  style="word-wrap: break-word"
              >
                {{accountDetail?.transferableCredits}}
              </div>
              <div class="grid w-6/12 grid-cols-2 gap-8 pb-3">
                <div class="ml-1 font-bold text-medium">Last Credit Update:</div>
                <div class="...">{{accountDetail?.lastCreditUpdate}}</div>
                <div class="ml-1 font-bold text-medium">Credit Limit:</div>
                <div class="...">{{accountDetail?.transferableCreditLimit}}</div>
              </div>

            </div>
            <div class="w-1/3">
              <span>
                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="250" height="250" viewBox="0 0 36 36.136">
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
          </div>
  <!-- </main-section> -->

  <sticky-footer>
   <div class="flex justify-center w-11/12 mb-3 pr-28">
    <div class="w-1/12 ml-12">
      <psytech-button
        label="Cancel"
        :smallYPadding="true"
        type="light-small"
        @buttonWasClicked="$router.push({name: 'distributor-control-list-detail'})"
      ></psytech-button>
    </div>
    <div class="w-11/12">
        <psytech-button
          label="Update Account"
          type="black"
          @buttonWasClicked="submit()"
        ></psytech-button>
      </div>
    <div class="flex justify-end w-11/12 mr-4">
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
          :type="showStep==1?'light':'black'"
          @buttonWasClicked="gotoNextHandler()"
        ></psytech-button>
      </div>
    </div>
  </div>
  </sticky-footer>
</template>
<script>
import { ref, reactive, computed } from "vue";
import utility from "@/components/composition/utility";
import { mdiPencilOutline  } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import Loader from "@/components/Loader.vue";
import useVuelidate from "@vuelidate/core";
import store from "../../../store/index";
import InputSwitch from 'primevue/inputswitch';
import ErrorSpan from "@/components/ErrorSpan";
import ErrorAlert from "@/components/ErrorAlert.vue";
import Tabs from '@/components/user/Tabs.vue';
import { useStore } from "vuex";
import { required, email, helpers, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "master-control-edit",
  components: {
    Divider,
    MainSection,
    CheckRadioPicker,
    InputSwitch,
    Field,
    Loader,
    Control,
    PsytechButton,
    StickyHeader,
    StickyFooter,
    ErrorSpan,
    ErrorAlert,
    Tabs,
    utility,
    useStore,
  },
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters["masterPannel/getDistributorDetail"];
    if (!accountDetail) {
      next({ name: "distributors-list" });
    }
    next();
  },
  setup() {
    let store = useStore();
    const showStep = ref(0);

    const clientName = ref("");
    const showSuccessAlert = ref(false);

   const accountDetail = computed(() => {
      return store.getters["masterPannel/getDistributorDetail"];
    });

  const gotoNextHandler = ()=>{
    if(showStep.value ==0 ){
      showStep.value = showStep.value +1;
    }
  }

  const goToBackHandler = ()=>{
    if(showStep.value ==1 ){
      showStep.value = showStep.value -1;
    }
  }

  const form = reactive({
      distributorId: accountDetail?.value?.id,
      distributorName: accountDetail?.value?.name,
      distributorEmail: accountDetail?.value?.email, 
      statusSwitcher: accountDetail?.value?.active,
      distributorAddress: accountDetail?.value?.addressLine1+ " "+ accountDetail?.value?.addressLine2+ " "+accountDetail?.value?.addressLine3+ ""+accountDetail?.value?.addressLine4,
      error: "",
      loader:false,
    });

    const rules = computed(() => {
      return {
        distributorName: {
          required: helpers.withMessage("Name is required", required),
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
        distributorEmail: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage("Email is invalid", email),
        },
      };
    });

    const v$ = useVuelidate(rules, form);
    const submit = () => {
      if (v$.value.$validate() && v$.value.$error) {
        return true;
      }
      form.error = ''
      form.loader = true;
      store
        .dispatch("masterPannel/editDistributorAccount", {
          distributorID: form.distributorId,
          name: form.distributorName,
          email: form.distributorEmail,
          status: form.statusSwitcher,
          distributorAddress: form.distributorAddress,
        })
        .then((res) => {
          if (res.data.status == 200 && res?.data?.message) {
             throw new Error(res.data.message);
          } else if(res.data.data.accountUpdatedSuccessfully){
              const { navigateTo } = utility("distributors-list");
              navigateTo();
          }
        })
        .catch((error) => {
          form.error = error?.message ?? "";
        })
        .finally(() => {
          form.loader = false;
        });
    };


    return {
      form,
      v$,
      showStep,
      showSuccessAlert,
      gotoNextHandler,
      goToBackHandler,
      submit,
      accountDetail,
      clientName,
      mdiPencilOutline,
    };
  },
};
</script>
<style>
.input-switcher .p-inputswitch.p-focus .p-inputswitch-slider {
  outline: none;
  box-shadow: none;
}
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
