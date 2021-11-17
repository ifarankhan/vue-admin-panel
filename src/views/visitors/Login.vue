<template>
  <full-screen-section v-slot="{ cardClass, cardRounded }">
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      @submit.prevent="submitMethod"
      form
    >
        <div class="flex items-center justify-center mb-5">
          <img src="/img/login-logo.5225f2a8..svg" />
        </div>
        <error-alert
        v-if="form.error"
        :error="form.error"
        @dismissError="form.error = ''"
      />
        <div class="mb-2 last:mb-0 hover">
          <label class="block mb-2 ml-3 text-xs">Email</label>
          <div class="">
            <div class="relative">
              <input
                name="login"
                autocomplete="username"
                type="text"
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring-transparent
                  border-gray-700
                  rounded-full
                  w-11/12
                  dark:placeholder-gray-400
                  h-12
                  bg-white
                  dark:bg-gray-800
                "
              />
            </div>
          </div>

        </div>
        <div class="mb-2 last:mb-0 hover">
          <label class="block mb-2 ml-3 text-xs">Password</label>
          <div class="">
            <div class="relative">
              <input
                name="password"
                autocomplete="current-password"
                type="password"
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring-transparent
                  border-gray-700
                  rounded-full
                  w-11/12
                  dark:placeholder-gray-400
                  h-12
                  bg-white
                  dark:bg-gray-800
                "
              />
            </div>
          </div>
        </div>
        <div class="flex justify-start flex-wrap my-3 ml-3">
          <label class="checkbox mr-6 mb-3 last:mr-0"
            ><input type="checkbox" name="remember" value="remember" /><span
              class="check"
            ></span
            ><span class="control-label">Remember</span></label
          >
        </div>
        <div class="flex items-center justify-start flex-wrap -mb-3 mt-8">
          <button
            class="
              inline-flex
              w-11/12
              cursor-pointer
              justify-center
              text-base
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
              bg-blue-500
              text-white
              border-blue-600
              mr-3
              last:mr-0
              mb-3
              btn-login
            "
            type="submit"
          >
            <span class="px-2">Submit</span>
          </button>
        </div>
    </card-component>
  </full-screen-section>
</template>
<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import FullScreenSection from "@/components/FullScreenSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ErrorAlert from "@/components/ErrorAlert.vue";
import utility from "../../components/composition/utility";

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
  },
  setup() {
    const store = useStore();
    const form = reactive({
      userName: "",
      password: "",
      error: "",
      remember: ["remember"],
    });
    const submitMethod = async () => {
      store
        .dispatch("auth/loginAction", {
          username: form.username,
          password: form.password,
        })
        .then(async (res) => {
          if (res?.data?.data?.token) {
            await localStorage.setItem("authToken", res?.data?.data?.token);
            await localStorage.setItem("userName", res?.data?.data?.userName);
            await localStorage.setItem(
              "distributorUserName",
              res?.data?.data?.distributorUserName
            );
            const { navigateTo } = utility("dashboard");
            navigateTo();
          } else {
            throw new Error("Something went wrong. Please try again.!");
          }
        })
        .catch((error) => {
          form.error = error?.response?.data?.data?.message ?? error.message;
        });
    };
    store.dispatch('fullScreenToggle', true)
    return {
      form,
      submitMethod,
    };
  },
};
</script>
<style scoped>
.btn-login{
    background-color: #17a9e1;
    border: none;
    transition: all 0.2s;
    font-weight: 600;
}
.btn-login:hover{
    cursor: pointer;
    color: #17a9e1;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 21px;
}
.hover, .hover input{
  color: rgb(162, 171, 171);
  border-color: rgb(162, 171, 171);
}
.hover:hover{
    color: #17a9e1;
}
.hover:hover input{
    border-color: #17a9e1;
}
</style>
