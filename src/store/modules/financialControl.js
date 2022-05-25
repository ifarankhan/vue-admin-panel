import { private_url } from "../../axios";
const namespaced = true;
const state = {
}

const getters = {

  }

const mutations = {

}

const actions = {
    async addDeduction({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        payload.partnerId = USER_DATA.distributorId;
        return private_url.post('partner-credit-deductions', payload)
    },
    async getDeductionList({}, payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return private_url.get('partner-credit-deductions', {
            params: {
                distributorId: USER_DATA.distributorId
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
