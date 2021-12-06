<template>
    <textarea
        v-if="type=='textarea'"
        :id="id"
        v-model="computedValue"
        class="w-full h-24 border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"
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
  <input
    v-else
    :type="type"
    :id="id"
    v-model="computedValue"
    :class="inputElClass"
     class="text-xs font-medium"
    autocomplete="off"
    style="height: 45px; min-height: 45px; max-height: 45px"
  />
</template>
<script>
import { computed } from "vue";
export default {
  emits: ["update:modelValue", "right-icon-click"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    options: Array,
    id: {
      type: String,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
  },
  setup(props, { emit }) {
     let extraClasses = props.type === "textarea"? 'h-32':'h-14';
    const computedValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      },
    });

    const computedType = computed(() =>
      props.options ? "select" : props.type
    );

    const inputElClass = computed(() => {
      const base = [
        'w-full m-w-full border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"',
        computedType.value === "textarea" ? "h-24" : "h-14",
      ];

      return base;
    });

    return {
      computedValue,
      inputElClass,
      computedType,
      extraClasses
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
