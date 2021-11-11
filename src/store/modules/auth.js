import axios from "../../axios";
const namespaced = true;
const state = {};

const mutations = {};

const actions = {
  loginAction({}, payload) {
    axios
      .post("/v2/authorize", payload)
      .then((res) => {
        console.log("auth response is...", res);
      })
      .catch((error) => {
        console.log("auth error...", error);
      });
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
};
