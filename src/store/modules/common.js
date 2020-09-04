import areaCode from '@/utils/areaCode'
const state = {
  backRouteParams: {},
  areaCode: areaCode
}

const mutations = {
  SET_BACK_ROUTE_PARAMS (state, params) {
    state.backRouteParams = params
  }
}

const actions = {
  setBackRouteParams ({ commit }, params) {
    commit('SET_BACK_ROUTE_PARAMS', params)
  }
}

export default {
  state,
  mutations,
  actions
}
