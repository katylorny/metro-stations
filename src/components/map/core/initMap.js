import mapboxgl from "mapbox-gl";

export const initMap = (component) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0eWxvcm55IiwiYSI6ImNrdnNhZDFjcmIxczgyb3M3azl6ZG8xamEifQ.egE0UVDX4gVCMuHly5a5gw';

    component.map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        // center: [37.6156, 55.7522],
        center: [128.218247267,51.496981999],
        zoom: 10 // starting zoom
    })


    component.map.on('load', () => {
        component.setLayer('stations')
        component.setLayer('stops')
    });

    component.map.on('mouseenter', ['stations', 'stops'], () => {
        component.map.getCanvas().style.cursor = 'pointer';
    })
    component.map.on('mouseleave', ['stations', 'stops'], () => {
        component.map.getCanvas().style.cursor = '';
    });
}