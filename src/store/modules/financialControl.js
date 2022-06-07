import { private_url } from "../../axios";
const namespaced = true;
const state = {
    distributorName: '',
    deductionObj: null
}

const getters = {
    getDistributorName: state =>{
        return state.distributorName
    },
    getDeductionObj: state =>{
        return state.deductionObj
    }
  }

const mutations = {
    setDistributorName : (state, payload)=>{
        state.distributorName = payload
    },
    setDeductionObj : (state, payload)=>{
        state.deductionObj = payload
    }
}

const actions = {
    async addDeduction({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        if(!USER_DATA.isMasterPanelUser){
            payload.partnerId = USER_DATA.distributorId;
        }
        return private_url.post('partner-credit-deductions', payload)
    },
    async statementSendEmail({ },payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        if(!USER_DATA.isMasterPanelUser){
            payload.partnerId = USER_DATA.distributorId;
        }
        return private_url.post('send-partner-statement', payload)
    },
    async getDeductionList({}, payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return private_url.get('partner-credit-deductions', {
            params: {
                distributorId: USER_DATA.distributorId
            }
        })
      },
    async getStatementList({}){
        return private_url.get('/partner-statements')
      }, 
    async getMasterDeductionList({}, payload){
        const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
        return private_url.get('credit-deductions', {
            params: {
                // distributorId: USER_DATA.distributorId
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
