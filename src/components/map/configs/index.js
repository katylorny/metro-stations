export const layersConfig = {
    stops: {
        'id': 'stops',
        'type': 'circle',
        'layout': {
            'visibility': 'visible'
        },
        'source': 'stopsData',
        'paint': {
            'circle-radius': 8,
            'circle-color': 'black'
        }
    },
    stations: {
        'id': 'stations',
        'type': 'circle',
        'layout': {
            'visibility': 'visible'
        },
        'source': 'stationsData',
        'paint': {
            'circle-radius': 10,
            'circle-color': ["get", "color"]
        }
    }
}