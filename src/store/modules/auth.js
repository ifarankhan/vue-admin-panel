import axios from "../../axios";
import utility from "../../components/composition/utility";
const namespaced = true;
const state = {

}

const mutations = {

}

const actions = {
    loginAction({},payload){
       return axios.post('authorize', payload)
    }, 
    async refreshTokenAction({}){
       const USER_DATA = await JSON.parse(localStorage.getItem('userData'))
       const DATA = {
        token: USER_DATA.authToken,
        refreshToken:  USER_DATA.refreshToken
       }
      return axios.post('refresh-token', DATA)
    },
    async logoutAction({},payload){
        await localStorage.removeItem("userData");
        const { navigateTo } = utility(payload);
        navigateTo();
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}