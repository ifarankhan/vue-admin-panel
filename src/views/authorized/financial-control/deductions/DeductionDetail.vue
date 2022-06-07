<template>
    <div class="pt-10">
      <div class="grid grid-cols-2 md:px-2">
      <div class="flex items-center ml-8">
        <div
          class="flex items-center justify-center text-white bg-black rounded rounded-full cursor-pointer w-9 h-9 "
          @click="$router.push({name: 'financial-control-deduction-list'})"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div class="w-2/5 ml-3 font-bold truncate text-medium">Deduction- {{ deductionDetail && deductionDetail.partnerName }} </div>
      </div>
      <div class="mr-12 place-self-end">
        <span class="text-sm font-semibold"> Creation Date:  </span>
        <span class="text-sm"> {{ deductionDetail && formatDate(deductionDetail.date.split("T")[0]) }} </span>
      </div>
    </div>
    <!--  -->
    <div class="flex justify-end w-11/12 mt-3 ml-2">
      <div class="flex justify-end mr-4 cursor-pointer w-28">
         <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block" color="">
          <path :d="mdiArrowDown "/>
        </svg>
        <span class="text-sm"> Download  </span>
      </div>
       

    <div class="flex justify-end cursor-pointer w-28">
       <svg viewBox="0 0 24 24" width="18" height="18" class="inline-block mr-1" color="">
          <path :d="mdiPrinterSettings "/>
        </svg>
        <span class="text-sm"> Print Invoice  </span>
      </div>
    </div>
    <!--  -->
      <div class="w-11/12 p-4 mt-6 ml-12 bg-gray-200">
        <p class="text-sm">
        <span class="font-extrabold">Note:</span>
        This invoice will be sent to Psytech International and the cost of item added in this invoice will be deducted from your fianl invoice. Example: Expenses, Over charges, etc. 
        </p>
    </div>
    
    <!--  -->
       <div class="flex p-4 ml-8 md:mt-6">
            <div class="w-2/3">
              <div class="grid w-6/12 grid-cols-2 gap-8 pb-3">
                <div class="ml-1 font-bold text-medium">Item Type:</div>
                <div class="...">{{deductionDetail?.reference}}</div>
                <div class="ml-1 font-bold text-medium">Quantity:</div>
                <div class="...">{{deductionDetail?.quantity}}</div>
                <div class="ml-1 font-bold text-medium">Total Cost:</div>
                <div class="...">{{ deductionDetail && currency_symbols[deductionDetail?.currency.toUpperCase()] }} {{ deductionDetail?.amount }} </div>
                <div class="ml-1 font-bold text-medium">Expense Date:</div>
                <div class="...">{{ deductionDetail && formatDate(deductionDetail.date.split("T")[0]) }}</div>
              </div>
              <div class="ml-1 font-bold text-medium md:mt-6">
                Item Description / expense Details:
              </div>
              <div
                class="w-11/12 p-4 mt-2 mb-4 text-justify bg-gray-200"
                style="word-wrap: break-word"
              >
                {{ deductionDetail?.description ? deductionDetail.description: 'No Description' }} 
              </div>
            </div>
          </div>

</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from "vuex";
import { mdiArrowDown, mdiPrinterSettings    } from '@mdi/js';
import store from "../../../../store/index";
import { useClientUser } from "@/components/composition/clientHelper.js";
export default {
beforeRouteEnter(to, from, next) {
    const deductionDetail = store.getters["financialControl/getDeductionObj"];
    if (!deductionDetail) {
      next({ name: "financial-control-deduction-list" });
    }
    next();
  },
    setup() {
        const store = useStore();
        const { formatDate, currency_symbols } = useClientUser();
        const deductionDetail = computed(()=>{
            return store.getters['financialControl/getDeductionObj']
        })
    return {
        deductionDetail,
        currency_symbols,
        mdiPrinterSettings,
        mdiArrowDown,
        formatDate
     }
    },
}
</script>
