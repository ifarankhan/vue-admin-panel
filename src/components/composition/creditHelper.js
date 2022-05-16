import { reactive } from "vue";
export function useCreditHelper() {
    const getUTCNow = (date)=>
    {
    let now;
    if(date){
        now = new Date(date);
    } else{
        now = new Date();
    }
        let time = now.getTime();
        let offset = now.getTimezoneOffset();
        offset = offset * 60000;
        return time - offset;
    }

    const daysDiffrence = (updateDateTime)=>{
        const today = getUTCNow()
        const dateOfUpdate = getUTCNow(updateDateTime)
        const diff = Math.trunc((today - dateOfUpdate)/(1000*60*60*24))
        return diff
      }
  return { 
    daysDiffrence
  };
}
