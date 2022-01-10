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
    :userType="userDetail.userType"
    />
    <!-- <div class="flex p-4 mx-4">
      <div class="flex items-center w-6">
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600 "
        ></div>
      </div>
      <div class="flex items-center w-2/4">
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 0 ? 'text-gray-800 text-opacity-50' : '']"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-teal-600 rounded-full "
            :class="[
              showStep == 0
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            1
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-12 text-center">
            User Detail
          </div>
        </div>
        <div
          v-if="userDetail.userType != 4 && userDetail.userType != 1"
          class="flex-auto border-t-2 border-teal-600"
        ></div>
        <div
          v-if="userDetail.userType != 4 && userDetail.userType != 1"
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 1 ? 'text-gray-800 text-opacity-50' : '']"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 bg-teal-600 border-2 border-teal-600 rounded-full "
            :class="[
              showStep == 1
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            2
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Training Selection
          </div>
        </div>
        <div class="flex-auto border-t-2 border-gray-300"></div>
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 2 ? 'text-gray-800 text-opacity-50' : '']"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 rounded-full "
            :class="[
              showStep == 2
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            {{
              userDetail.userType != 1 && userDetail.userType != 4 ? "3" : "2"
            }}
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Assessments
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300 "
        ></div>
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 3 ? 'text-gray-800 text-opacity-50' : '']"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-gray-300 rounded-full "
            :class="[
              showStep == 3
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            {{
              userDetail.userType != 1 && userDetail.userType != 4 ? "4" : "3"
            }}
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Credit Control
          </div>
        </div>
      </div>
      <div class="flex items-center w-5/12">
        <div class="flex-auto border-t-2 border-teal-600"></div>
      </div>
    </div> -->

    <!-- middle section step == 0 -->
    <div class="flex p-4 ml-3 md:mt-6" v-show="showStep == 0">
      <div class="w-2/3">
        <!--  -->
        <div class="ml-3">
          <p class="mb-2 text-sm font-semibold">User Type</p>
          <div class="flex justify-between w-9/12 pl-2">
            <div v-for="(type, value) in userTypes" :key="value">
              <check-radio-picker
                name="user-types"
                v-model="userDetail.userType"
                type="radio"
                :options="{ [value]: type }"
              />
            </div>
          </div>
          <div class="mt-5">
            <error-span :error="v$.userType"></error-span>
          </div>
        </div>

        <!--  -->
          <div class="mt-2 ml-1" v-if="userDetail.userType == 3">
          <p class="pl-2 text-sm font-semibold">Add a Supervisor</p>
          <div class="flex w-9/12 pl-1">
            <div class="w-full pl-1">
              <select-option
                :filterDropdown="supervisorsArray"
                labelText="Supervisors"
                :customeWidth="true"
                v-model="userDetail.supervisor"
              ></select-option>
            </div>
          </div>
          <div class="flex w-9/12 mt-1">
            <span class="inline-block w-full">
              <error-span :error="v$.supervisor"></error-span>
            </span>
          </div>
      </div>
      
      <!--  -->
      <!-- <div class="mt-2 ml-5">
      <div class="flex inline-block w-2/4 mt-4 ml-2">
        {{ userDetail.supervisor && supervisorsArray.find(item=>item.value == userDetail.supervisor ).firstName[0].toUpperCase() }}
        <div class="inline-block ml-2">
          <p class="text-sm font-bold">First Name:{{ userDetail.supervisor && supervisorsArray.find(item=>item.value == userDetail.supervisor ).firstName }}</p>
          <p class="text-sm opacity-50">Family Name: {{ userDetail.supervisor && supervisorsArray.find(item=>item.value == userDetail.supervisor ).familyName }} </p>
          <p class="text-sm opacity-50">Username: {{ userDetail.supervisor && supervisorsArray.find(item=>item.value == userDetail.supervisor ).text }} </p>
        </div>
        
        <span class="ml-4 cursor-pointer">
          <IconSVG
          :applyClass="true"
          @iconWasClicked="(accountName = '')"
        />
      </span>
      <span class="text-xs opacity-50 cursor-pointer"> Remove </span>
      </div>
      </div> -->

        <!--  -->
        <div class="mt-6 ml-3">
          <p class="mb-2 text-sm font-semibold">User Status</p>
          <div class="flex justify-between w-1/4 pl-2">
            <div v-for="(item, index) in activeBlockList" :key="index">
              <check-radio-picker
                :disabled="true"
                name="active-block"
                v-model="activeBlocked"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="mt-8 ml-3">
          <p class="mb-1 text-sm font-semibold">User Details</p>
          <div class="flex w-9/12 -ml-2">
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
          <div class="flex w-9/12 -ml-2">
            <span class="inline-block w-full">
              <error-span :error="v$.firstname"></error-span>
            </span>
            <span class="inline-block w-full">
              <error-span :error="v$.familyname"></error-span>
            </span>
          </div>
          <!--  -->
          <div class="flex w-9/12 -ml-2">
            <div class="w-full">
              <field label="User Name/ Email Address" labelFor="email">
                <control
                  type="text"
                  v-model="userDetail.email"
                  @onFocusLeave="isUnique"
                  placeholder="Name"
                />
              </field>
            </div>
          </div>
          <span class="inline-block w-full -ml-2" v-if="emailIsTaken">
            <error-span customeError="That email is already taken"></error-span>
          </span>
           <span class="inline-block w-full -ml-2" v-if="v$.email.$dirty && v$.email.$invalid">
            <error-span :error="v$.email"></error-span>
          </span>
          <!--  -->
          <div class="flex w-9/12 -ml-2">
            <div class="w-full">
              <field label="Password" labelFor="password">
                <control
                  @iconWasClicked="tooglePasswordIcon = !tooglePasswordIcon"
                  :icon="tooglePasswordIcon ? mdiEye : mdiEyeOff"
                  :type="tooglePasswordIcon ? 'text' : 'password'"
                  v-model="userDetail.password"
                  placeholder=" "
                />
              </field>
            </div>
            <div class="w-full -ml-2">
              <field label="Pin" labelFor="pin">
                <control
                  @iconWasClicked="tooglePinIcon = !tooglePinIcon"
                  :icon="tooglePinIcon ? mdiEye : mdiEyeOff"
                  :type="tooglePinIcon ? 'text' : 'password'"
                  maxlength="4"
                  v-model="userDetail.pin"
                  placeholder=" "
                />
              </field>
            </div>
          </div>
          <div class="flex w-9/12 -ml-2">
            <span class="inline-block w-full">
              <error-span :error="v$.password"></error-span>
            </span>
            <span class="inline-block w-full">
              <error-span :error="v$.pin"></error-span>
            </span>
          </div>

          <!--  -->
          <div class="mt-8">
            <p class="mb-2 text-sm font-semibold">
              Receive Email Notification:
            </p>
            <div class="flex justify-between w-1/5 pl-2">
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
    <div class="flex p-4 ml-2 md:mt-6" v-show="showStep == 1">
      <div class="w-2/3">
        <!--  -->
        <div class="pl-4">
          <p class="mb-2 text-sm font-semibold">
            Select Training / Qualification Type:
          </p>
          <div v-for="(item, index) in trainingArray" :key="index" class="mb-4 ml-1.5">
            <check-radio-picker
              name="sample-checkbox"
              v-model="item.selected"
              setValue="another"
              :options="{ another: item.text }"
            />
            <span class="ml-6 text-sm">{{ item.description }}</span>
          </div>
          <div class="mt-5">
            <error-span :error="v$.traininglevel"></error-span>
          </div>
        </div>
        <!--  -->

        <div class="mt-12 ml-3">
          <p class="pl-2 text-sm font-semibold">Add a Training Providers:</p>
          <div class="flex w-10/12 pl-1">
            <div class="w-full pl-1">
              <select-option
                :filterDropdown="trainingProvidersArray"
                labelText="Name / Email address"
                :customeWidth="true"
                v-model="userDetail.trainingprovider"
              ></select-option>
            </div>

            <div class="w-full pl-1">
              <select-option
                :filterDropdown="yearsArray"
                :allyMarginRight="false"
                labelText="Year of Training"
                v-model="userDetail.trainingyear"
                :customeWidth="true"
              ></select-option>
            </div>
          </div>
          <div class="flex w-9/12 mt-1">
            <span class="inline-block w-full">
              <error-span :error="v$.trainingprovider"></error-span>
            </span>
            <span class="inline-block w-full ml-20">
              <error-span :error="v$.trainingyear"></error-span>
            </span>
          </div>

          <!--  -->
          <!-- <div class="mt-6">
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
          </div> -->

          <!--  -->
          <div class="w-10/12 mt-8">
            <field label="Training Details" labelFor="trainingDetails">
              <control
                type="textarea"
                v-model="userDetail.trainingdetails"
                placeholder="Details of the Training"
              />
            </field>
            <div>
              <error-span :error="v$.trainingdetails"></error-span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- step == 2 -->
    <div class="flex p-4 md:mt-10" v-show="showStep == 2">
      <div class="w-11/12">
        <!--  -->
        <div class="pl-4 mb-10">
          <div class="flex items-center">
            <span
              class="cursor-pointer"
              @click="collapsable.tests = !collapsable.tests"
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d="mdiChevronDown" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Tests :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.tests"
          >
            <div v-for="(item, index) in testsArray" :key="index">
              <check-radio-picker
                name="tests-checkbox"
                v-model="item.isDefaultTest"
                setValue="another"
                :options="{ [item.testID]: item.testID }"
              />
              <p class="ml-4 text-sm">{{ item.testName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised:
                {{ item.allowedUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>

        <!--  -->
        <div class="pl-4 mb-10">
          <div class="flex items-center">
            <span
              class="cursor-pointer"
              @click="collapsable.batteries = !collapsable.batteries"
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d="mdiChevronDown" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Batteries :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.batteries"
          >
            <div v-for="(item, index) in battriesArray" :key="index">
              <check-radio-picker
                name="batteries-checkbox"
                v-model="item.isDefaultBattery"
                setValue="another"
                :options="{ [item.batteryID]: item.batteryTitle }"
              />
              <p class="ml-4 text-sm">{{ item.batteryName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised: {{ item.allowUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>

        <!--  -->
        <div class="pl-4">
          <div class="flex items-center">
            <span
              class="cursor-pointer"
              @click="collapsable.solutions = !collapsable.solutions"
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                class="inline-block"
              >
                <path :d="mdiChevronDown" />
              </svg>
            </span>
            <span class="-ml-0.5 text-sm font-semibold">Solutions :</span>
            <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
          </div>
          <!--  -->
          <div
            class="grid grid-cols-4 gap-8 pl-4 mt-2"
            v-if="collapsable.solutions"
          >
            <div v-for="(item, index) in solutionsArray" :key="index">
              <check-radio-picker
                name="solution-checkbox"
                v-model="item.isDefaultBattery"
                setValue="another"
                :options="{ [item.batteryID]: item.batteryTitle }"
              />
              <p class="ml-4 text-sm">{{ item.batteryName }}</p>
              <p class="ml-4 text-sm font-semibold">
                Allow Unsupervised: {{ item.allowUnsupervised ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>

    <!-- showStep == 3 -->
    <div class="flex p-4 md:mt-6" v-show="showStep ==3">
      <div class="w-3/4">
        <!--  -->
        <error-alert
          v-if="errorText"
          @dismissError="errorText = ''"
          :error="errorText"
          :showTranslatedError="false"
        />
        <div>
          <p class="pl-4 ml-1.5 text-sm font-semibold">Credit Control</p>
          <div class="flex ml-3.5">
            <div class="w-full">
              <field label="Available Credit" labelFor="credit">
                <control
                  :disabled="true"
                  v-model="updateCredit.availableCredit"
                  placeholder=" "
                />
              </field>
            </div>
            <div class="w-full">
              <psytech-button
                @buttonWasClicked="toggleCredits = true"
                :smallText="true"
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

        <div
          class="w-9/12 p-2 mt-4 ml-6 rounded-md bg-psytechLightGray"
          v-if="toggleCredits"
        >
          <div class="flex w-full">
            <div class="w-80">
              <field label="Update Amount" labelFor="update-amount">
                <control v-model="updateCredit.updateAmount" placeholder=" " maxlength="4" />
              </field>
            </div>
            <div class="w-80">
              <field label="Purchase ID" labelFor="purchase-id">
                <control v-model="updateCredit.purchaseId" placeholder=" " />
              </field>
            </div>
            <!-- <div class="flex w-1/5"> -->
            <div class="mt-1 ml-6">
              <psytech-button
                label="Cancel"
                type="dark"
                @buttonWasClicked="
                  (toggleCredits = false),
                    (updateCredit.availableCredit = updateCredit.updateAmount =
                      0)
                "
              ></psytech-button>
            </div>
            <div class="mt-1">
              <psytech-button
                label="Update"
                type="black"
                extraClasses="pl-6 pr-6"
                @buttonWasClicked="
                  updateCredit.availableCredit = updateCredit.updateAmount
                "
              ></psytech-button>
            </div>
            <!-- </div> -->
          </div>
          <div class="ml-3">
            <error-span :error="v$.credits"></error-span>
          </div>
        </div>

        <!--  -->
        <div class="mt-8 ml-2">
          <p class="pl-4 mb-2 text-sm font-semibold">Shared Credit</p>
          <div class="flex justify-between w-1/5 pl-4 ml-1">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                name="shared-credit"
                :disabled="true"
                v-model="userDetail.sharedCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="w-9/12 p-4 mt-8 ml-5 rounded-md bg-psytechLightGray">
        <div class="flex">
          <div>
            <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
              <path :d="mdiFileChartOutline"/>
            </svg>
          </div>
            <p class="text-base">
              <span class="font-semibold">Note:</span>
              If shared, the Master User holds all credits for the clients
              account. All users in the account will have access to this pool of
              credits.
            </p>
          </div>
        </div>

        <!--  -->
        <div class="mt-8 ml-2">
          <p class="pl-4 mb-2 text-sm font-semibold">
            Allowed to update Credit
          </p>
          <div class="flex justify-between w-1/5 pl-4 ml-1">
            <div v-for="(item, index) in notifications" :key="index">
              <check-radio-picker
                :disabled="true"
                name="update-credit"
                v-model="userDetail.allowedToUpdateCredit"
                type="radio"
                :options="{ [index]: item }"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <!-- <div class="mt-8">
          <p class="pl-4 mb-2 text-sm font-semibold">Monthly Update Limit:</p>
          <div class="w-2/5">
              <field label="Monthly Update Limit" labelFor="credit">
                <control
                  v-model="userDetail.credits"
                  placeholder=" "
                />
              </field>
            </div>
        </div> -->
      </div>
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
        type="dark"
        @buttonWasClicked="showQuitDialog = true"
      ></psytech-button>
    </div>
    <div class="flex justify-end w-11/12">
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
import { ref, reactive, computed, onMounted, watch } from "vue";
import { mdiPlus, mdiEyeOff, mdiEye, mdiChevronDown, mdiFileChartOutline } from "@mdi/js";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import FilePicker from "@/components/FilePicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import utility from "@/components/composition/utility";
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import IconSVG from "@/components/IconSVG.vue";
import TitleSubBar from "@/components/TitleSubBar";
import Loader from "@/components/Loader.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import Tabs from '@/components/user/Tabs.vue';
import QuitDialog from '@/components/QuitDialog.vue';
import {
  numeric,
  minLength,
  maxLength,
  minValue,
  maxValue,
  helpers,
  required,
  email,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useStore } from "vuex";
import store from "../../../../store/index";
import _ from "lodash";
import SelectOption from "@/components/SelectOption.vue";
import ErrorSpan from "@/components/ErrorSpan";

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
    TitleSubBar,
    Divider,
    MainSection,
    FilePicker,
    CheckRadioPicker,
    SelectOption,
    CardComponent,
    TitleBar,
    QuitDialog,
    Field,
    Loader,
    Tabs,
    Control,
    IconSVG,
    PsytechButton,
    StickyHeader,
    ErrorAlert,
    StickyFooter,
    ErrorSpan,
    utility,
  },
  setup() {
    const store = useStore();
    const showQuitDialog = ref(false);
    let errorText = ref("");
    let supervisorsArray = ref([]);
    const form = reactive({
      companyName: "",
      accountDetails: "",
      accountAddress: "",
      error: "",
      loader: false,
      addAnother: "another",
    });
    let loader = ref(false);
    const emailIsTaken = ref(false);
    const userDetail = reactive({
      userType: "",
      firstname: "",
      familyname: "",
      email: "",
      password: "",
      pin: "",
      credits: 0,
      supervisor:'',
      tests: [],
      solution: [],
      batteries: [],
      traininglevel: [],
      allowedToUpdateCredit: 0,
      sharedCredit: 0,
      sendNotifications: 0,
      trainingprovider: "",
      trainingyear: "",
      trainingdetails: "",
    });
    const trainingProvidersArray = ref([]);
    const testsArray = ref([]);
    const solutionsArray = ref([]);
    const battriesArray = ref([]);

    onMounted(() => {
      loadAllAccSupervisors();
      loadAllTrainingProviders();
      loadAllCollectTests();
      loadAllCollectSolutions();
      loadAllCollectBattries();
    });
    const rangeOfYears = (start, end) =>
      Array(end - start + 1)
        .fill(start)
        .map((year, index) => {
          return {
            text: year + index,
            value: String(year + index),
          };
        });

    const loadAllAccSupervisors = ()=>{
            store
        .dispatch("clientControl/getAccountSupervisors")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if(RESPONSE_DATA.status ==200){
            supervisorsArray.value = RESPONSE_DATA.data.map(item=> {
              return {
                text: item.username,
                value: item.userID,
                familyName: item.familyName,
                firstName: item.firstName,
              }
            })
          }
        })
        .catch((error) => { });
    }

    const loadAllTrainingProviders = () => {
      store
        .dispatch("clientControl/getTrainingProviders")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            trainingProvidersArray.value = RESPONSE_DATA.data.map((item) => {
              return {
                text: item,
                value: item,
              };
            });
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const loadAllCollectTests = () => {
      store
        .dispatch("clientControl/getCollectTests")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            testsArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const loadAllCollectSolutions = () => {
      store
        .dispatch("clientControl/getCollectSolutions")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            solutionsArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const loadAllCollectBattries = () => {
      store
        .dispatch("clientControl/getCollectBattries")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            battriesArray.value = RESPONSE_DATA.data;
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };

    const yearsArray = ref([]);
    const endYear = new Date(
      new Date().setFullYear(new Date().getFullYear() + 20)
    ).getFullYear();
    yearsArray.value = rangeOfYears(new Date().getFullYear(), endYear);

    const showStep = ref(0);

    let selectedNameFilter = ref("");

    const trainingArray = reactive([
      {
        text: "Test User Personality & Ability (TUP & TUA) or Psytech Test Certificate (PTC)",
        value: "PTC",
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
    watch(
      () => _.cloneDeep(trainingArray),
      (currentValue, _) => {
        userDetail.traininglevel = currentValue
          .map((item) => item.selected && item.value)
          .filter((item) => item);
      }
    );

    const refBox = ref(false);
    const userTypes = reactive([
      "Professional",
      "Solution",
      "Training",
      "Test admin",
      "Integration",
    ]);
    const activeBlockList = reactive(["Active", "Blocked"]);
    const activeBlocked = ref(1);
    const notifications = reactive(["No", "Yes"]);
    const collapsable = reactive({
      tests: true,
      batteries: true,
      solutions: true,
    });

    const updateCredit = reactive({
      availableCredit: 0,
      updateAmount: "",
      purchaseId: "",
    });
    watch(
      () => _.cloneDeep(updateCredit),
      (currentValue, _) => {
        userDetail.credits = +currentValue.updateAmount;
      }
    );

    const toggleCredits = ref(false);

    const tooglePasswordIcon = ref(false);
    const tooglePinIcon = ref(false);

    const rules = computed(() => {
      return {
        userType: {
          required: helpers.withMessage(
            "One user type must be selected",
            required
          ),
        },
        firstname: {
          required: helpers.withMessage("First Name is required", required),
        },
        familyname: {
          required: helpers.withMessage("Family Name is required", required),
        },
        email: {
          email: helpers.withMessage("Email is invalid", email),
          required: helpers.withMessage("Email is required", required),
        },
        password: {
          required: helpers.withMessage("Password is required", required),
          minLength: helpers.withMessage(
            "Password must be at least 8 characters",
            minLength(8)
          ),
        },
        pin: {
          required: helpers.withMessage("Pin is required", required),
          numeric: helpers.withMessage("Numeric values are allowed", numeric),
          minLength: helpers.withMessage(
            "Pin must be of 4 digits",
            minLength(4)
          ),
          maxLength: helpers.withMessage(
            "Pin must be of 4 digits",
            maxLength(4)
          ),
        },
        traininglevel: {
          required: helpers.withMessage("One type must be selected", required),
        },
        trainingprovider: {
          required: helpers.withMessage(
            "Name / Email address is required",
            required
          ),
        }, 
        trainingyear: {
          required: helpers.withMessage(
            "Year of training is required",
            required
          ),
        },
        trainingdetails: {
          required: helpers.withMessage("Detail is required", required),
          maxLength: helpers.withMessage(
            "Detail should not be greater than 255 characters.",
            maxLength(255)
          ),
        },
        credits: {
          numeric: helpers.withMessage("Numeric values are allowed", numeric),
          minValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            minValue(19)
          ),
          maxLength: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            maxLength(4)
          ),
          maxValue: helpers.withMessage(
            "Update Amount should be between 20 to 1000",
            maxValue(1000)
          ),
        },
      };
    });

    const v$ = useVuelidate(rules, userDetail);

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

    const isUnique = async ()=>{
            if (!userDetail.email) return false;
            store
              .dispatch("clientControl/userEmailCheck", userDetail.email)
              .then((res) => {
                emailIsTaken.value = res.data.data.accountExists;
              })
              .catch((error) => {
                console.log(error);
              });
          }

    const gotoNextHandler = () => {
      if (showStep.value >= 3) {
        return true;
      }
      let next = false;
      v$.value.$validate();
      if (
        v$.value.userType.$invalid ||
        v$.value.firstname.$invalid ||
        v$.value.familyname.$invalid ||
        v$.value.email.$invalid ||
        v$.value.password.$invalid ||
        v$.value.pin.$invalid
      ) {
        next = true;
        return true;
      }
      if (
        showStep.value == 1 &&
        userDetail.userType != 1 &&
        userDetail.userType != 4 &&
        (v$.value.traininglevel.$invalid ||
          v$.value.trainingyear.$invalid ||
          v$.value.trainingdetails.$invalid)
      ) {
        next = true;
        return true;
      }

      if (userDetail.userType == 3) {
        userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 1;
      } else{
        userDetail.allowedToUpdateCredit = userDetail.sharedCredit = 0;
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

      if (!next && !emailIsTaken.value) {
        showStep.value = showStep.value + 1;
      }
    };

    const addAccountUserMethod = () => {
      const userDetailData = { ...userDetail };
      if(+userDetailData.credits > 1000){
        return true
      }
      userDetailData.userType = Number(userDetail.userType);

      // if(userDetailData.userType != 3){
      //   userDetailData.supervisor = ""
      // }

      if(!userDetailData.supervisor){
        delete userDetailData.supervisor;
      }

      let array = [];

      Object.keys(userDetailData.traininglevel).forEach(function (key) {
        array.push(String(userDetailData.traininglevel[key]));
      });
      userDetailData.tests = testsArray.value
        .map((item) => item.isDefaultTest && item.testID)
        .filter((item) => item);
      userDetailData.solution = solutionsArray.value
        .map((item) => item.isDefaultBattery && String(item.batteryID))
        .filter((item) => item);
      userDetailData.batteries = battriesArray.value
        .map((item) => item.isDefaultBattery && String(item.batteryID))
        .filter((item) => item);
      userDetailData.sendNotifications =
        userDetail.sendNotifications == 1 ? true : false;
      errorText.value = "";
      loader.value = true;
      store
        .dispatch("clientControl/postAddAccountUser", userDetailData)
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
            loader.value = false;
            store.commit("clientControl/setClientDetail", {
              incrementAccUser: true,
            });
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
      form,
      refBox,
      v$,
      showStep,
      mdiEye,
      selectedNameFilter,
      mdiEyeOff,
      tooglePasswordIcon,
      tooglePinIcon,
      emailIsTaken,
      trainingProvidersArray,
      goToBackHandler,
      gotoNextHandler,
      addAccountUserMethod,
      solutionsArray,
      supervisorsArray,
      yearsArray,
      loader,
      isUnique,
      errorText,
      showQuitDialog,
      mdiFileChartOutline,
      collapsable,
      updateCredit,
      toggleCredits,
      mdiChevronDown,
      testsArray,
      battriesArray,
      activeBlockList,
      activeBlocked,
      userDetail,
      userTypes,
      notifications,
      trainingArray,
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

