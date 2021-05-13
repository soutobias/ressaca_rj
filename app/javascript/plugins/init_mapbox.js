import mapboxgl from 'mapbox-gl';
const initMapbox = () => {

	const fitMapToMarkers = (map, markers) => {
	  const bounds = new mapboxgl.LngLatBounds();
	  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
	  map.fitBounds(bounds, { padding: 70, maxZoom: 11, duration: 0 });
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
	    new mapboxgl.Marker({"scale": 0.4})
	      .setLngLat([ marker.lng, marker.lat ])
        .setPopup(new mapboxgl.Popup().setHTML(`<p>LAT: ${marker.lng}, LON: ${marker.lat}</p>
          <p>DATA-HORA: ${marker.date_time}</p>`))
	      .addTo(map);
	  });
    new mapboxgl.Marker({"color": "green"})
      .setLngLat([ markers[markers.length -1].lng, markers[markers.length -1].lat ])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>LAT: ${markers[markers.length -1].lng}, LON: ${markers[markers.length -1].lat}</p>
        <p>DATA-HORA: ${markers[markers.length -1].date_time}</p>`))
      .addTo(map);


	  fitMapToMarkers(map, markers);

    const point = JSON.parse(mapElement.dataset.circle);

    map.on('load', function(){
      var center = turf.point([point.lng, point.lat]);
      var radius = 1;
      var options = {
        steps: 80,
        units: 'kilometers'
      };
    });
  }
};

export { initMapbox };
