import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterLink } from '@angular/router';

declare var google: any; // ⬅️ Декларираме google, защото не е TypeScript модул

@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, CommonModule, RouterLink ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  title = "Добре дошли в нашия кулинарен свят";

  constructor() {}

  ngOnInit(): void {
    this.loadMap();

    const mapElement = document.getElementById('map');
  
    // Проверка за ресайз
    window.addEventListener('resize', () => {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(burgasCoords);
    });
  
    const burgasCoords = { lat: 42.5048, lng: 27.4626 };
    const map = new google.maps.Map(mapElement, {
      zoom: 16,
      center: burgasCoords,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
  
    new google.maps.Marker({
      position: burgasCoords,
      map: map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(50, 50)
      },
      animation: google.maps.Animation.DROP
    });
  }

  loadMap(): void {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 42.5048, lng: 27.4626 }, // 📍 Координати (примерно за София)
      zoom: 12, // 🔍 Ниво на zoom
    });

    new google.maps.Marker({
      // position: { lat: 42.6977, lng: 23.3242 },
      position: { lat: 42.5048, lng: 27.4626 }, // Център Бургас

      map,
      title: "Тук е София!",
    });
  }

//   // Добавете това във вашия компонент
// ngAfterViewInit() {
//   this.initMap();
// }

// private initMap(): void {
//   const sofia = { lat: 42.6977, lng: 23.3219 };
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       zoom: 15,
//       center: sofia,
//       mapTypeControl: false,
//       streetViewControl: false
//     }
//   );

//   new google.maps.Marker({
//     position: sofia,
//     map: map,
//     title: "Нашият офис"
//   });
// }


  // ngOnInit() {
  //   const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: 42.6977, lng: 23.3242 }, // София
  //     zoom: 10,
  //   });
  // }
}
