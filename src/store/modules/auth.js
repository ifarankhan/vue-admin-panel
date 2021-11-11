import axios from "../../axios";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    loginAction({},payload){
      delete payload.remember;  // REMOVE EXTRA FIELDS
       return axios.post('/v2/authorize', payload)
    } 
}

export default {
    namespaced,
    state,
    mutations,
    actions
}