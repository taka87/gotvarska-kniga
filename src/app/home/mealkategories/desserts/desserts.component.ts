import { Component,OnInit } from '@angular/core';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { DesertService } from '../../../services/desert.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-desserts',
  imports: [NavigationComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './desserts.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class DessertsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

    desserts: any[] = [];
    selectedDessert: any = null;
    filteredDesserts: any[] = [];

  
    constructor(private dessertService: DesertService) {} 
    
    ngOnInit(): void {
      this.dessertService.getDeserts().subscribe((data) => {
        this.desserts = data;
        this.filteredDesserts=[...this.desserts];
      });
    }
  
    selectDessert(dessert: any): void {
      this.selectedDessert = dessert;
    }

    searchQuery: string = '';

    filterDesserts(): void {
      this.filteredDesserts = this.desserts.filter(dessert => 
        dessert.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
}
