import { private_url } from "../../axios";
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
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
