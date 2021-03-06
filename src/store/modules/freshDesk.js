import { fresh_desk_url, private_url } from "../../axios";
const namespaced = true;
const state = {
    ticketData: null,
    ticketIdFromURL: null
}

const getters = {
    getTicketData(state){
        return state.ticketData
    },
    getTicketIdFromURL: state =>{
        return state.ticketIdFromURL
    }
  }

const mutations = {
    setTicketData(state, payload){
        state.ticketData = payload
    },
    setTicketidFromURL(state, payload){
        state.ticketIdFromURL = payload;
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
    addNoteToTicket({ }, payload) {
        const TICEKT_ID = payload.ticketId;
        delete payload.ticketId;
        return fresh_desk_url.post(`/tickets/${TICEKT_ID}/notes`, payload);
    },
    updateTicketStatus({ }, payload) {
        const TICEKT_ID = payload.ticketId;
        delete payload.ticketId;
        return fresh_desk_url.put(`/tickets/${TICEKT_ID}`, payload);
    },
    async getAllTicketsByCompany({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return fresh_desk_url.get('/tickets', {
            params:{
                company_id :USER_DATA.freshdeskCompanyID
            }
        })
    },
    async getClinetAccountUsersForSupport({ }, payload){
        return private_url.get('support-account-users', 
            {
                params: payload
          })
    },
    async getClientAccountForSupport({ }){
        const userData = await JSON.parse(localStorage.getItem("userData"));
        return private_url.get('support-client-accounts', {
            params:{
                distributorid :userData.distributorId
            }
        })
    },
    async getAllContacts({ },payload){
        return fresh_desk_url.get('/contacts')
    },
    async getAllAgents({ },payload){
        return fresh_desk_url.get('/agents')
    },
    async getIndividualTicket({ }, payload){
        return fresh_desk_url.get(`/tickets/${payload.ticketId}`)
    },
    async getTicketConversation({ }, payload){
        return fresh_desk_url.get(`/tickets/${payload.ticketId}/conversations?page=${payload.pageNo}`)
    },

}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
