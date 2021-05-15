import state from './modulePlacesResManagementState.js'
import mutations from './modulePlacesResManagementMutations.js'
import actions from './modulePlacesResManagementActions.js'
import getters from './modulePlacesResManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

