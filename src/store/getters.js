import uniqid from "uniqid";

export default {
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
    getters.shownStations.forEach((line) => {
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
    activeStationData: (state, getters) => {
        return getters.stationsGeojson.find(station => {
            return station.properties.id === state.selectedId
        })
    },
        shownStops(state, getters) {
    return getters.stopsGeojson.filter((stop) => {
        return stop.properties.name.indexOf(state.stopsInputValue) > -1
    })
},
    shownStations(state, getters) {
    const filteredLines = getters.stationsWithId.filter((line) => {
        return line.stations.some(station => station.name.indexOf(state.stationsInputValue) > -1)
    })
    const linesWithFilteredStations = []
    filteredLines.forEach((lineInfo) => {
        const lineWithFilteredStations = {
            ...lineInfo,
            stations: lineInfo.stations.filter(station => {
                return station.name.indexOf(state.stationsInputValue) > -1
            })
        }
        linesWithFilteredStations.push(lineWithFilteredStations)
    })
    return linesWithFilteredStations
}
}