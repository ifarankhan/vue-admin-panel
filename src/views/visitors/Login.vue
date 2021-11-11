<template>
  <full-screen-section bg="login" v-slot="{ cardClass, cardRounded }">
    <card-component  :class="cardClass" :rounded="cardRounded" @submit.prevent="submitMethod" form>

      <field label="Login" help="Please enter your login">
        <control v-model="form.username" :icon="mdiAccount" name="login" autocomplete="username"/>
      </field>

      <field label="Password" help="Please enter your password">
        <control v-model="form.password" :icon="mdiAsterisk" type="password" name="password" autocomplete="current-password"/>
      </field>

      <check-radio-picker name="remember" v-model="form.remember" :options="{ remember: 'Remember' }" />

      <divider />

      <jb-buttons>
        <jb-button type="submit" color="info" label="Login" />
        <jb-button to="/" color="info" outline label="Back" />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import FullScreenSection from "@/components/FullScreenSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";

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
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      username: "",
      password: "",
      remember: ['remember']
    });
    const submitMethod = async ()=>{
        try {
          const res = await store.dispatch('auth/loginAction', form);
            await localStorage.setItem('authToken', res.data.token);
            router.push({
                name: 'dashboard'
            }) 
        } catch (error) {
              console.log(error)
        }
    }
    return {
      form,
      submitMethod,
      mdiAsterisk,
      mdiAccount
    };
  },
};
</script>
