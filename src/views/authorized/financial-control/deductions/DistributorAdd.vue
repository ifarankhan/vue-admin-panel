<template>
  <div class="p-8">
    <sticky-header :icon="mdiPlus" title="Create Invoice Deduction">
    </sticky-header>
  </div>
</template>
<script>

import StickyHeader from "@/components/StickyHeader";
import {mdiPlus} from '@mdi/js';

export default {
  name:"FinancialControlDeductionDistributorAdd",
  components:{
    StickyHeader
  },
  setup () {
    return {
      mdiPlus
    }
  }
}
</script>
