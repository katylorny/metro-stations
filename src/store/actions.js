import {SET_IS_LOADING, SET_STATIONS, SET_STOPS, SET_IS_ERROR} from './helpers/mutation-types'

export default {
    async loadData({commit}) {
        try {
            commit(SET_IS_LOADING, true)

            await new Promise(resolve => {
                setTimeout(resolve, 1000)
            })

            const [stationsData, stopsData] = await Promise.all([
                fetch(`./metro.json`),
                fetch(`./stops.json`)
            ])

            const stationsResult = await stationsData.json()
            const stopsResult = await stopsData.json()

            commit(SET_STATIONS, stationsResult)
            commit(SET_STOPS, stopsResult)
            commit(SET_IS_LOADING, false)

        } catch (err) {
            console.log(`err`, err);
            commit(SET_IS_LOADING, false)
            commit(SET_IS_ERROR, true)
        }
    }
}