<template>
  <sticky-header :icon="mdiPlus" title="Create Client"></sticky-header>
  <main-section class="grid grid-cols-3 gap-4">
     <div class="col-span-2 form">
       Jere
     </div>
  </main-section>

</template>
<script>
import { ref, reactive,computed } from 'vue'
import utility from "@/components/composition/utility";
import { mdiPlus } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import PsytechButton from '@/components/PsytechButton'
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import {minLength, helpers, required,maxLength} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";

export default {
  name: "client-control-view",
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
