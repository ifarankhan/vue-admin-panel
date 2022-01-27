import { private_url, public_url } from "../../axios";
const namespaced = true;
const state = {
    clientDetail: null,
    usersTablePag: null,
    setActiveTabeForEdit: 0,
    clientUserDetail:null,
    individualClientUserDetail: null
}

const getters = {
  getClientDetail: state=>{
    return state.clientDetail
  },
  getClientUserDetail: state=>{
      return state.clientUserDetail
  },
  getIndClientUser: state=>{
    return state.individualClientUserDetail
  },
  getUsersTablePag: state=>{
    return state.usersTablePag
  }

}

const mutations = {
  setClientDetail(state, payload) {
    if(payload.incrementAccUser){
      const updatedClientDtail = {...state.clientDetail, numberOfUsers: (state.clientDetail.numberOfUsers)+1}
      state.clientDetail = updatedClientDtail;
    } else if(payload.decrementAccUser){
      const updatedClientDtail = {...state.clientDetail, numberOfUsers: (state.clientDetail.numberOfUsers)-1}
      state.clientDetail = updatedClientDtail;
    }
    else{
      state.clientDetail = payload;
    }
  },
  setClientUserDetails(state, payload){
      const updatedClientUser = {...payload}
      state.clientUserDetail = updatedClientUser;
  },
  setIndividualClientUserDetail(state, payload){
    state.individualClientUserDetail = payload;
  },
  setActiveTabeForEdit(state,payload){
    state.individualClientUserDetail = { ...state.individualClientUserDetail, activateTab: payload}
  },
  setUsersTablePag(state, payload){
    state.usersTablePag = payload;
  }
}

const actions = {
    async getAccountUsers({},payload){
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
    async getClientUserDetails({state, commit}){
      return private_url.get('account-user-details', {
        params: {
          accountId: state.clientUserDetail.accountId,
          userId: state.clientUserDetail.userId
      }
      }).then(res=>{
        let data = res.data?.data;
        if(data){
          commit("setIndividualClientUserDetail", data)
        }
        return new Promise((resolve,_)=> resolve(res))
      }).catch(error=> new Promise((_,reject)=> reject(error)))
    },
    async getTrainingProviders({}){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('training-providers', {
            params: {
              accountId: userData.accountId
            }
        })
    },
    async userEmailCheck({}, payload){
      return private_url.get('user-check', {
          params: {
            email: payload
          }
      })
    },
    async getCollectTests({}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.get('collect-tests', {
          params: {
            distributorId: userData.distributorId,
            personality: true
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
            distributorId: userData.distributorId,
            personality: true
          }
      })
    },
    async getAccountSupervisors({state}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.get('account-supervisors', {
          params: {
            distributorId: userData.distributorId,
            accountId: state.clientDetail.accountId
          }
      })
    },
    async postClientDetails({},payload){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        payload.distributorId = userData.distributorId;
        return private_url.post('add-account', payload)
    },
    async deleteUserAccount({}, payload){
      return private_url.delete('account-users', {
          params: payload
      })
    },
    async deleteClientAccount({}){
      const userData = await JSON.parse(localStorage.getItem("userData"));
      return private_url.delete('accounts', {
          params: {
            distributorId: userData.distributorId,
            accountId: state.clientDetail.accountId
          }
      })
    },
    async updateClientDetail({state, commit},payload){
        const DATA = payload;
        return private_url.put('account', payload).then(res=>{
          if(res.data?.data?.accountUpdatedSuccessfully){
            const payload = {...state.clientDetail,accountAddress: DATA.accountAddress, accountDescription: DATA.description}
            commit("setClientDetail", payload)
          }
          return new Promise((resolve,_)=> resolve(res))
        }).catch(error=> new Promise((_,reject)=> reject(error)))
    },
    async changeMasterUser({},payload){
        return private_url.post('change-master-user', null,{
            params: {
                accountId: payload.accountId,
                userId: payload.userId,
            }
        })
    },
    async updateIndUserDetail({state},payload){
      const DATA = payload;
      DATA.accountid = state.individualClientUserDetail.userDetails.accountID,
      DATA.userid = state.individualClientUserDetail.userDetails.userID
      return private_url.patch('user-details', DATA)
    },
    async updateIndCredit({state},payload){
      const DATA = payload;
      DATA.accountid = state.individualClientUserDetail.userDetails.accountID,
      DATA.userid = state.individualClientUserDetail.userDetails.userID
      return private_url.post('update-user-credits', DATA)
    },
    async updateIndUserTraining({},payload){
      return private_url.post('user-training', payload)
    },
    async updateIndUserAssessment({state},payload){
      const DATA = payload;
      DATA.userid = state.individualClientUserDetail.userDetails.userID;
      DATA.accountid = state.individualClientUserDetail.userDetails.accountID;
      return private_url.post('user-assessments', DATA)
    },
    async postAddAccountUser({state},payload){
      payload.distributorid = state.clientDetail.distributorId;
      payload.accountid = state.clientDetail.accountId;
      return private_url.post('add-account-user', payload)
  }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
