<template>
  <select
    v-if="computedType == 'select'"
    v-model="computedValue"
    :id="id"
    :class="inputElClass"
  >
    <option
      v-for="option in options"
      :key="option.value ?? option"
      :value="option.value"
      class="block p-4 text-xs border-l-4 border-transparent group-hover:border-blue-600 group-hover:bg-gray-100"
    >
      {{ option.text ?? option.text }}
    </option>
  </select>
  <input
    v-if="computedType == 'text'"
    :type="type"
    :id="id"
    v-model="computedValue"
    :class="inputElClass"
    autocomplete="off"
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
        'w-full border border-gray-200 rounded-md focus:ring-transparent focus:outline-none focus:border-psytechBlueDark focus:shadow-sm"',
        computedType.value === "textarea" ? "h-24" : "h-14",
      ];

      return base;
    });

    return {
      computedValue,
      inputElClass,
      computedType,
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
