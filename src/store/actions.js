import mutationTypes from "./helpers/mutation-types";

export default {
    async loadData({commit}) {
        try {
            commit(mutationTypes.SET_IS_LOADING, true)

            await new Promise(resolve => {
                setTimeout(resolve, 1000)
            })

            const [stationsData, stopsData] = await Promise.all([
                fetch(`./metro.json`),
                fetch(`./stops.json`)
            ])

            const stationsResult = await stationsData.json()
            const stopsResult = await stopsData.json()

            commit(mutationTypes.SET_STATIONS, stationsResult)
            commit(mutationTypes.SET_STOPS, stopsResult)
            commit(mutationTypes.SET_IS_LOADING, false)

        } catch (err) {
            console.log(`err`, err);
            commit(mutationTypes.SET_IS_LOADING, false)
            commit(mutationTypes.SET_IS_ERROR, true)
        }
    }
}