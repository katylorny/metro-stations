import mutationTypes from "./mutation-types";

export default {
    [mutationTypes.SET_STATIONS](state, stations) {
        state.stations = stations
    },
    [mutationTypes.SET_STOPS](state, stops) {
        state.stops = Object.values(stops)
    },
    [mutationTypes.SET_STOPS_INPUT_VALUE](state, value) {
        state.stopsInputValue = value
    },
    [mutationTypes.SET_STATIONS_INPUT_VALUE](state, value) {
        state.stationsInputValue = value
    }
}

