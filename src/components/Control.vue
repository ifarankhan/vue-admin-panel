<template>
    <textarea
        v-if="type=='textarea'"
        :id="id"
        placeholder=" "
        v-model="computedValue"
        class="w-full text-xs font-medium border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"
        :class="extraClasses"
        autocomplete="off"
    ></textarea>
  <select
    v-else-if="type == 'select'"
    v-model="computedValue"
    :id="id"
    class="text-xs font-medium"
    :class="inputElClass"
    style="height: 45px; min-height: 45px; max-height: 45px"
  >
    <option
      v-for="option in options"
      :key="option.value ?? option"
      :value="option.value"
      class="block p-4 text-xs border-l-4 border-transparent top-10 group-hover:border-blue-600 group-hover:bg-gray-100"
    >
      {{ option.text ?? option.text }}
    </option>
  </select>
  <FileUpload v-else-if="type == 'imageupload'" @select="imageUploaded($event)" :multiple="true" :maxFileSize="2000000">
    <template #empty>
      <p>Drag and drop files to here to upload.</p>
    </template>
  </FileUpload>

  <Calendar v-else-if="type == 'date'" id="icon" v-on:keyup.enter="$emit('enterPressed')"
            class="text-xs font-medium"
            :class="inputElClass"
            @blur="$emit('onFocusLeave')"
            onfocus="this.removeAttribute('readonly');"
            v-model="computedValue"
            :placeholder="placeholder"
            inputClass="clanderField"
            dateFormat="mm-dd-yy" />
  <input
    v-else
    :type="type"
    :id="id"
    v-model="computedValue"
    :class="inputElClass"
    :disabled="disabled"
    placeholder=" "
    :maxlength="maxlength"
    onfocus="this.removeAttribute('readonly');"
    @blur="$emit('onFocusLeave')"
    readonly
    v-on:keyup.enter="$emit('enterPressed')"
    class="text-xs font-medium"
    autocomplete="off"
    style="height: 45px; min-height: 45px; max-height: 45px"
  />
    <control-icon
    @iconWasClicked="$emit('iconWasClicked')"
    v-if="icon"
    :icon="icon"
    :h="controlIconH"
  />
</template>
<script>
import { computed } from "vue";
import ControlIcon from '@/components/ControlIcon'
import FileUpload from 'primevue/fileupload';
import Calendar from 'primevue/calendar';


export default {
  emits: ["update:modelValue", "right-icon-click","iconWasClicked"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength:{
      type: String,
      default: ''
    },
    icon: String,
    options: Array,
    id: {
      type: String,
    },
    smallTextArea:{
      type: Boolean,
      default: false
    },
    placeholder:{
      type: String,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
  },
  components:{
    ControlIcon,
    FileUpload,
    Calendar
  },
  setup(props, { emit }) {
     let extraClasses;
     if(!props.smallTextArea && props.type === "textarea"){
       extraClasses = "h-32";
     } else if(props.smallTextArea && props.type === "textarea"){
       extraClasses = "h-20";
     } else{
       extraClasses = "h-14";
     }
    const computedValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      },
    });

    const computedType = computed(() =>
      props.options ? "select" : props.type
    );

    const controlIconH = computed(() => props.type === 'textarea' ? 'h-full' : 'h-12')

    const inputElClass = computed(() => {
      const base = [
        'w-full m-w-full border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"',
        computedType.value === "textarea" ? "h-24" : "h-14",
      ];

      return base;
    });

    const imageUploaded = (data)=>{
      emit("imagesUploaded", data.files)
    }

    return {
      computedValue,
      inputElClass,
      imageUploaded,
      computedType,
      controlIconH,
      extraClasses,
    };
  },
};
</script>
<style scoped>
input:hover,
select:hover {
  border-color: #17a9e1;
}
</style>
