import { private_url, public_url } from "../../axios";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    async transferedToMeAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-updates', {
            params:{
                distributorId : userData.distributorId,
                ...payload
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
    async creditCorrectionAction({},payload){
        const DATA = payload;
        const userData = await JSON.parse(localStorage.getItem("userData"));
        DATA.distributorid = userData.distributorId;
        if(!DATA.userid){
            DATA.userid = userData.userId;
        }
        return private_url.post('distributor-credit-correction', DATA)
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
