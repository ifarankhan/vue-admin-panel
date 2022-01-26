import { private_url, public_url } from "../../axios";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    async transferedToMeAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-transfers', {
            params:{
                distributorId : userData.distributorId
            }
        })
    },
    async distributorCreditHistoryAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-history', {
            params:{
                distributorId : userData.distributorId,
                startDate: "2022-01-01",
                endDate: "2022-01-26"
            }
        })
    },
    async transferedToMeAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-transfers', {
            params:{
                distributorId : userData.distributorId
            }
        })
    },
}

export default {
    namespaced,
    state,
    mutations,
    actions
}
