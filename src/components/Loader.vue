<template>
  <div
    wire:loading
    class="
      bgColor
      absolute
      top-0
      left-0
      right-0
      bottom-0
      z-50
      w-full 
      h-full
      rounded-sm
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
  >
    <div
      class="
        loader
        ease-linear
        rounded-full
        border-4 border-t-4 border-gray-200
        h-10
        w-10
        mb-4
      "
    ></div>
  </div>
</template>
<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}
.bgColor{
    background-color: rgba(255, 255, 255, 0.25);
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