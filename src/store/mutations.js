import {
    SET_IS_ERROR,
    SET_IS_LOADING,
    SET_SELECTED_STATION_ID, SET_SELECTED_STOP_ID, SET_SELECTED_TYPE,
    SET_STATIONS,
    SET_STATIONS_INPUT_VALUE,
    SET_STOPS,
    SET_STOPS_INPUT_VALUE,
} from "./helpers/mutation-types";

export default {
    [SET_STATIONS](state, stations) {
        state.stations = stations
    },
    [SET_STOPS](state, stops) {
        state.stops = Object.values(stops)
    },
    [SET_STOPS_INPUT_VALUE](state, value) {
        state.stopsInputValue = value
    },
    [SET_STATIONS_INPUT_VALUE](state, value) {
        state.stationsInputValue = value
    },
    [SET_SELECTED_STATION_ID](state, value) {
        state.selectedStationId = value
    },
    [SET_SELECTED_STOP_ID](state, value) {
        state.selectedStopId = value
    },
    [SET_SELECTED_TYPE] (state, type) {
        state.selectedType = type
    },
    [SET_IS_LOADING] (state, isLoading) {
        state.isLoading = isLoading
    },
    [SET_IS_ERROR] (state, isError) {
        state.isError = isError
    },
}

