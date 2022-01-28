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
                distributorId : userData.distributorId,
                startDate: "2015-12-03",
                endDate: "2022-01-28"
            }
        })
    },
    async distributorCreditHistoryAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-history', {
            params:{
                distributorId : userData.distributorId,
                ...payload
            }
        })
    },
    async transferedClientToUserAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('user-credit-updates', {
            params:{
                distributorId : userData.distributorId,
                ...payload
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
