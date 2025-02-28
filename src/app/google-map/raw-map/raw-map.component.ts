import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-raw-map',
  imports: [GoogleMapsModule],
  templateUrl: './raw-map.component.html',
  styleUrl: './raw-map.component.css'
})
export class RawMapComponent {
  private map!: google.maps.Map; // Запазваме картата в свойство
  
  ngOnInit(): void {
    setTimeout(() => {
      this.loadMap();
    }, 500);

    // window.addEventListener('resize', () => {
    //   if (this.map) {
    //     google.maps.event.trigger(this.map, 'resize');
    //     this.map.setCenter({ lat: 42.50666, lng: 27.484537 }); // Бургас
    //   }
    // });
  }

  loadMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error("Картата не е намерена в DOM-а.");
      return;
    }
    // console.log("Картата е намерена, зареждам...");
    // this.loadMap();

    this.map = new google.maps.Map(mapElement as HTMLElement, {
      center: { lat: 42.499851, lng: 27.480515 },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
    });

    

    new google.maps.Marker({
      // position: { lat: 42.5048, lng: 27.4626 },
      position: { lat: 42.499851, lng: 27.480515 },
      map: this.map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(50, 50)
      },
      animation: google.maps.Animation.DROP
    });
  }
}
