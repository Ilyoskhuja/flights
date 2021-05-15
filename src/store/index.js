import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import flights from './flights-res-management/moduleFlightsResManagement'
import places from './places-res-management/modulePlacesResManagement'

Vue.use(Vuex)

export default new Vuex.Store({
//   actions,
  modules: {
    flights,
    places
  },
  strict: process.env.NODE_ENV !== 'production'
})