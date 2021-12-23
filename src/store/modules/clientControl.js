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
    async getAccountUsers({},payload){
       const userData = await JSON.parse(localStorage.getItem("userData"));
       return private_url.get('account-users', {
        params: payload
      })
    },
    async getClientAccount({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('client-accounts', {
            params: {
                distributorid: userData.distributorId
            }
        })
    },
    async getTrainingProviders({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('training-providers', {
            params: {
              accountId: userData.accountId
            }
        })
    },
    async getCollectTests({}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.get('collect-tests', {
          params: {
            distributorId: userData.distributorId
          }
      })
    },
    async getCollectSolutions({}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.get('collect-solutions', {
          params: {
            distributorId: userData.distributorId
          }
      })
    },
    async getCollectBattries({}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.get('collect-batteries', {
          params: {
            distributorId: userData.distributorId
          }
      })
    },
    async postClientDetails({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        payload.distributorId = userData.distributorId;
        return private_url.post('add-account', payload )
    },
    async postAddAccountUser({state},payload){
      payload.distributorid = state.clientDetail.distributorId;
      payload.accountid = state.clientDetail.accountId;
      console.log("payloadpayload",payload)
      return private_url.post('add-account-user', payload )
  }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
