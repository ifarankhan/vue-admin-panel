<template>
  <full-screen-section bg="login" v-slot="{ cardClass, cardRounded }">
    <card-component  :class="cardClass" :rounded="cardRounded" @submit.prevent="submitMethod" form>
      <error-alert 
      v-if="form.error"
      :error="form.error"
      @dismissError="form.error = ''" /> 
      <field label="Login" help="Please enter your login">
        <control v-model="form.username" :icon="mdiAccount" name="login" autocomplete="username"/>
      </field>

      <field label="Password" help="Please enter your password">
        <control v-model="form.password" :icon="mdiAsterisk" type="password" name="password" autocomplete="current-password"/>
      </field>

      <check-radio-picker name="remember" v-model="form.remember" :options="{ remember: 'Remember' }" />

      <divider />

      <jb-buttons> 
        <jb-button type="submit" color="info" :label="$t('login')" />
        <jb-button to="/" color="info" outline label="Back" />
      </jb-buttons>
      <template v-for="lng in $i18n.availableLocales" :key="lng">
        <a href="#" @click.prevent="setLocale(lng)" class="no-underline hover:underline p-3">{{ lng }}</a>
      </template>
    </card-component>
  </full-screen-section>
</template>
<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import FullScreenSection from "@/components/FullScreenSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import { useI18n } from 'vue-i18n'
import ErrorAlert from '@/components/ErrorAlert.vue';
import utility from '../../components/composition/utility';

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
    ErrorAlert
  },
  setup() {
    const store = useStore();
    const form = reactive({
      userName: "",
      password: "",
      error: "",
      remember: ['remember']
    });
    const submitMethod = async ()=>{
      store.dispatch('auth/loginAction', {username: form.username, password: form.password})
      .then(async res=>{
        if (res?.data?.token) {
          await localStorage.setItem('authToken', res.data.token);
          const { navigateTo } = utility('dashboard')
          navigateTo()
        } else {
          throw new Error("Something went wrong. Please try again.!") 
        }
      })
      .catch(error=>{
         form.error = error?.response?.data??error.message
      })
    }

    const i18n = useI18n();
    const  setLocale = locale => {
      i18n.locale.value = locale

     } 

    return {
      form,
      submitMethod,
      setLocale,
      mdiAsterisk,
      mdiAccount
    };
  },
};
</script>
