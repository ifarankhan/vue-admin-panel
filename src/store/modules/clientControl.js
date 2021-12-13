import { private_url, public_url } from "../../axios";
const namespaced = true;
const state = {
  clientDetail: null
}

const getters = {
  getClientDetail: state=>{
    return state.clientDetail
  }
}

const mutations = {
  setClientDetail(state, payload) {
    state.clientDetail = payload;
  },
}

const actions = {
    async getAccountUsers({}){
       const userData = await JSON.parse(localStorage.getItem("userData"));
       return private_url.get('client-accounts', {
        params: {
            distributorid: userData.distributorId
        }
      })
    },
    async postClientDetails({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        payload.distributorId = userData.distributorId;
        return private_url.post('add-account', payload )
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
