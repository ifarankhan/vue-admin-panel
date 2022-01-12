<template>
   <div class="flex p-4 mx-4">
      <div class="flex items-center w-6">
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600 "
        ></div>
      </div>
      <div class="flex items-center w-2/4">
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 0 ? 'text-gray-800 text-opacity-50' : '', enabledClick?'cursor-pointer':'']"
          @click="enabledClick? $emit('updatedShowStep', 0):null"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-teal-600 rounded-full "
            :class="[
              showStep == 0
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            1
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-12 text-center">
            User Detail
          </div>
        </div>
        <div
          v-if="userType != 4 && userType != 1"
          class="flex-auto border-t-2 border-teal-600"
        ></div>
        <div
          v-if="userType != 4 && userType != 1"
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 1 ? 'text-gray-800 text-opacity-50' : '']"
          @click="enabledClick? $emit('updatedShowStep', 1):null"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 bg-teal-600 border-2 border-teal-600 rounded-full "
            :class="[
              showStep == 1
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            2
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Training Selection
          </div>
        </div>
        <div class="flex-auto border-t-2 border-gray-300"></div>
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 2 ? 'text-gray-800 text-opacity-50' : '']"
          @click="enabledClick? $emit('updatedShowStep', 2):null"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 rounded-full "
            :class="[
              showStep == 2
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            {{
              userType != 1 && userType != 4 ? "3" : "2"
            }}
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Assessments
          </div>
        </div>
        <div
          class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300 "
        ></div>
        <div
          class="relative flex items-center text-xs font-semibold"
          :class="[showStep != 3 ? 'text-gray-800 text-opacity-50' : '']"
          @click="enabledClick? $emit('updatedShowStep', 3):null"
        >
          <div
            class="flex items-center justify-center w-8 h-8 py-3 border-2 border-gray-300 rounded-full "
            :class="[
              showStep == 3
                ? 'bg-black text-white'
                : 'text-gray-800 text-opacity-50',
            ]"
          >
            {{
              userType != 1 && userType != 4 ? "4" : "3"
            }}
          </div>
          <div class="absolute top-0 w-32 mt-10 -ml-10 text-center">
            Credit Control
          </div>
        </div>
      </div>
      <div class="flex items-center w-5/12">
        <div class="flex-auto border-t-2 border-teal-600"></div>
      </div>
    </div>
</template>
<script>

export default {
  props:['showStep','userType',"enabledClick"],
    setup() {
    },
}
</script>
