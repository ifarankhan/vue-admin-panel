import {private_url, public_url_change_pass} from "../../axios";
const namespaced = true;
const state = {
    distributorDetail: null
}

const getters = {
    getDistributorDetail: state=>{
        return state.distributorDetail
    }
  }

const mutations = {
    setDistributorDetail(state, payload) {
        console.log("clled..")
        state.distributorDetail = payload;
    }
}

const actions = {
    async getAllDirtributorList({ },payload){
        return private_url.post('/master-panel-distributors-list')
    },
    async initateChangePassword({ },payload){
        return public_url_change_pass.post('/user/forgot-password/ask',{
                email: payload.email
        });
    },
    async getClientAccountForDistributor({state}){
        return private_url.get('client-accounts', {
            params: {
                distributorid: state.distributorDetail && state.distributorDetail.id
            }
        })
    },
    async editDistributorAccount({ },payload){
        return private_url.put('master-panel-distributor', payload)
    },
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
