<template>
  <full-screen-section v-slot="{ cardClass, cardRounded }">
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      @submit.prevent="submitMethod"
      form
    >
      <div class="flex items-center justify-center mb-5">
        <logo-blue />
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
              v-model="form.userName"
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
               v-model="form.password"
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
      <!-- <div class="flex justify-start flex-wrap my-3 ml-3">
          <label class="checkbox mr-6 mb-3 last:mr-0"
            ><input type="checkbox" name="remember" value="remember" /><span
              class="check"
            ></span
            ><span class="control-label">Remember</span></label
          >
        </div> -->
      <div class="flex items-center justify-start flex-wrap mt-12">
        <button
          class="
            inline-flex
            w-11/12
            cursor-pointer
            justify-center
            text-base
            items-center
            whitespace-nowrap
            focus:outline-none focus:ring
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
      <div class="flex items-center justify-center">
        <div>
          <div class="dropdown inline-block relative">
            <button
              class="text-gray-700 font-semibold py-1 inline-flex items-center"
            >
              <span class="text-xs font-thin"> Language: </span>
              <span class="ml-1 text-sm font-medium">English</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </button>
            <ul
              class="dropdown-menu absolute menu-position"
              id="style-2"
            >
              <li class="">
                <a
                  class="
                    bg-gray-200
                    hover:bg-gray-400
                    py-2
                    px-4
                    block
                    whitespace-no-wrap
                  "
                  href="#"
                  >One</a
                >
              </li>
              <li class="">
                <a
                  class="
                    bg-gray-200
                    hover:bg-gray-400
                    py-2
                    px-4
                    block
                    whitespace-no-wrap
                  "
                  href="#"
                  >Two</a
                >
              </li>
              <li class="">
                <a
                  class="
                    bg-gray-200
                    hover:bg-gray-400
                    py-2
                    px-4
                    block
                    whitespace-no-wrap
                  "
                  href="#"
                  >Two</a
                >
              </li>
              <li class="">
                <a
                  class="
                    bg-gray-200
                    hover:bg-gray-400
                    py-2
                    px-4
                    block
                    whitespace-no-wrap
                  "
                  href="#"
                  >Two</a
                >
              </li>
              <li class="">
                <a
                  class="
                    bg-gray-200
                    hover:bg-gray-400
                    py-2
                    px-4
                    block
                    whitespace-no-wrap
                  "
                  href="#"
                  >Three</a
                >
              </li>
            </ul>
          </div>
        </div>
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
import LogoBlue from "@/components/LogoBlue.vue";
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
    LogoBlue,
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
          username: form.userName,
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
    store.dispatch("fullScreenToggle", true);
    return {
      form,
      submitMethod,
    };
  },
};
</script>
<style scoped>
.btn-login {
  background-color: #17a9e1;
  border: none;
  transition: all 0.2s;
  font-weight: 600;
}
.btn-login:hover {
  cursor: pointer;
  color: #17a9e1;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 21px;
}
.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}
.hover,
.hover input {
  color: rgb(162, 171, 171);
  border-color: rgb(162, 171, 171);
}
.hover:hover {
  color: #17a9e1;
}
.hover:hover input {
  border-color: #17a9e1;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.menu-position {
  top: -83px;
  left: 129px;
  max-height: 100px;
  overflow: auto;
}

#style-2 {
  width: 228px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 6px #00000029;
}

#style-2::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f8f8f8;
}

#style-2::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(255, 255, 255);
}

#style-2::-webkit-scrollbar-thumb {
  border-radius: 10px;
 -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
 background-color: rgb(255, 255, 255);
}
</style>
