<template>
  <div class="p-5">
      <h1 class="pb-3 pl-6 mt-10 ml-1 text-2xl font-normal leading-tight bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white">
      <span>
        <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
        <path :d="mdiPlus"/>
      </svg>
      </span>
        Add User
      </h1>
    <div class="flex p-4 mx-4">
      <div class="flex items-center w-6">
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600 "
        ></div>
      </div>
      <div class="flex items-center w-2/4">
        <div class="relative flex items-center text-xs font-semibold" :class="[showStep !=0 ?'text-gray-800 text-opacity-50':'']">
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-teal-600 rounded-full"
            :class="[showStep ==0 ?'bg-black text-white': 'text-gray-800 text-opacity-50']"
          >
            1
          </div>
          <div
            class="absolute top-0 w-32 mt-10 -ml-12 text-center"
          >
            User Detail
          </div>
        </div>
        <div
          class="flex-auto border-t-2 border-teal-600 "
        ></div>
        <div class="relative flex items-center text-xs font-semibold" :class="[showStep !=1 ?'text-gray-800 text-opacity-50':'']">
          <div
            class="flex items-center justify-center w-8 h-8 py-3 bg-teal-600 border-2 border-teal-600 rounded-full"
            :class="[showStep ==1 ?'bg-black text-white': 'text-gray-800 text-opacity-50']"
          >
            2
          </div>
          <div
            class="absolute top-0 w-32 mt-10 -ml-10 text-center"
          >
            Training Selection
          </div>
        </div>
        <div
          class="flex-auto border-t-2 border-gray-300 "
        ></div>
        <div class="relative flex items-center text-xs font-semibold" :class="[showStep !=2 ?'text-gray-800 text-opacity-50':'']">
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 rounded-full"
            :class="[showStep ==2 ?'bg-black text-white': 'text-gray-800 text-opacity-50']"
          >
            3
          </div>
          <div
            class="absolute top-0 w-32 mt-10 -ml-10 text-center"
          >
            Integration
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300 "
        ></div>
        <div class="relative flex items-center text-xs font-semibold" :class="[showStep !=3 ?'text-gray-800 text-opacity-50':'']">
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-gray-300 rounded-full"
            :class="[showStep ==3 ?'bg-black text-white': 'text-gray-800 text-opacity-50']"
          >
            4
          </div>
          <div
            class="absolute top-0 w-32 mt-10 -ml-10 text-center "
          >
            Training
          </div>
        </div>
      </div>
      <div class="flex items-center w-5/12">
        <div
          class="flex-auto border-t-2 border-teal-600 "
        ></div>
      </div>
    </div>
    
    <!-- middle section step == 0 -->
        <div class="flex p-4 md:mt-6" v-show="showStep == 0">
      <div class="w-2/3">
        <!--  -->
        <div>
          <p class="pl-4 mb-2 text-sm font-semibold">User Type:</p>
          <div class="flex justify-between w-11/12 pl-4">
            <div v-for="(type, value) in userTypes" :key="value">
              <check-radio-picker
                name="user-types"
                v-model="userDetail.userType"
                type="radio"
                :options="{ [value]: type }"
              />
            </div>
          </div>
        </div>
        <!--  -->
        <div class="mt-8">
          <p class="pl-4 mb-2 text-sm font-semibold">User Status:</p>
          <div class="flex justify-between w-2/5 pl-4">
            <div v-for="(item, index) in activeBlockList" :key="index">
              <check-radio-picker
                name="active-block"
                v-model="activeBlocked"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="mt-10">
          <p class="pl-4 mb-2 text-sm font-semibold">User Details:</p>
          <div class="flex w-9/12 pl-1">
            <div class="w-full">
              <field label="First Name" labelFor="email">
                <control
                  type="text"
                  v-model="userDetail.firstname"
                  placeholder=" "
                />
              </field>
            </div>
            <div class="w-full">
              <field label="Family Name" labelFor="email">
                <control
                  type="text"
                  v-model="userDetail.familyname"
                  placeholder="Email"
                />
              </field>
            </div>
          </div>
          <!--  -->
          <div class="flex w-9/12 pl-1">
            <div class="w-full">
              <field label="User Name/ Email Address" labelFor="email">
                <control
                  type="text"
                  v-model="userDetail.email"
                  placeholder="Name"
                />
              </field>
            </div>
          </div>
          <!--  -->
          <div class="flex w-9/12 pl-1">
            <div class="w-full">
              <field label="Password" labelFor="password">
                <control
                  @iconWasClicked="tooglePasswordIcon = !tooglePasswordIcon"
                  :icon="tooglePasswordIcon ? mdiEye : mdiEyeOff"
                  :type="tooglePasswordIcon?'text':'password'"
                  v-model="userDetail.password"
                  placeholder="password"
                />
              </field>
            </div>
            <div class="w-full">
              <field label="Pin" labelFor="pin">
                <control
                  @iconWasClicked="tooglePinIcon = !tooglePinIcon"
                  :icon="tooglePinIcon ? mdiEye : mdiEyeOff"
                  :type="tooglePinIcon?'text':'password'"
                  v-model="userDetail.pin"
                  placeholder="pin"
                />
              </field>
            </div>
          </div>

          <!--  -->
          <div class="mt-8">
            <p class="pl-4 mb-2 text-sm font-semibold">
              Receive Email Notification:
            </p>
            <div class="flex justify-between w-2/5 pl-4"> 
            <div v-for="(type, value) in notifications" :key="value">
              <check-radio-picker
                name="send-notification"
                v-model="userDetail.sendNotifications"
                type="radio"
                :options="{ [value]: type }"
              />
            </div>
            
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>

      <!-- step == 1 -->
    <div class="flex p-4 md:mt-6" v-show="showStep == 1">
      <div class="w-2/3">
        <!--  -->
        <div class="pl-4">
          <p class="mb-2 text-sm font-semibold">
            Select Training / Qualification Type:
          </p>
          <div v-for="(item, index) in trainingArray" :key="index" class="mb-4">
            <check-radio-picker
              name="sample-checkbox"
              v-model="item.selected"
              setValue="another"
              :options="{ another: item.text }"
            />
            <span class="ml-6 text-sm">{{ item.description }}</span>
          </div>
        </div>
        <!--  -->

        <div class="pl-5 mt-12">
          <p class="text-sm font-semibold">Add a Training Providers:</p>
          <div class="flex w-10/12 pl-1">
            <div class="w-full">
              <select-option
                :filterDropdown="filterDropdown"
                labelText="Name / Email address"
                :customeWidth='true'
                v-model="selectedNameFilter"
              ></select-option>
            </div>

            <div class="w-full">
              <select-option
                :filterDropdown="filterDropdown"
                labelText="Year of Training"
                v-model="selectedNameFilter"
                :customeWidth='true'
              ></select-option>
            </div>
          </div>

          <!--  -->
          <div class="mt-6">
            <div class="flex inline-block w-2/4 mt-4 ml-2">
              <img class="inline-block object-cover w-12 h-12 rounded-full" src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
              <div class="inline-block ml-2">
                <p class="text-sm font-bold">John Doe</p>
                <p class="text-sm opacity-50"> Personality Assessment Trainer </p>
              </div>
              
              <span class="ml-4 cursor-pointer">
                <IconSVG
                :applyClass="true"
                @iconWasClicked="(accountName = '')"
              />
            </span>
            <span class="text-xs opacity-50 cursor-pointer"> Remove </span>
            </div>
          </div>

          <!--  -->
          <div class="mt-8">
             <field label="Account Address" labelFor="accountAddress">
              <control
                type="textarea"
                v-model="form.accountAddress"
                placeholder="Account Address"
              />
              <error-span :error="v$.accountAddress"></error-span>
            </field>
          </div>
        </div>
      </div>
    </div>
    <!-- step == 2 -->
    <div class="flex p-4 md:mt-16" v-show="showStep == 2">
      <div class="w-11/12">
        <!--  -->
        <div class="pl-4 mb-10">
          <div class="flex items-center">
             <span>
                <svg viewBox="0 0 24 24" width="25" height="25" class="inline-block">
                  <path :d="mdiChevronDown"/>
                </svg>
             </span>
             <span class="-ml-0.5 text-sm font-semibold">Tests :</span>
             <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div class="flex pl-4 mt-2">
            <div v-for="(item, index) in testsArray" :key="index" class="w-1/5 mb-4 mr-8"> 
              <check-radio-picker
                name="sample-checkbox"
                v-model="item.selected"
                setValue="another"
                :options="{ another: item.text }"
              />
              <p class="ml-4 text-sm">{{ item.description }}</p>
            </div>
          </div>
          <!--  -->
        </div>
        
        <!--  -->
         <div class="pl-4 mb-10">
          <div class="flex items-center">
             <span>
                <svg viewBox="0 0 24 24" width="25" height="25" class="inline-block">
                  <path :d="mdiChevronDown"/>
                </svg>
             </span>
             <span class="-ml-0.5 text-sm font-semibold">Batteries :</span>
             <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div class="flex pl-4 mt-2">
            <div v-for="(item, index) in testsArray" :key="index" class="w-1/5 mb-4 mr-8"> 
              <check-radio-picker
                name="sample-checkbox"
                v-model="item.selected"
                setValue="another"
                :options="{ another: item.text }"
              />
              <p class="ml-4 text-sm">{{ item.description }}</p>
            </div>
          </div>
          <!--  -->
        </div>

           <!--  -->
         <div class="pl-4">
          <div class="flex items-center">
             <span>
                <svg viewBox="0 0 24 24" width="25" height="25" class="inline-block">
                  <path :d="mdiChevronDown"/>
                </svg>
             </span>
             <span class="-ml-0.5 text-sm font-semibold">Solutions :</span>
             <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div class="flex pl-4 mt-2">
            <div v-for="(item, index) in testsArray" :key="index" class="w-1/5 mb-4 mr-8"> 
              <check-radio-picker
                name="sample-checkbox"
                v-model="item.selected"
                setValue="another"
                :options="{ another: item.text }"
              />
              <p class="ml-4 text-sm">{{ item.description }}</p>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>


    <!-- showStep == 3 -->
    <div class="flex p-4 md:mt-6" v-show="showStep == 3">
      <div class="w-3/4">
        <!--  -->
        <div>
          <p class="pl-4 mb-2 text-sm font-semibold">Credit Control:</p>
          <div class="flex">
             <div class="w-full">
              <field label="Available Credit" labelFor="credit">
                <control
                  v-model="userDetail.credits"
                  placeholder=" "
                />
              </field>
             </div>
             <div class="w-full">
              <psytech-button
                @buttonWasClicked="(toggleCredits = true)"
                label="Update Credits"
                type="outline"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </psytech-button>
             </div>
          </div>
        </div>
        <!--  -->

        <div class="p-4 mt-4 ml-2 rounded-md bg-psytechLightGray" v-if="toggleCredits">
          <div class="flex">
             <div class="w-2/5">
              <field label="Update Amount" labelFor="update-amount">
                <control
                  v-model="updateCredit.updateAmount"
                  placeholder=" "
                />
              </field>
             </div>
            <div class="w-2/5">
              <field label="Purchase ID" labelFor="purchase-id">
                <control
                  v-model="updateCredit.purchaseId"
                  placeholder=" "
                />
              </field>
             </div>
             <div>
               <psytech-button label="Cancel" type="dark" @buttonWasClicked="(toggleCredits = false)"></psytech-button>
             </div>
             <div>
                <psytech-button label="Update Credit" type="black" extraClasses="pl-6 pr-6" @buttonWasClicked="gotoNextHandler()"></psytech-button>
             </div>
          </div>
        </div>

        <!--  -->
        <div class="mt-8">
          <p class="pl-4 mb-2 text-sm font-semibold">Shared Credit:</p>
          <div class="flex justify-between w-1/5 pl-4">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                name="shared-credit"
                v-model="sharedCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="w-2/4 p-4 mt-8 ml-2 rounded-md bg-psytechLightGray">
          <p class="text-xs font-medium leading-4"><span class="text-sm font-semibold">Note:</span>
            If shared, the Master User holds all credits for the clients account. All users in the account will have access to this pool of credits.
          </p>
        </div>

        <!--  -->
        <div class="mt-8">
          <p class="pl-4 mb-2 text-sm font-semibold">Allowed to update Credit:</p>
          <div class="flex justify-between w-1/5 pl-4">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                name="update-credit"
                v-model="allowedToUpdateCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="mt-8">
          <p class="pl-4 mb-2 text-sm font-semibold">Monthly Update Limit:</p>
          <div class="w-2/5">
              <field label="Monthly Update Limit" labelFor="credit">
                <control
                  v-model="userDetail.credits"
                  placeholder=" "
                />
              </field>
            </div>
        </div>

      </div>
    </div>

    <!-- bottom navigation -->
    <div class="flex justify-center mt-20 -ml-8">
      <div class="w-11/12 border-t-2 border-teal-600"></div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div class="flex justify-center w-11/12">
    <div class="w-1/12 ml-12">
      <psytech-button label="Cancel" type="dark" 
      @buttonWasClicked="
              $router.push({ name: 'list-page' })
            "></psytech-button>
    </div>
    <div class="flex justify-end w-11/12">
      <div>
        <psytech-button label="Back" type="light" @buttonWasClicked="goToBackHandler()"></psytech-button>
      </div>
      <div>
        <psytech-button label="Next" type="black" @buttonWasClicked="gotoNextHandler()"></psytech-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import utility from "@/components/composition/utility";
import { mdiPlus, mdiEyeOff, mdiEye, mdiChevronDown } from "@mdi/js";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import FilePicker from "@/components/FilePicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import IconSVG from "@/components/IconSVG.vue";
import TitleSubBar from "@/components/TitleSubBar";
import { minLength, helpers, required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import SelectOption from "@/components/SelectOption.vue";
import ErrorSpan from "@/components/ErrorSpan";

export default {
  name: "client-control-details",
  components: {
    TitleSubBar,
    Divider,
    MainSection,
    FilePicker,
    CheckRadioPicker,
    SelectOption,
    CardComponent,
    TitleBar,
    Field,
    Control,
    IconSVG,
    PsytechButton,
    StickyHeader,
    StickyFooter,
    ErrorSpan,
    utility,
  },
  setup() {
    const form = reactive({
      companyName: "",
      accountDetails: "",
      accountAddress: "",
      error: "",
      loader: false,
      addAnother: "another",
    });

    const showStep = ref(0)
    const filterDropdown = reactive([
      {
        text: "Is equal to",
        value: "isEqualTo",
      },
      {
        text: "Is not equal to",
        value: "isNotEqualTo",
      },
      {
        text: "Starts with",
        value: "startsWith",
      },
      {
        text: "Contains",
        value: "contains",
      },
      {
        text: "Does not contain",
        value: "notContain",
      },
      {
        text: "Ends With",
        value: "endsWith",
      },
    ]);

    let selectedNameFilter = ref("");
    const goToBackHandler = ()=>{
      if(showStep.value <= 0){
        return 
      }
     showStep.value = showStep.value - 1;
    }

    const gotoNextHandler = ()=>{
      if(showStep.value >= 3){
        return
      }
     showStep.value = showStep.value + 1;
    }

    const trainingArray = reactive([
      {
        text: "Test User Personality & Ability (TUP & TUA) or Psytech Test Certificate (PTC)",
        value: "All",
        selected: false,
        description: "Access to all assessments",
      },
      {
        text: "Test User Personality TUP",
        value: "TUP",
        selected: false,
        description:
          "Allow the new GS2020 account to have access to all Personality assessments",
      },
      {
        text: "Test User Ability TUA",
        value: "TUA",
        selected: false,
        description:
          "Allow the new account to have access to all Reasoning/Ability and Solutions",
      },
      {
        text: "Assistant Test User ATU",
        value: "ATU",
        selected: false,
        description:
          "Allow the new user to only administer/Invite respondents to complete Psytech assessments",
      },
    ]);

    const testsArray = reactive([
      {
        text: "15 FQ",
        value: "All",
        selected: false,
        description: "Fifteen Factor Questionarie Plus",
      },
      {
        text: "Supporting Emotional Intelligence in the Workplace",
        value: "TUP",
        selected: false,
        description:
          "Fifteen Factor Ideal Profile Questionarie",
      },
      {
        text: "Supporting Emotional Intelligence in the Workplace",
        value: "TUP",
        selected: false,
        description:
          "Fifteen Factor Ideal Profile Questionarie",
      },
      {
        text: "Supporting Emotional Intelligence in the Workplace",
        value: "TUP",
        selected: false,
        description:
          "Fifteen Factor Ideal Profile Questionarie",
      },
    ]);

    const titleStack = ref(["Admin", "Forms"]);
    const refBox = ref(false);
    const userTypes = reactive([
      "Professional",
      "Solution",
      "Training",
      "Test admin",
      "Integration",
    ]);
    const activeBlockList = reactive([
      "Active",
      "Blocked"
    ])
    const activeBlocked = ref(1)
    const notifications = reactive(["No", "Yes"]);
    const sharedCredit = ref('')
    const allowedToUpdateCredit = ref('')

    const userDetail = reactive({
      userType: "",
      firstname: "",
      familyname: "",
      email: "",
      password: "",
      pin: "",
      credits:0,
      sendNotifications: 1,
    });

    const updateCredit = reactive({
      updateAmount: '',
      purchaseId: ""
    })
    const toggleCredits = ref(false)

    const selectOptions = [
      { id: 1, label: "Business development" },
      { id: 2, label: "Marketing" },
      { id: 3, label: "Sales" },
    ];

    // const form = reactive({
    //   companyName: '',
    //   accountDetails: '',
    //   accountAddress: '',
    //   addAnother: 0
    // })

    const tooglePasswordIcon = ref(false);
    const tooglePinIcon = ref(false); 

    const rules = computed(() => {
      return {
        companyName: {
          required: helpers.withMessage("Company Name is required", required),
          minLength: minLength(4),
          maxLength: maxLength(255),
        },
        accountDetails: {
          required: helpers.withMessage(
            "Account Details are required",
            required
          ),
          minLength: minLength(10),
          maxLength: maxLength(255),
        },
        accountAddress: {
          required: helpers.withMessage(
            "Account Address are required",
            required
          ),
          minLength: minLength(10),
          maxLength: maxLength(255),
        },
      };
    });

    const v$ = useVuelidate(rules, form);

    const submit = () => {
      if (v$.value.$validate() && v$.value.$error) {
        return true;
      }
      //Send validated from to user.
      console.log(form.addAnother);
    };

    const cancel = () => {
      const { navigateTo } = utility("dashboard");
      navigateTo();
    };

    return {
      titleStack,
      selectOptions,
      form,
      v$,
      cancel,
      refBox,
      showStep,
      mdiEye,
      filterDropdown,
      selectedNameFilter,
      mdiEyeOff,
      tooglePasswordIcon,
      tooglePinIcon,
      goToBackHandler,
      gotoNextHandler,
      updateCredit,
      toggleCredits,
      mdiChevronDown,
      testsArray,
      activeBlockList,
      sharedCredit,
      allowedToUpdateCredit,
      activeBlocked,
      userDetail,
      userTypes,
      notifications,
      trainingArray,
      // customElementsForm,
      submit,
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
label:after {
  content: '+';
  position: absolute;
  right: 1em;
  color: #fff;
}

input:checked + label:after {
  content: '-';
  line-height: .8em;
}

.accordion__content{
  max-height: 0em;
  transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
input[name='panel']:checked ~ .accordion__content {
  /* Get this as close to what height you expect */
  max-height: 50em;
}
</style>

