<template>
  <sticky-header :icon="mdiPlus" title="Create Client"></sticky-header>
  <main-section class="grid grid-cols-3 gap-4">
     <div class="form col-span-2">
       <form action="#" @submit.prevent="submit">
         <field label="Company Name" labelFor="companyname">
           <control type="text" v-model="form.companyName" placeholder="Email"/>
           <span
               v-if="v$.companyName.$error"
               class="pl-3 font-semibold text-red-700"
           >
            {{ $t(v$.companyName.$errors[0].$message) }}
          </span>
         </field>
         <field label="Account Detail" labelFor="accountDetails">
           <control type="textarea" v-model="form.accountDetails" placeholder="Account Details"/>
           <span
               v-if="v$.accountDetails.$error"
               class="pl-3 font-semibold text-red-700"
           >
            {{ $t(v$.accountDetails.$errors[0].$message) }}
          </span>
         </field>
         <field label="Account Address" labelFor="accountAddress">
           <control type="textarea" v-model="form.accountAddress" placeholder="Account Address"/>
           <span
               v-if="v$.accountAddress.$error"
               class="pl-3 font-semibold text-red-700"
           >
            {{ $t(v$.accountAddress.$errors[0].$message) }}
          </span>
         </field>
         <divider/>
       </form>
     </div>
  </main-section>

  <sticky-footer>
    <div class="relative flex justify-end" style="padding-right:15%">
        <check-radio-picker
            name="sample-checkbox"
            v-model="form.addAnother"
            :options="{ another: 'Create Another'}"
        />
      <psytech-button label="Create Account" @click="submit"></psytech-button>
      <psytech-button label="Cancel" type="Secondary" @click="cancel"></psytech-button>
    </div>
  </sticky-footer>

</template>
<script>
import { ref, reactive,computed } from 'vue'
import utility from "@/components/composition/utility";
import { mdiPlus } from '@mdi/js'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import FilePicker from '@/components/FilePicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import PsytechButton from '@/components/PsytechButton'
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import TitleSubBar from '@/components/TitleSubBar'
import {minLength, helpers, required,maxLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "client-control-details",
  components: {
    TitleSubBar,
    Divider,
    MainSection,
    FilePicker,
    CheckRadioPicker,
    CardComponent,
    TitleBar,
    Field,
    Control,
    PsytechButton,
    StickyHeader,
    StickyFooter,
    utility,
  },
  setup () {
    const titleStack = ref(['Admin', 'Forms'])

    const selectOptions = [
      { id: 1, label: 'Business development' },
      { id: 2, label: 'Marketing' },
      { id: 3, label: 'Sales' }
    ]

    const form = reactive({
      companyName: '',
      accountDetails: '',
      accountAddress: '',
      addAnother: 0
    })

    // const customElementsForm = reactive({
    //   checkbox: ['lorem'],
    //   radio: 'one',
    //   switch: ['one'],
    //   file: null
    // })

    const rules = computed(() => {
      return {
        companyName: {
          required: helpers.withMessage("Company Name is required", required),
          minLength: minLength(4),
          maxLength:maxLength(255)
        },
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
      if (v$.value.$validate() && v$.value.$error) {
        return true;
      }
      //Send validated from to user.
      console.log(form.addAnother)
    }

    const cancel = ()=>{
      const { navigateTo } = utility('dashboard'); navigateTo();
    }

    return {
      titleStack,
      selectOptions,
      form,
      v$,
      cancel,
      // customElementsForm,
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
