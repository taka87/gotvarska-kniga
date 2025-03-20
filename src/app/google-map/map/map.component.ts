import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterLink } from '@angular/router';
import { RawMapComponent } from '../raw-map/raw-map.component';
import { SupabaseContactFormService } from '../../online-DB/online-DB-services/supabase-contact-form.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var google: any; // ⬅️ Декларираме google, защото не е TypeScript модул

@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, CommonModule, RouterLink, RawMapComponent,FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  title = "Immerse yourself in the magic of our culinary world";

  //Contact form
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(
    private supabaseContactFormService: SupabaseContactFormService,
    private snackBar:MatSnackBar
  ) {}  

  async submitForm() {
    try {
      const response = await this.supabaseContactFormService.sendMessage(
        this.name,
        this.email,
        this.message
      );
      
    this.showMessagesWithDelay();

      // console.log('Message sent successfully:', response);
      // alert('Message sent successfully!')

      // ✅ Зануляваме полетата
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (error) {
      // alert('Error sending message: ' + (error as any).message);
      this.showMessage('Error sending message: ');
    }
  }

  
  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  showMessage1(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  showMessagesWithDelay() {
    this.showMessage('✅ Message sent successfully: ✅'); // Показва първото съобщение веднага
  
    setTimeout(() => {
      this.showMessage1('✅ Съобщението изпратено успешно ✅'); // Показва второто съобщение след 3 секунди (3000ms)
    }, 5000);
  }
}