<template>
      <div class="flex items-center justify-between">
              <div class="flex items-center mt-8">
                <p class="text-sm font-bold text-black">Select Date Range:</p>
                <div class="w-56 ml-3 mr-6">
                  <Datepicker
                    v-model="transferredObj.startDate"
                    autoApply
                    :closeOnAutoApply="true"
                    :enableTimePicker="false"
                    placeholder="From Date"
                    @closed="$emit('datePicked',transferredObj),datePicked(transferredObj)"></Datepicker>
                </div>
                <div class="w-56">
                  <Datepicker
                    v-model="transferredObj.endDate"
                    autoApply
                    :closeOnAutoApply="true"
                    :enableTimePicker="false"
                    placeholder="To Date"
                    @closed="$emit('datePicked',transferredObj),datePicked(transferredObj)"></Datepicker>
                </div>
              </div>

          <!-- search -->
          <div class="relative flex justify-end pt-2 mt-8 text-gray-600 ">
            <div class="-mt-2.5">
              <psytech-button
              @buttonWasClicked="$emit('exportCSV')"
              label="Export CSV"
              type="outline"
              v-if="data"
            >
              <icon :path="mdiFileDelimitedOutline" />
            </psytech-button>
            </div>
            <input
              class="h-10 px-5 pr-16 font-bold text-gray-700 bg-white border-gray-300 rounded-full border-1 focus:outline-none focus:ring-psytechBlueBtHover"
              type="search"
              name="search"
              v-model="transferredObj.searchedText"
              @input="$emit('valuedChanged', transferredObj.searchedText)"
              placeholder="Search..."
            />
            <button type="submit" class="absolute top-0 right-0 mt-5 mr-4">
              <svg
                class="w-4 h-4 text-gray-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style="enable-background: new 0 0 56.966 56.966"
                xml:space="preserve"
                width="512px"
                height="512px"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
          <!-- end search -->
          </div>
</template>
<script>
import IconSVG from "@/components/IconSVG.vue";
import PsytechButton from "@/components/PsytechButton";
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
    props:["data"],
    components:{
        IconSVG,
        PsytechButton
    },
    setup() {
      const store = useStore();
      const startDate = store.getters["creditControl/getCreditStartDate"];
      const EndDate = store.getters["creditControl/getCreditEndDate"];

        const transferredObj = reactive({
        startDate:startDate,
        endDate:EndDate,
        searched: "",
        })
        const datePicked = (e)=>{
            if(!e.startDate || !e.endDate){
              return
            }
          store.commit("creditControl/setCreditStartDate",e.startDate);
          store.commit("creditControl/setCreditEndDate",e.endDate);
        }
        return {
            transferredObj,
            datePicked,
        }
    },
}
</script>
