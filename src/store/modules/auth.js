import axios from "../../axios";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    loginAction({},payload){
       return axios.post('partner/authorize', payload)
    },
}

export default {
    namespaced,
    state,
    mutations,
    actions
}