<template>
    <slot>
         <svg @click="$emit('iconWasClicked')" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" id="custome-color" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </slot>
</template>
<script>

export default {
    emits:["iconWasClicked"],
    setup() {
        
    },
}
</script>
<style scoped>
svg:hover {
    color : #17a9e1;
}
</style>
