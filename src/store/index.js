import Vue from 'vue'
import Vuex from 'vuex'
import uniqid from 'uniqid';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stations: [],
        stops: [],
        stopsInputValue: '',

        // selectedStation: {}
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
        stationsGeojson(state, getters) {
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
                            // color: line.hex_color,
                            color: `#${line.hex_color}`,
                            id: station.id,
                            admArea: station.admArea,
                            district: station.district,
                            status: station.status
                        },
                    }
                    stationsGeo.push(stationGeo)
                })
            })
            return stationsGeo
        },
        stopsGeojson(state) {
            return state.stops.map(stop => {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: stop.geom.coordinates
                    },
                    properties: {
                        id: stop.id,
                        name: stop.name
                    },
                }
            })
        },
        getStationById: (state, getters) => id => {
            return getters.stationsGeojson.features.find(station => {
                return station.properties.id === id
            })
        },
        shownStops(state, getters) {
            return getters.stopsGeojson.filter((stop) => {
                return stop.properties.name.indexOf(state.stopsInputValue) > -1
            })
        }
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations
        },
        setStops(state, stops) {
            state.stops = Object.values(stops)
        },
        setStopsInputValue(state, value) {
            state.stopsInputValue = value
        }
    },
    actions: {},
    modules: {}
})
