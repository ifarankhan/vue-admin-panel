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
    async creditCorrectionAction({state},payload){
        const DATA = payload;
        DATA.accountid = state.individualClientUserDetail.userDetails.accountID;
        // DATA.userid = state.individualClientUserDetail.userDetails.userID
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
