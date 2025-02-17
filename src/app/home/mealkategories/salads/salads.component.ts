import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { SaladService } from '../../../services/salads.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-salads',
  imports: [CommonModule, RouterModule,NavigationComponent, FormsModule],  
  templateUrl: './salads.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class SaladsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

    salads: any[] = [];
    selectedSalad: any = null;
    filteredSalads: any[] = [];
    autocompleteSuggestions: any[] = [];

  
    constructor(private saladService: SaladService) {} //inject) SaladService-> извлича данните от json
  
    ngOnInit(): void {
      this.saladService.getSalads().subscribe((data) => {
        this.salads = data;
        this.filteredSalads=[...this.salads];
      });
    }
  
    selectSalad(salad: any): void {
      this.selectedSalad = salad;
    }

    searchQuery: string = '';

    filterSalads(): void {
      this.filteredSalads = this.salads.filter(salad => 
        salad.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    

        // Генериране на подсказки
  this.autocompleteSuggestions = this.filteredSalads.slice(0, 5); // Ограничаваме до 5 предложения
}

selectSuggestedSalad(salad: any): void {
  this.searchQuery = salad.name;
  this.filteredSalads = [salad]; // Показваме само избраната супа
  this.autocompleteSuggestions = [];
}
}
