import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { Router } from '@angular/router';
import { MenuDataService } from '../services/menu-data.service';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-menu-details',
  imports:[CommonModule,RouterLink,RouterLink],
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  title = "Immerse yourself in the magic of our culinary world";
  
  selectedMenu: { soup?: string; dessert?: string; drink?: string; salad?: string } = {};

  // Отделни променливи за различните рецепти
  soupDetails: any = null;
  dessertDetails: any = null;
  drinkDetails: any = null;
  saladDetails: any = null;

  constructor(private route: ActivatedRoute, private menuDataService: MenuDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedMenu = params;

      if (params['soup']) {
        this.loadRecipeDetails('soups', params['soup'], 'soupDetails');
      }
      if (params['dessert']) {
        this.loadRecipeDetails('desserts', params['dessert'], 'dessertDetails');
      }
      if (params['drink']) {
        this.loadRecipeDetails('drinkmenu', params['drink'], 'drinkDetails');
      }
      if (params['salad']) {
        this.loadRecipeDetails('salads', params['salad'], 'saladDetails');
      }
    });
  }

  loadRecipeDetails(category: string, recipeName: string, targetProperty: string): void {
    this.menuDataService.getMenuData(category).subscribe(data => {
      (this as any)[targetProperty] = data.find((item: any) => item.name === recipeName);
    });
  }
}