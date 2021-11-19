import mutationTypes from "./mutation-types";

export default {
    loadData({commit}) {
        fetch(`./metro.json`)
            .then(response => response.json())
            .then((response) => {
                commit(mutationTypes.SET_STATIONS, response)
            })

        fetch(`./stops.json`, {})
            .then(response => response.json())
            .then(response => {
                commit(mutationTypes.SET_STOPS, response)
            })
    }
}