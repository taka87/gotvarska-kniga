import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { MainDishService } from '../../../services/maindishes.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maindishes',
  imports: [NavigationComponent,CommonModule,FormsModule, RouterLink],
  templateUrl: './maindishes.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class MaindishesComponent {
  title = 'Ready recipes section for:';

    mainDishes: any[] = [];
    selectedMainDishes: any = null;
    filteredMainDishes: any[] = [];
    searchQuery: string = '';
    autocompleteSuggestions: any[] = [];

  
    constructor(private mainDishService: MainDishService) {}
  
    ngOnInit(): void {
      this.mainDishService.getMainDishes().subscribe((data) => {
        this.mainDishes = data;
        this.filteredMainDishes=[...this.mainDishes]

        if(this.mainDishes.length > 0)
          {
            this.selectMainDishes(this.mainDishes[0]);
          }
      });
    }
  
    selectMainDishes(maindishe: any): void {
      this.selectedMainDishes = maindishe;
    }

   

      filterMainDishes(): void {
        this.filteredMainDishes = this.mainDishes.filter(mainDish => 
          mainDish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );  

         // Генериране на подсказки
  this.autocompleteSuggestions = this.filteredMainDishes.slice(0, 5); // Ограничаваме до 5 предложения
}

    selectSuggestedMainDishes(mainDish: any): void {
      this.searchQuery = mainDish.name;
      this.filteredMainDishes = [mainDish]; // Показваме само избраната супа
      this.autocompleteSuggestions = [];
    }
}

