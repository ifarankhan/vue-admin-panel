<template>
  <span
      v-if="error.$error"
      class="pl-3 font-semibold text-red-700"
  >
            {{ $t(error.$errors[0].$message) }}
  </span>
</template>
<script>
export default {
  name: "ErrorSpan",
  props: ['error']
}
</script>
