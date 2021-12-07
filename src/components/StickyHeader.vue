<template>
  <section
      class="sticky z-30 min-h-full pt-5 pb-3 bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-900 dark:text-white top-20">
    <slot>
      <h1 class="pl-6 text-2xl font-normal leading-tight">
      <span v-if="icon">
        <svg viewBox="0 0 24 24" width="30" height="30" class="inline-block">
        <path :d="icon"/>
      </svg>
      </span>

        {{ $t(title) }}
      </h1>
    </slot>


  </section>
</template>
<script>
export default {
  name: 'StickyHeader',
  props: ['title', 'icon']
}
</script>
