import {private_url, public_url_change_pass} from "../../axios";
const namespaced = true;
const state = {

}

const getters = {

  }

const mutations = {

}

const actions = {
    async getAllDirtributorList({ },payload){
        return private_url.post('/master-panel-distributors-list')
    },
    async initateChangePassword({ },payload){
        return public_url_change_pass.post('/user/forgot-password/ask',{
                email: payload.email
        });
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
