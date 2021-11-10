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
                return {
                    ...line,
                    id: uniqid(),
                    stations: line.stations.map((station) => {
                        return {
                            ...station,
                            id: uniqid(),
                        }
                    })
                }
            })
        },
        geojson(state, getters) {
            const stationsGeo = []
            getters.stationsWithId.forEach((line) => {
                line.stations.forEach((station) => {
                    const stationGeo = {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [
                                station.lng, station.lat
                            ]
                        },
                        properties: {
                            name: station.name,
                            color: line.hex_color,
                            admArea: station.admArea,
                            district: station.district,
                            status: station.status
                        },
                    }
                    stationsGeo.push(stationGeo)
                })
            })
            return ({
                type: 'FeatureCollection',
                features: stationsGeo
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
