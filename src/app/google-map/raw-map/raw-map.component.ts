import { Component,OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-raw-map',
  imports: [],
  // imports: [GoogleMapsModule],
  templateUrl: './raw-map.component.html',
  styleUrl: './raw-map.component.css'
})
export class RawMapComponent implements OnInit {
  private map!: google.maps.Map; // Запазваме картата в свойство

  ngOnInit(): void {
    console.log('Google Maps API Key:', environment.googleMapsApiKey); // Провери дали се зарежда правилно
    this.loadGoogleMaps(); // Зареждаме API-то
  }

  loadGoogleMaps(): void {
    if (window['google'] && window['google'].maps) {
      console.log('Google Maps API вече е зареден.');
      this.loadMap(); // Ако API-то е заредено, директно зареждаме картата
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps API зареден успешно!');
      this.loadMap(); // Когато API-то се зареди, създаваме картата
    };

    document.body.appendChild(script);
  }

  loadMap(): void {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) {
      console.error("Картата не е намерена в DOM-а.");
      return;
    }

    this.map = new google.maps.Map(mapElement as HTMLElement, {
      center: { lat: 42.499851, lng: 27.480515 },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
    });

    new google.maps.Marker({
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
