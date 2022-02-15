<template>
  <div
    wire:loading
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-sm"
    :class="[toBeBigger?'bgColorDarker':'bgColor']"
  >
    <div
      class="mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"
      :class="[toBeBigger?'w-20 h-20':'w-10 h-10']"
    ></div>
  </div>


   <!-- <div
    wire:loading
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-sm bgColor"
  >
    <div
      class="w-10 h-10 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"
    ></div>
  </div> -->

</template>
<script>

export default {
  props:{
    toBeBigger: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    
  },
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}
.bgColor{
    background-color: rgba(255, 255, 255, 0.25);
}

.bgColorDarker{
    background-color: rgba(255, 255, 255, 0.7);
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>