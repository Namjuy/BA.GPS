import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map!: L.Map;
  initialView = { lat: 21.01158471251956, lng: 105.78064478236135, zoom: 19 };
  drawnItems = new L.FeatureGroup();

 customIcon = L.icon({
    iconUrl: '../../../../assets/car_icon.png', 
    iconSize: [30, 30], 
    iconAnchor: [15, 15], 
    popupAnchor: [0, -15]
});

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

  // Khởi tạo map
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

    // Tạo chức năng của thanh công cụ
    const drawControl = new L.Control.Draw({
      edit: { featureGroup: this.drawnItems },
      draw: {
        polygon: { shapeOptions: { color: 'red', weight: 2 } },
        polyline: { shapeOptions: { color: 'green', weight: 2 } },
        rectangle: { shapeOptions: { color: 'yellow', weight: 2 } },
        circle: { shapeOptions: { color: 'blue', weight: 2 } },
        marker: { 
          icon: this.customIcon 
        }
      }
    });
      
    // Thêm thanh công cụ vào trong map
    this.map.addControl(drawControl);

    this.map.on('click', (event) => {
       L.marker(event.latlng, { icon: this.customIcon }).addTo(this.map);
    });
  };

}
