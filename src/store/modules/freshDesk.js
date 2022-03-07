import { fresh_desk_url } from "../../axios";
const namespaced = true;
const state = {
    ticketData: null
}

const getters = {
    
  }

const mutations = {
    setTicketData(state, payload){
        state.ticketData = payload
    }
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
            name: USER_DATA.distributorUserName,
            email: USER_DATA.userName,
            company_id: payload.companyId
        })
    },
    addTikcetWithAttachments({ }, payload) {
        const headers = {
            'Content-Type': 'multipart/form-data',
          }
        return fresh_desk_url.post('/tickets', payload, {
            headers: headers
          });
    },
    async getAllTicketsByCompany({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return fresh_desk_url.get('/tickets', {
            params:{
                company_id :USER_DATA.freshdeskCompanyID
            }
        })
    },
    async getIndividualTicket({ state }){
        return fresh_desk_url.get(`/tickets/${state.ticketData.ticketId}`)
    },
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
