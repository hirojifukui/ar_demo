 
document.querySelector('#enable-location-btn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(
    pos => console.log(pos),
    err => console.error(err),
    );
});
let places = staticLoadPlaces();
renderPlaces(places);


function staticLoadPlaces() {
    return [
        {
            name: 'castle3',
            location: {
                lat: 37.361071,
                lng: -122.041786,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './models/castle3.glb');
        model.setAttribute('rotation', '0 0 0');
        model.setAttribute('scale', '1 1 1');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}