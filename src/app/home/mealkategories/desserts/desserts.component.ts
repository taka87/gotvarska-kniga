import { Component,OnInit } from '@angular/core';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { DesertService } from '../../../services/desert.service';



@Component({
  selector: 'app-desserts',
  imports: [NavigationComponent,CommonModule],
  templateUrl: './desserts.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class DessertsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

    desserts: any[] = [];
    selectedDessert: any = null;
  
    constructor(private dessertService: DesertService) {} //inject) SaladService-> извлича данните от json
  
    ngOnInit(): void {
      this.dessertService.getDeserts().subscribe((data) => {
        this.desserts = data;
      });
    }
  
    selectDessert(dessert: any): void {
      this.selectedDessert = dessert;
    }
}
