import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { MainDishService } from '../../../services/maindishes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maindishes',
  imports: [NavigationComponent,CommonModule,FormsModule],
  templateUrl: './maindishes.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class MaindishesComponent {
  title = 'Добре дошли в нашия кулинарен свят';

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

