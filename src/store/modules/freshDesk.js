import { fresh_desk_url } from "../../axios";
const namespaced = true;
const state = {
    
}

const getters = {

  }

const mutations = {
 
}

const actions = {
    async createCompany({ dispatch },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return fresh_desk_url.post('/companies', {
            name: USER_DATA.distributorUserName,
            description: ""
        }).then( async res => {
            let data = res?.data?.id;
            if(data){
                await dispatch("associateUserToCompany", {companyId: data})
            }
            return new Promise((resolve,_)=> resolve(res))
          }).catch(error=> new Promise((_,reject)=> reject(error)))
    },
    async associateUserToCompany({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return fresh_desk_url.post('/contacts', {
            name: "mainUser",
            email: USER_DATA.userName,
            company_id: payload.companyId
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
