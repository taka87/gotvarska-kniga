import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterLink } from '@angular/router';
import { RawMapComponent } from '../raw-map/raw-map.component';

declare var google: any; // ⬅️ Декларираме google, защото не е TypeScript модул

@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, CommonModule, RouterLink, RawMapComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  title = "Immerse yourself in the magic of our culinary world";
}
