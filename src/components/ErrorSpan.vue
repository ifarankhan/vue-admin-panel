<template>
  <span
      v-if="error.$error"
      class="pl-3 text-sm font-semibold text-red-700"
  >
    {{ error.$errors[0].$message }}
  </span>
  <span class="pl-3 text-sm font-semibold text-red-700" v-if="customeError"> {{ customeError }} </span>
</template>
<script>
export default {
  name: "ErrorSpan",
  props:{
    error: {
      default: ''
    },
    customeError: {
      type: String,
      default: ''
    }
  }
}
</script>
