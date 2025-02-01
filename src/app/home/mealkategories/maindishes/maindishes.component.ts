import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { MainDishService } from '../../../services/maindishes.service';

@Component({
  selector: 'app-maindishes',
  imports: [NavigationComponent,CommonModule],
  templateUrl: './maindishes.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class MaindishesComponent {
  title = 'Добре дошли в нашия кулинарен свят';

    mainDishes: any[] = [];
    selectedMainDishes: any = null;
  
    constructor(private mainDishService: MainDishService) {}
  
    ngOnInit(): void {
      this.mainDishService.getMainDishes().subscribe((data) => {
        this.mainDishes = data;
      });
    }
  
    selectMainDishes(maindishe: any): void {
      this.selectedMainDishes = maindishe;
    }
}
