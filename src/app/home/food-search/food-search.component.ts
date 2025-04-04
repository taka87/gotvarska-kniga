import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-food-search',
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './food-search.component.html',
  styleUrl: './food-search.component.css'
})
export class FoodSearchComponent {
  title = "Immerse yourself in the magic of our culinary world";
  
  searchQuery: string = '';
  products: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  searchFood() {
    if (!this.searchQuery.trim()) {
      this.errorMessage = 'Please select product.';
      return;
    }

    const apiUrl = `${environment.apiFoodSearchUrl}?search_terms=${this.searchQuery}&json=1`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.products.length > 0) {
          this.products = data.products.slice(0, 5); // Вземаме само първите 5 продукта
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Product not found.';
          this.products = [];
        }
      },
      (error) => {
        this.errorMessage = 'Error selected product.';
        this.products = [];
      }
    );
  }
}
