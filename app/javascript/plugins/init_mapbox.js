import mapboxgl from 'mapbox-gl';
const initMapbox = () => {

	const fitMapToMarkers = (map, markers) => {
	  const bounds = new mapboxgl.LngLatBounds();
	  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
	  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
	};

  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
		const markers = JSON.parse(mapElement.dataset.markers);
		  markers.forEach((marker) => {
		    new mapboxgl.Marker()
		      .setLngLat([ marker.lng, marker.lat ])
		      .addTo(map);
		  });
	  fitMapToMarkers(map, markers);

    const point = JSON.parse(mapElement.dataset.circle);

    map.on('load', function(){
      var center = turf.point([point.lng, point.lat]);
      var radius = 1;
      var options = {
        steps: 80,
        units: 'kilometers'
      };

      var circle = turf.circle(center, radius, options);

      map.addLayer({
          "id": "circle-fill",
          "type": "fill",
          "source": {
              "type": "geojson",
              "data": circle
          },
          "paint": {
              "fill-color": "pink",
              "fill-opacity": 0
          }
      });
      map.addLayer({
          "id": "circle-outline",
          "type": "line",
          "source": {
              "type": "geojson",
              "data": circle
          },
          "paint": {
              "line-color": "blue",
              "line-opacity": 0.5,
              "line-width": 3,
              "line-offset": 5
          },
          "layout": {

          }
      });
    });
  }
};

export { initMapbox };
