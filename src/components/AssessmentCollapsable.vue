<template>
  <div class="mb-10">
    <div class="flex items-center cursor-pointer" @click="collapsable = !collapsable">
                  <span
                  >
                    <svg
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        class="inline-block"
                    >
                      <path :d=" collapsable ? mdiChevronDown: mdiChevronUp" />
                    </svg>
                  </span>
      <span class="-ml-0.5 text-sm font-semibold">{{ dividerLabel }}:</span>
      <div class="flex-auto ml-4 border-t-2 border-gray-300"></div>
    </div>
    <!--  -->
    <div
        class="grid grid-cols-4 gap-8 pl-4 mt-2"
        v-if="collapsable"
    >
      <div v-for="(item, index) in userData" :key="index">
        <div class="flow-root w-72">
          <div class="float-left w-8 h-32">
                        <span class="w-4 box">
                          <span class="flex items-center justify-center w-6 h-6 p-2 text-white bg-black rounded rounded-full">
                            {{index+1}}
                          </span>
                        </span>
          </div>
          <div class="right-holder">
            <p class="ml-4 text-sm font-bold">{{ isBatteries? item.batteryTitle:item.testID }}</p>
            <p class="ml-4 text-sm">{{  isBatteries? item.batteryName:item.testName }}</p>
            <p class="ml-4 text-sm font-semibold">
              Allow Unsupervised:
              {{ isBatteries? (item.allowUnsupervised ? "Yes" : "No") : (item.allowedUnsupervised ? "Yes" : "No")}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import Icon from "@/components/Icon";
import { onMounted, ref, computed,reactive} from "vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
export default {
  name: 'AssessmentCollapsable',
  components: {Icon},
  props: {
    userData: {
      required: true
    },
    collapsable: {
      type: Boolean,
      default: true,
    },
    dividerLabel: {
      type: String,
      default: "Collection"
    },
    isBatteries:{
      type: Boolean,
      default: false,
    }
  },
  setup(){
    return {
      mdiChevronDown,
      mdiChevronUp
    }
  }
}
</script>
