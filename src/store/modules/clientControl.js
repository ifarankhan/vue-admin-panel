import { private_url, public_url } from "../../axios";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    async getAccountUsers({}){
       const userData = await localStorage.getItem("userData");
       return private_url.get('account-users', {
        params: {
          accountId: userData.accountId
        }
      })
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}