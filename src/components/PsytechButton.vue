<template>
  <button :class="componentClass" @click="$emit('buttonWasClicked')">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <span> {{ $t(label) }} </span>
  </button>
</template>
<script>
import { computed } from "vue";

export default {
  name: "PsytechButton",
  emits: ["buttonWasClicked"],
  props: {
    label: String,
    type: {
      type: String,
      default: "primary",
    },
    smallYPadding:{
      type: Boolean,
      default: false
    },
    smallText:{
      type: Boolean,
      default: false
    },
    enabledBackBtn:{
      type: Boolean,
      default: false
    },
    extraClasses:{
      type: String,
      default: null
    },
    buttonWithIcon: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const componentClass = computed(() => {
      const base = ["px-4", "rounded-full", "border"];
      if (props.type === "primary") {
        base.push("m-2 bg-psytechBlue hover:bg-psytechBlueBtHover text-white");
      }
      if (props.type === "Secondary") {
        base.push(
          "m-2 bg-transparent hover:bg-psytechBlueBtHover text-psytechBlue hover:text-white border-psytechBlue hover:border-transparent"
        );
      }
      if(props.type == "black-small"){
         base.push(
          "mt-2 mr-2 border-2 border-gray-300 border-solid bg-psytechBlack text-white"
        );
        if(!props.smallYPadding){
          base.push("text-sm")
        }
      }

    if(props.type == "light-small"){
         base.push(
          "mt-2 mr-4 bg-psytechLight text-white"
        );
         if(!props.smallYPadding){
          base.push("text-sm")
        }
      }

      if (props.type == "dark") {
        base.push(
          "mt-2 mr-2 inline-flex items-center text-sm border-2 border-gray-300 border-solid bg-psytechDark text-white"
        );
        if(props.enabledBackBtn){
          base.push("px-10 py-1")
        }
      }
      if(props.type == 'light'){
         base.push(
          "mt-2 mr-2 inline-flex items-center text-sm bg-psytechLight text-white px-10 py-1"
        );
      }
      if(props.type == 'black'){
         base.push(
          "mt-2 mr-2 inline-flex items-center text-sm bg-psytechBlack text-white px-10 py-1"
        );
      }
      if (props.type === "outline") {
        base.push(
          "mt-2 mr-2 inline-flex items-center font-bold text-gray-700 border-2 border-gray-300 border-solid bg-transparent-300 hover:text-white hover:border-psytechBlue hover:bg-psytechBlueBtHover"
        );
      }
      if (props.type === "danger") {
        base.push(
          "mt-2 mr-2 inline-flex items-center font-medium text-white bg-psytechRed text-sm px-10"
        );
      }
      if(props.smallText){
        base.push('text-gray-400')
      } 
      if(props.smallYPadding){
        base.push('py-1.5')
      }else{
        base.push("py-2")
      }
      if(props.extraClasses){
        base.push(props.extraClasses)
      }
      return base;
    });
    return {
      componentClass,
    };
  },
};
</script>
