<template>
    <Message severity="success" @close="$store.commit('financialControl/setDistributorName',null)">
        <slot></slot>
    </Message>
</template>

<script>
import Message from 'primevue/message';
export default {
  name:"add",
  components: {
    Message
  } ,
   setup() {

    return {
     
    };
  },
}
</script>