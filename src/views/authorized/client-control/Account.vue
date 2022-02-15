<template>
  <sticky-header :icon="mdiPlus" title="Create Client">
<!--    <Tabs-->
<!--        :showStep="showStep"-->
<!--        :enabledClick="false"-->
<!--        :userType="0"-->
<!--        tabType="ClientAccount"-->
<!--    />-->
  </sticky-header>
  <Loader v-if="form.loader" :toBeBigger="true" />
  <main-section class="grid grid-cols-3 gap-4">
    <div class="col-span-2 form">
      <error-alert
        v-if="form.error"
        @dismissError="form.error = ''"
        :error="form.error"
        :showTranslatedError="false"
      />
      <div
        v-if="showSuccessAlert"
        class="flex items-center justify-center px-2 py-1 m-1 font-medium text-green-700 bg-white bg-green-100 border border-green-300 rounded-md "
      >
        <div slot="avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 mx-2 feather feather-check-circle"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div
          class="items-center flex-initial max-w-full font-normal text-large"
        >
          Client
          <span
            class="
              inline-block
              px-2
              py-0.5
              text-xs text-base
              font-medium
              text-white
              bg-green-500
              rounded-full
            "
          >
            {{ clientName }}
          </span>
          created successfully.
        </div>
        <div class="flex flex-row-reverse flex-auto">
          <div @click="showSuccessAlert = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 ml-2 rounded-full cursor-pointer feather feather-x hover:text-green-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      <form action="#" @submit.prevent="submit">
        <field label="Client Name" labelFor="email">
          <control type="text" v-model="form.companyName" placeholder="Email" />
          <error-span :error="v$.companyName"></error-span>
        </field>
        <field label="Client Detail" labelFor="accountDetails">
          <control
            type="textarea"
            v-model="form.accountDetails"
            placeholder="Account Details"
          />
          <error-span :error="v$.accountDetails"></error-span>
        </field>
        <field label="Client Address" labelFor="accountAddress">
          <control
            type="textarea"
            v-model="form.accountAddress"
            placeholder="Account Address"
          />
          <error-span :error="v$.accountAddress"></error-span>
        </field>
        <divider />
      </form>
    </div>
  </main-section>

  <sticky-footer>
    <div
      class="relative flex items-center justify-end text-medium"
      style="padding-right: 15%"
    >
      <check-radio-picker
        name="sample-checkbox"
        v-model="form.addAnother"
        :options="{ another: 'Create Another' }"
      />
      <psytech-button label="Create Account" @click="submit"></psytech-button>
      <psytech-button
        label="Cancel"
        type="Secondary"
        @buttonWasClicked="$router.push({ name: 'list-page' })"
      ></psytech-button>
    </div>
  </sticky-footer>
</template>
<script>
import { ref, reactive, computed } from "vue";
import utility from "@/components/composition/utility";
import { mdiPlus } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import Loader from "@/components/Loader.vue";
import { minLength, helpers, required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import ErrorAlert from "@/components/ErrorAlert.vue";
import Tabs from '@/components/user/Tabs.vue';
import { useStore } from "vuex";

export default {
  name: "client-control-create-client",
  components: {
    Divider,
    MainSection,
    CheckRadioPicker,
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
  setup() {
    let store = useStore();

    const form = reactive({
      companyName: "",
      accountDetails: "",
      accountAddress: "",
      error: "",
      loader:false,
      addAnother: false,
    });
    const clientName = ref("");
    const showSuccessAlert = ref(false);

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
      showSuccessAlert.value = false;
      form.error = ''
      form.loader = true;
      store
        .dispatch("clientControl/postClientDetails", {
          accountName: form.companyName,
          accountAddress: form.accountAddress,
          description: form.accountDetails,
        })
        .then((res) => {
           const RESPONSE = res?.data;
          if(RESPONSE.status == 500){
            throw new Error(RESPONSE.data.message)
          } else if (RESPONSE.data.message) {
            throw new Error(RESPONSE.data.message);
          } else if (!form.addAnother) {
            store.commit("clientControl/setClientDetail", {
              accountName: form.companyName,
              accountDescription: form.accountDetails,
              accountAddress: form.accountAddress,
              numberOfUsers: 0,
              accountId: RESPONSE.data.accountId,
              creationDate: new Date()
            });
            store.commit("clientControl/setClientDetail", {
              accountId: RESPONSE.data.accountId,
              accountName: form.companyName,
              accountDescription: form.accountDetails,
              accountAddress: form.accountAddress,
              creationDate: new Date(),
              numberOfUsers: 0,
            });
            const { navigateTo } = utility("client-control-list-detail");
            navigateTo();
          } else {
            clientName.value = form.companyName;
            showSuccessAlert.value = true;
            v$.value.$reset();
            form.companyName = "";
            form.accountDetails = "";
            form.accountAddress = "";
          }
        })
        .catch((error) => {
          form.error = error?.message ?? "";
        })
        .finally(() => {
          form.loader = false;
        });
    };

    const cancel = () => {
      const { navigateTo } = utility("dashboard");
      navigateTo();
    };

    return {
      form,
      v$,
      cancel,
      showSuccessAlert,
      submit,
      clientName,
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
