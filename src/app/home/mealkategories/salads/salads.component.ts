import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { SaladService } from '../../../services/salads.service';


@Component({
  selector: 'app-salads',
  imports: [CommonModule, RouterModule,NavigationComponent],  
  templateUrl: './salads.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class SaladsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

    salads: any[] = [];
    selectedSalad: any = null;
  
    constructor(private saladService: SaladService) {} //inject) SaladService-> извлича данните от json
  
    ngOnInit(): void {
      this.saladService.getSalads().subscribe((data) => {
        this.salads = data;
      });
    }
  
    selectSalad(salad: any): void {
      this.selectedSalad = salad;
    }
}
