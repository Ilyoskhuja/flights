import state from './moduleFlightsResManagementState.js'
import mutations from './moduleFlightsResManagementMutations.js'
import actions from './moduleFlightsResManagementActions.js'
import getters from './moduleFlightsResManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

