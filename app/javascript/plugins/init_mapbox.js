import mapboxgl from 'mapbox-gl';
import spotterIcon from '../images/spotter_icon.png';
import ezwaveIcon from '../images/ezwave_icon.png';
import simcostaIcon from '../images/simcosta_icon.png';


const initMapbox = () => {

	const fitMapToMarkers = (map, markers) => {
	  const bounds = new mapboxgl.LngLatBounds();
	  markers.forEach(marker => bounds.extend([ marker.lon, marker.lat ]));
	  map.fitBounds(bounds, { padding: 70, maxZoom: 13, duration: 0 });
	};

  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

		const markers = JSON.parse(mapElement.dataset.markers);

    const simcostaData = JSON.parse(mapElement.dataset.simcosta);
    const spotterData = JSON.parse(mapElement.dataset.spotter);
    const ezwaveData = JSON.parse(mapElement.dataset.ezwave);


    markers.forEach((marker) => {
      console.log(markers)
      if (marker.name === 'wkb_rj4') {
        var simcosta = document.createElement('div');
        simcosta.className = 'marker';
        simcosta.style.backgroundImage = `url('${simcostaIcon}')`;
        simcosta.style.backgroundSize = 'contain';
        simcosta.style.width = '25px';
        simcosta.style.height = '60px';
  	    new mapboxgl.Marker(simcosta)
  	      .setLngLat([ marker.lon, marker.lat ])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>LAT: ${Math.round(marker.lon*100)/100}, LON: ${Math.round(marker.lat*100)/100}</p>
            <p>DATA-HORA: ${simcostaData.date_time[simcostaData.date_time.length -1].slice(0,16)}</p>
            <p>Hsig: ${simcostaData.swvht[simcostaData.date_time.length -1]}</p>
            <p>Vel. Vento: ${simcostaData.wspd[simcostaData.date_time.length -1]}</p>`))
  	      .addTo(map);
      } else if (marker.name === 'wkb_rj3'){
        var spotter = document.createElement('div');
        spotter.className = 'marker';
        spotter.style.backgroundImage = `url('${simcostaIcon}')`;
        spotter.style.backgroundSize = 'contain';
        spotter.style.width = '25px';
        spotter.style.height = '60px';
        new mapboxgl.Marker(spotter)
          .setLngLat([ marker.lon, marker.lat ])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>LAT: ${Math.round(marker.lon*100)/100}, LON: ${Math.round(marker.lat*100)/100}</p>
            <p>DATA-HORA: ${spotterData.date_time[spotterData.date_time.length -1].slice(0,16)}</p>
            <p>Hsig: ${spotterData.swvht[spotterData.date_time.length -1]}</p>
            <p>Vel. Vento: ${spotterData.wspd[spotterData.date_time.length -1]}</p>`))
          .addTo(map);
      } else {
        var ezwave = document.createElement('div');
        ezwave.className = 'marker';
        ezwave.style.backgroundImage = `url('${ezwaveIcon}')`;
        ezwave.style.backgroundSize = 'contain';
        ezwave.style.width = '50px';
        ezwave.style.height = '49px';
        new mapboxgl.Marker(ezwave)
          .setLngLat([ marker.lon, marker.lat ])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>LAT: ${Math.round(marker.lon*100)/100}, LON: ${Math.round(marker.lat*100)/100}</p>
            <p>DATA-HORA: ${ezwaveData.date_time[ezwaveData.date_time.length -1].slice(0,16)}</p>
            <p>Hsig: ${ezwaveData.swvht[ezwaveData.date_time.length -1]}</p>
            <p>Vel. Vento: ${ezwaveData.wspd[ezwaveData.date_time.length -1]}</p>`))
          .addTo(map);
      }
	  });

	  fitMapToMarkers(map, markers);

  }
};

export { initMapbox };
