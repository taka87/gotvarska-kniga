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

      searchQuery: string = '';

      filterMainDishes(): void {
        this.filteredMainDishes = this.mainDishes.filter(mainDish => 
          mainDish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );  
      }
}
