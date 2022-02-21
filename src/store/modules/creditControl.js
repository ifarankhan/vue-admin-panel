import { private_url, public_url } from "../../axios";
const namespaced = true;
function getdate(){
    let today = new Date();
    let lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    return {today,lastweek}
}
const state = {
    creditStartDate: getdate().lastweek,
    creditEndDate: getdate().today,
}

const getters = {
    getCreditStartDate: state=>{
        return state.creditStartDate
    },
    getCreditEndDate: state=>{
        return state.creditEndDate
    },
}

const mutations = {
    setCreditStartDate(state,payload){
        state.creditStartDate = payload
    },
    setCreditEndDate(state, payload){
        state.creditEndDate = payload;
    }
}

const actions = {
    async transferedToMeAction({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-updates', {
            params:{
                distributorId : userData.distributorId,
                startDate : `${state.creditStartDate.getFullYear()}-${ String(state.creditStartDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditStartDate.getDate()).padStart(2, '0') }`,
                endDate : `${state.creditEndDate.getFullYear()}-${ String(state.creditEndDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditEndDate.getDate()).padStart(2, '0') }`,

            }
        })
    },
    async distributorCreditHistoryAction({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('distributor-credit-transfers', {
            params:{
                distributorId : userData.distributorId,
                startDate : `${state.creditStartDate.getFullYear()}-${ String(state.creditStartDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditStartDate.getDate()).padStart(2, '0') }`,
                endDate : `${state.creditEndDate.getFullYear()}-${ String(state.creditEndDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditEndDate.getDate()).padStart(2, '0') }`,

            }
        })
    },
    async topUpCreditAction({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.put('distributor-credits-request', {
            distributorid : userData.distributorId,
            userid: userData.userId,
            username: userData.userName,
            ...payload
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
    async transferedClientToUserAction({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('user-credit-updates', {
            params:{
                distributorId : userData.distributorId,
                startDate : `${state.creditStartDate.getFullYear()}-${ String(state.creditStartDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditStartDate.getDate()).padStart(2, '0') }`,
                endDate : `${state.creditEndDate.getFullYear()}-${ String(state.creditEndDate.getMonth() +1).padStart(2, '0') }-${ String(state.creditEndDate.getDate()).padStart(2, '0') }`,
            }
        })
    },
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
