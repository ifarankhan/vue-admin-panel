<template>
  <sticky-header>
  <div class="pt-10">
    <div class="grid grid-cols-2 md:px-2">
      <div class="flex items-center ml-8">
        <div
            class="flex items-center justify-center w-8 h-8 text-white bg-black rounded rounded-full cursor-pointer "
            @click="$router.push({ name: 'list-page' })"
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
        <div class="w-2/5 ml-3 font-bold truncate text-medium">{{ accountDetail && accountDetail.accountName }} </div>
      </div>
      <div class="mr-12 place-self-end">
        <span class="text-sm font-semibold"> Creation Date: </span>
        <span class="text-sm"> {{ accountDetail && accountDetail.creationDate?formatDate(accountDetail.creationDate):'' }} </span>
      </div>
    </div>
  </div>
  </sticky-header>
</template>
<script>
import { reactive, ref, computed} from "vue";
import store from "@/store/index";
import {useStore} from "vuex";
import StickyHeader from "@/components/StickyHeader";

export default {
  components:[
    StickyHeader,
  ],
  name: "client-control-view-user",
  beforeRouteEnter(to, from, next) {
    const accountDetail = store.getters["clientControl/getClientDetail"];
    if (!accountDetail) {
      next({ name: "list-page" });
    }
    next();
  },
  setup(){
    const store = useStore();
    const accountDetail = computed(() => {
      return store.getters["clientControl/getClientDetail"];
    });
    const formatDate = (value) => {
      return new Date(value).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }
    return {accountDetail,formatDate}
  }
}
</script>
