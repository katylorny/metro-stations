import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stations: []
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations
        }
    },
    actions: {},
    modules: {}
})
