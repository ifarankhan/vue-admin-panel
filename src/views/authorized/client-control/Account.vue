<template>
  <sticky-header :icon="mdiPlus" title="Create Client"></sticky-header>
  <main-section>
    <card-component title="Add Client Account" @submit.prevent="submit" form>
      <field>
      <control type="text" placeholder="Client/Company Name" v-model="form.cname" />
      </field>
      <field>
      <control type="textarea" placeholder="Account Details"/>
      </field>
      <field>
        <control type="textarea" placeholder="Account Details"/>
      </field>
      <field>
        <control type="textarea" placeholder="Account Details"/>
      </field>
      <field>
        <control type="textarea" placeholder="Account Details"/>
      </field>
      <field>
        <control type="textarea" placeholder="Account Address"/>
      </field>
      <divider/>

      <jb-buttons>
        <jb-button type="submit" color="info" label="Submit" />
        <jb-button type="reset" color="info" outline label="Reset" />
      </jb-buttons>
    </card-component>
  </main-section>

  <sticky-footer>
    <h1>asdfasdfadsfs</h1>
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
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '',
      department: selectOptions[0],
      subject: '',
      question: ''
    })

    const customElementsForm = reactive({
      checkbox: ['lorem'],
      radio: 'one',
      switch: ['one'],
      file: null
    })

    const submit = () => {
      //
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
