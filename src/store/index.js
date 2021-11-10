import Vue from 'vue'
import Vuex from 'vuex'
import uniqid from 'uniqid';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stations: []
    },
    getters: {
        stationsWithId(state) {
            return state.stations.map((line) => {
                return {...line,
                    id: uniqid(),
                    stations: line.stations.map((station) => {
                        return  {...station, id: uniqid()}
                    })
                }
            })
        }
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations
        }
    },
    actions: {},
    modules: {}
})
