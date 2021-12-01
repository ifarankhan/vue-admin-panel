<template>
  <sticky-header :icon="mdiPlus" title="Create Client"></sticky-header>
  <main-section class="grid grid-cols-3 gap-4">
     <div class="form col-span-2">
       <form action="#" @submit.prevent="submit">
         <field label="Company Name" labelFor="email">
           <control type="text" v-model="form.companyName" placeholder="Email"/>
         </field>
         <field label="Account Detail" labelFor="email">
           <control type="textarea" v-model="form.accountDetails" placeholder="Account Details"/>
         </field>
         <field label="Account Address" labelFor="email">
           <control type="textarea" v-model="form.accountAddress" placeholder="Account Address"/>
         </field>
         <divider/>
       </form>
     </div>
    <div class="">

    </div>


  </main-section>

  <sticky-footer>
    <div class="relative flex justify-end" style="padding-right:15%">
      <jb-buttons>
        <check-radio-picker
            name="sample-checkbox"
            v-model="customElementsForm.checkbox"
            :options="{ another: 'Create Another'}"
        />

        <jb-button type="button" color="info" label="Submit" :click="submit" />
        <jb-button type="reset" color="info" outline label="Reset" />
      </jb-buttons>
    </div>
  </sticky-footer>

</template>
<script>
import { ref, reactive } from 'vue'
import { mdiPlus } from '@mdi/js'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import FilePicker from '@/components/FilePicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import StickyHeader from "@/components/StickyHeader";
import StickyFooter from "@/components/StickyFooter";
import TitleSubBar from '@/components/TitleSubBar'
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
    JbButton,
    JbButtons,
    StickyHeader,
    StickyFooter
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
    })

    const customElementsForm = reactive({
      checkbox: ['lorem'],
      radio: 'one',
      switch: ['one'],
      file: null
    })

    const submit = () => {
      console.log(form.companyName)
    }

    return {
      titleStack,
      selectOptions,
      form,
      customElementsForm,
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
