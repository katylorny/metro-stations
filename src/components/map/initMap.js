import mapboxgl from "mapbox-gl";

export const initMap = (component) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';

    component.map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [37.6156, 55.7522],
        zoom: 10 // starting zoom
    })


    component.map.on('load', () => {
        component.setStationsLayer()
        component.setStopsLayer()
    });

    component.map.on('idle', () => {
        if (!component.map.getLayer('stops') || !component.map.getLayer('stations')) {
            return;
        }

        const toggleableLayerIds = ['stations', 'stops'];

        for (const id of toggleableLayerIds) {
            if (document.getElementById(id)) {
                continue;
            }

            const link = document.createElement('a');
            link.id = id;
            link.href = '#';
            link.textContent = id;
            link.className = 'active';

// Show or hide layer when the toggle is clicked.
            link.onclick = (e) => {
                const clickedLayer = link.textContent;
                e.preventDefault();
                e.stopPropagation();

                const visibility = component.map.getLayoutProperty(
                    clickedLayer,
                    'visibility'
                );

// Toggle layer visibility by changing the layout object's visibility property.
                if (visibility === 'visible') {
                    component.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    link.className = '';
                } else {
                    link.className = 'active';
                    component.map.setLayoutProperty(
                        clickedLayer,
                        'visibility',
                        'visible'
                    );
                }
            };

            const layers = document.getElementById('menu');
            layers.appendChild(link);
        }
    });
    component.map.on('mouseenter', ['stations', 'stops'], () => {
        component.map.getCanvas().style.cursor = 'pointer';
    })
    component.map.on('mouseleave', ['stations', 'stops'], () => {
        component.map.getCanvas().style.cursor = '';
    });
}