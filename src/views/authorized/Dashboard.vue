<template>
    <h1>Welcome to Dashboard</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="logoutHanlder">
        Button
    </button>

</template>
<script>
import utility from '../../components/composition/utility';
export default {
    setup() {
      const logoutHanlder = async ()=>{
           await localStorage.removeItem("authToken")
           const { navigateTo } = utility('login')
           navigateTo()
       }

       return {
           logoutHanlder
       }
    },
}
</script>
