import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import 'leaflet-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map!:L.Map;
  initialView = { lat: 21.01158471251956, lng: 105.78064478236135, zoom: 19 };
  drawnItems = new L.FeatureGroup();

  ngOnInit(): void {
    this.initMap();
  }

  setCoordinate = (event: any): void => {
    this.initialView.lat = event.get('lat');
    this.initialView.lng = event.get('lng');
    this.initialView.zoom = event.get('zoom');

    // Set the new map view using the updated initial coordinates and zoom level
    this.map.setView(
      [this.initialView.lat, this.initialView.lng],
      this.initialView.zoom
    );
  };

  initMap = (): void => {
    this.map = L.map('map').setView(
      [this.initialView.lat, this.initialView.lng],
      this.initialView.zoom
    );

    L.tileLayer('https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 30,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">',
    }).addTo(this.map);

    this.map.addLayer(this.drawnItems);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: this.drawnItems },
      draw: {
        polygon: { shapeOptions: { color: 'red', weight: 2 } },
        polyline: { shapeOptions: { color: 'green', weight: 2 } },
        rectangle: { shapeOptions: { color: 'yellow', weight: 2 } },
        circle: { shapeOptions: { color: 'blue', weight: 2 } },
        marker: {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: '../../../../assets/car_icon.png',
            // shadowUrl
          }),
        },
      },
    });

    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
    });
  };

}
