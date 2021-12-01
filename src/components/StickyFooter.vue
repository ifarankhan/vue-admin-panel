<template>
  <section class="fixed bottom-0 w-full p-6 pt-5 bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white z-50">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'StickyFooter',
}
</script>
