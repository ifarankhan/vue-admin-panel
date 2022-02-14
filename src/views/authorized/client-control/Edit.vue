<template>
  <Loader v-if="form.loader" :toBeBigger="true" />
  <sticky-header :icon="mdiPlus" title="Edit Client"></sticky-header>
  <main-section class="grid grid-cols-3 gap-4">
     <div class="col-span-2 form">
       <form action="#" @submit.prevent="submit">
              <error-alert
              v-if="errorText"
              @dismissError="errorText = ''"
              :error="errorText"
              :showTranslatedError="false"
            />
            <div class="ml-2.5 font-bold text-medium">Client Name</div>
              <div
                class="p-3 mt-1 mb-4 ml-2 text-justify bg-gray-200"
                style="word-wrap: break-word; width: 98.3%;"
              >
                {{
                 form.companyName
                }}
              </div>
         <field label="Client Detail" labelFor="accountDetails">
           <control type="textarea" v-model="form.accountDetails" placeholder="Account Details"/>
           <error-span :error="v$.accountDetails"></error-span>
         </field>
         <field label="Client Address" labelFor="accountAddress">
           <control type="textarea" v-model="form.accountAddress" placeholder="Account Address"/>
           <error-span :error="v$.accountAddress"></error-span>
         </field>
         <divider/>
       </form>
     </div>
  </main-section>

  <sticky-footer>
    <div class="relative flex justify-end" style="padding-right:15%">
      <psytech-button label="Update" @click="submit"></psytech-button>
      <psytech-button label="Cancel" type="Secondary" @buttonWasClicked="$router.push({name:'client-control-list-detail'})"></psytech-button>
    </div>
  </sticky-footer>

</template>
<script>
import { ref,reactive,computed } from 'vue'
import utility from "@/components/composition/utility";
import { mdiPlus } from '@mdi/js'
import MainSection from '@/components/MainSection';
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import PsytechButton from '@/components/PsytechButton'
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import {minLength, helpers, required,maxLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useStore } from "vuex";
import Loader from "@/components/Loader.vue";
import ErrorSpan from "@/components/ErrorSpan";
import store from '../../../store/index';
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters['clientControl/getClientDetail'];
    if(!accountDetail){
      next({name: 'list-page'})
    }
    next()
  },
  name: "client-control-details",
  components: {
    Divider,
    MainSection,
    CheckRadioPicker,
    Field,
    Control,
    PsytechButton,
    StickyHeader,
    StickyFooter,
    ErrorSpan,
    Loader,
    ErrorAlert,
    utility,
  },
  setup () {
    let errorText = ref("");
    const store = useStore();
    const accountDetail = computed(()=>{
      return store.getters['clientControl/getClientDetail']
    })
    
    const form = reactive({ 
      companyName: accountDetail.value?.accountName??'',
      accountDetails: accountDetail.value?.accountDescription??'',
      accountAddress: accountDetail.value?.accountAddress??'',
      loader: false
    })
    
    const rules = computed(() => {
      return {
        accountDetails: {
          required: helpers.withMessage("Account Details are required", required),
          minLength: minLength(10),
          maxLength:maxLength(255)
        },
        accountAddress: {
          required: helpers.withMessage("Account Address are required", required),
          minLength: minLength(10),
          maxLength:maxLength(255)
        },
      };
    });

    const v$ = useVuelidate(rules, form);

    const submit = () => {
      // if (v$.value.$validate() && v$.value.$error) {
      //   return true;
      // }
      form.loader = true;
      errorText.value = "";
      //Send validated from to user.
      const DATA = {
        accountId: accountDetail.value.accountId,
        accountAddress: form.accountAddress,
        description: form.accountDetails
      }

      store
      .dispatch("clientControl/updateClientDetail", DATA).then(res=>{
        const RESPONSE_DATA = res.data;
       if (RESPONSE_DATA.status == 200 && !RESPONSE_DATA?.data?.message) {
         store.commit('clientControl/setUsersTablePag',null)
         const { navigateTo } = utility('client-control-list-detail'); navigateTo();
       }
      else{
          throw new Error(RESPONSE_DATA.data.message);
        }
      }).catch(error=>{
        errorText.value = error?.message ?? "";
      }).finally(()=>{
        form.loader = false;
      })
    }

    return {
      form,
      v$,
      errorText,
      submit,
      mdiPlus
    }
  }
}
</script>
<style scoped>
::-webkit-input-placeholder { /* WebKit browsers */
  color:    #fff;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:    #fff;
  opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:    #fff;
  opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color:    #fff;
}
</style>
