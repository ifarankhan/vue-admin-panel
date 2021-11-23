<template>
  <full-screen-section v-slot="{ cardClass, cardRounded }">
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      @submit.prevent="submitMethod"
      custom
      form
      :hasBorder='false'
    >
      <div class="flex items-center justify-center mb-5">
        <logo-blue />
      </div>

       <Loader v-if="form.loader" />

      <div class="mb-2 last:mb-0 hover">
        <label class="block mb-2 ml-5 text-xs">{{ $t("emailLabel") }}</label>
        <div>
          <div class="relative">
            <input
              name="login"
              autocomplete="username"
              type="text"
              v-model="form.userName" 
              class="
                px-3
                py-2
                ml-3
               max-w-full
              focus:ring-transparent
              border-gray-700
              rounded-full
              w-11/12
              dark:placeholder-gray-400
              h-12
              bg-white
              opacity-50
              dark:bg-gray-800
              bg-opacity-50
              hover:border-psytechBlue
              "
            />
          </div>
        </div>
      </div>

      <div class="mb-0 last:mb-0 hover mb-12">
        <label class="block mb-2 ml-5 text-xs">{{ $t("passwordLabel") }}</label>
        <div class="relative">
          <input
            name="password"
            autocomplete="current-password"
            type="password"
            v-model="form.password"
            class="
              px-3
              py-2
              ml-3
              max-w-full
              focus:ring-transparent
              border-gray-700
              rounded-full
              w-11/12
              dark:placeholder-gray-400
              h-12
              bg-white
              opacity-50
              dark:bg-gray-800
              bg-opacity-50
              hover:border-psytechBlue
            "
          />
        </div>
      </div>
      <!-- <div class="flex justify-between flex-wrap mt-0 mb-3 ml-5">
        <label class="inline-flex items-center mt-3">
          <input
            type="checkbox"
            class="form-checkbox h-4 w-4 text-gray-600"
            v-model="form.rememberMe"
          /><span class="ml-2 text-gray-700 text-xs font-semibold">{{ $t('rememberMe') }}</span>
        </label>
        <a href="#" class="no-underline text-xs mt-3 mr-5 font-semibold text-gray-700">{{$t('forgotPassword')}}?</a>
      </div> -->
      

      <div class="flex items-center justify-start flex-col pb-3 -mt-2">
          <span v-if="v$.userName.$error && !form.error" class="text-xs font-semibold text-red-700">
            {{ $t(v$.userName.$errors[0].$message) }}
          </span>

          <span v-if="v$.password.$error && !v$.userName.$error && !form.error" class="text-xs font-semibold text-red-700">
            {{ $t(v$.password.$errors[0].$message) }}
          </span> 

          <span class="text-xs font-base text-red-700">
            {{ $t(form.error) }}
          </span>
      </div>

      <div class="flex items-center justify-start flex-wrap">
        <button
          class="
            inline-flex
            w-11/12
            cursor-pointer
            focus:outline-none
            justify-center
            text-base
            ml-3
            items-center
            whitespace-nowrap
            focus:outline-none 
            focus:ring
            duration-150
            border
            rounded-full
            ring-blue-700
            p-2
            hover:bg-blue-600
            bg-psytechBlue
            text-white
            border-blue-600
            mr-3
            last:mr-0
            mb-4
            border-none
            transition duration-200
            font-semibold
            hover:bg-psytechWhite
            hover:text-psytechBlue
            btn-login
          "
          type="submit"
        >
          <span class="px-2">{{ $t("submitButton") }}</span>
        </button>
      </div>

      <div class="flex items-center justify-center">
        <div>
          <language-switcher />
        </div>
      </div>
    </card-component>
  </full-screen-section>
</template>
<script>
import { useStore } from "vuex";
import { reactive, computed, watch, ref } from "vue";
import FullScreenSection from "@/components/FullScreenSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ErrorAlert from "@/components/ErrorAlert.vue";
import LogoBlue from "@/components/LogoBlue.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import utility from "../../components/composition/utility";
import useVuelidate from '@vuelidate/core';
import Loader from '../../components/Loader.vue';
import { required, email, helpers } from '@vuelidate/validators'

export default {
  name: "Login",
  components: {
    FullScreenSection,
    CardComponent,
    CheckRadioPicker,
    Field,
    Control,
    Divider,
    JbButton,
    JbButtons,
    ErrorAlert,
    LogoBlue,
    Loader,
    LanguageSwitcher,
  },
  setup() {
    const store = useStore();
    const form = reactive({
      userName: "",
      password: "",
      error: "",
      loader:false,
      rememberMe: false,
    });

    const rules = computed(()=> {
      return {
        userName: { 
         required: helpers.withMessage('Email is required', required), 
         email: helpers.withMessage('Email is invalid', email)
        },  
        password: { 
          required: helpers.withMessage('Password is required', required),
         }, 
      }
    })

    const v$ = useVuelidate(rules, form)
    const submitMethod = async () => {

      // CHECH FORM IS VALID
      if(v$.value.$validate() && v$.value.$error){
        return true
      }
      form.loader = true;
      store
        .dispatch("auth/loginAction", {
          username: form.userName,
          password: form.password,
        })
        .then(async (res) => {
          if (res?.data?.data?.token) {
            const USER_DATA = {
              authToken: res?.data?.data?.token,
              refreshToken: res?.data?.data?.refreshToken,
              userName: res?.data?.data?.userName,
              distributorUserName:  res?.data?.data?.distributorUserName,
              rememberMe: form.rememberMe
            }
            await localStorage.setItem("userData",JSON.stringify(USER_DATA));
            const { navigateTo } = utility("dashboard");
            navigateTo();
          } else {
            throw new Error("Something went wrong. Please try again.!");
          }
        })
        .catch((error) => {
          console.log(error)
          form.error = error?.response?.data?.data?.message ?? error.message;
        }).finally(()=>{
          form.loader = false;
        });
    };
    store.dispatch("fullScreenToggle", true);
    return {
      form,
      v$,
      submitMethod
    };
  },
};
</script>
<style scoped>
.btn-login:hover {
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 21px;
}
.error-class{
  color: #ff0202cf !important;
  border-color: #ff0202cf !important;
}
.error-class input{
  border-color: #ff0202cf !important;
}
.hover {
  color: #a2abab;
}
.hover input{
   border:1px solid rgb(162, 171, 171);
}
.hover:hover label {
  color: #17a9e1;
}

.hover:hover input {
  border-color: #17a9e1;
}
</style>
