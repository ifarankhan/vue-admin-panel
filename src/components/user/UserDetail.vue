<template>
     <div class="w-2/3">
        <!--  -->
        <div class="ml-3">
          <p class="mb-2 text-sm font-semibold">User Type</p>
          <div class="flex justify-between w-9/12 pl-2">
            <div v-for="(type, value) in userTypes" :key="value">
              <check-radio-picker
                name="user-types"
                :disabled="onUserEdit"
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
                :disabled="disableUserStaus"
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
            <div class="w-full" v-if="onUserEdit">
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
            <span class="inline-block w-full -ml-2" v-if="emailIsTaken">
              <error-span customeError="That email is already taken"></error-span>
            </span>
            <span class="inline-block w-full -ml-2" v-if="v$.email.$dirty && v$.email.$invalid">
              <error-span :error="v$.email"></error-span>
            </span>

            <span class="inline-block w-full" v-if="onUserEdit">
                <error-span :error="v$.pin"></error-span>
              </span>
           </div>
          <!--  -->
          <div class="flex w-9/12 -ml-2" v-if="!onUserEdit">
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
          <div class="flex w-9/12 -ml-2" v-if="!onUserEdit">
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
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import { useStore } from "vuex";
import _ from "lodash";
import SelectOption from "@/components/SelectOption.vue";
import Control from "@/components/Control";
import IconSVG from "@/components/IconSVG.vue";
import { useClientUser } from "@/components/composition/clientHelper.js";
import {
  numeric,
  minLength,
  maxLength,
  helpers,
  required,
  email,
} from "@vuelidate/validators";
export default {
 name: "client-control-user-detail",
 props: {
   disableUserStaus:{
     type: Boolean,
     default: true
   },
   onUserEdit:{
     type: Boolean,
     default: false
   }
 },
 components: {
    CheckRadioPicker,
    SelectOption,
    Field,
    Control,
    IconSVG,
    ErrorSpan,
  },
   setup (props, { emit }) {
     const store = useStore();
    const { userTypes, notifications } = useClientUser();
    let supervisorsArray = ref([]);
    const emailIsTaken = ref(false);
    const indUserDetail = store.getters['clientControl/getIndClientUser']
    const userDetail = reactive({
      userType: indUserDetail?.userType??"",
      firstname:indUserDetail?.firstName??"",
      familyname: indUserDetail?.familyName??"",
      email: indUserDetail?.username??"",
      pin: indUserDetail?.pin??"",
      sendNotifications: indUserDetail && indUserDetail.receiveSystemEmailNotifications?1:0,
    });

    watch(
      () => _.cloneDeep(userDetail.userType),
      (currentValue, _) => {
          emit("userTypeSelected", currentValue);
      }
    );

    const isUnique = async ()=>{
      if (!userDetail.email) return false;
      store
        .dispatch("clientControl/userEmailCheck", userDetail.email)
        .then((res) => {
          emailIsTaken.value = res.data.data.accountExists
          emit("isEmailTaken",res.data.data.accountExists)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const tooglePasswordIcon = ref(false);
    const tooglePinIcon = ref(false);
    
    const activeBlockList = reactive(["Active", "Blocked"]);
    let emailNotValue = 1;
    if(indUserDetail){
      emailNotValue = indUserDetail.activated ? 1: 0;
    }
    
    const activeBlocked = ref(emailNotValue);
    
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

    onMounted(() => {
      loadAllAccSupervisors();
    });

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
      };
    });

    const v$ = useVuelidate(rules, userDetail);

    const userDetailMethod = ()=>{
      v$.value.$validate();
      if (
        v$.value.userType.$invalid ||
        v$.value.firstname.$invalid ||
        v$.value.familyname.$invalid ||
        v$.value.email.$invalid ||
        (!props.onUserEdit && v$.value.password.$invalid ) ||
        v$.value.pin.$invalid
      ) {
        emit("valid", { notDone: ()=> {} })
        return true;
      }
      emit("valid", { done: ()=> {
        const data = {...userDetail,activeBlocked: activeBlocked.value}
        emit("userDetail",data)
      } })
        
    }

    return {
        userDetail,
        isUnique,
        emailIsTaken,
        tooglePasswordIcon,
        tooglePinIcon,
        notifications,
        supervisorsArray,
        userDetailMethod,
        activeBlockList,
        activeBlocked,
        userTypes,
        mdiEyeOff,
        mdiEye,
        v$
     }  
    },
}
</script>