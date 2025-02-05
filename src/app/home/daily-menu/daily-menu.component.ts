import { Component, OnInit } from '@angular/core';
import { MenuDataService } from '../../services/menu-data.service';
import { ActivatedRoute } from '@angular/router'; // За параметри
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-menu',
  templateUrl: './daily-menu.component.html',
  styleUrls: ['./daily-menu.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class DailyMenuComponent implements OnInit {
  soups: any[] = [];
  desserts: any[] = [];
  drinks: any[] = [];
  salads: any[] = [];
  
  filteredSoups: any[] = [];
  filteredDesserts: any[] = [];
  filteredDrinks: any[] = [];
  filteredSalads: any[] = [];

  selectedMenu: { soup: string, dessert: string, drink: string, salad: string } = {
    soup: '',
    dessert: '',
    drink: '',
    salad: ''
  };

  constructor(
    private menuDataService: MenuDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData('soups', 'soups');       // soups.json
    this.loadData('desserts', 'desserts'); // desserts.json
    this.loadData('drinks', 'drinkmenu');  // drinkmenu.json
    this.loadData('salads', 'salads');     // salads.json
  }

  private loadData(property: string, fileName: string): void {
    this.menuDataService.getMenuData(fileName).subscribe(
      data => {
        console.log(`Заредени данни за ${property}:`, data); // Проверка на данните
        (this as any)[property] = data;
        this.resetFilters(property);
      },
      error => {
        console.error(`Грешка при зареждане на ${fileName}:`, error);
      }
    );
  }
  
  filterItems(inputValue: string, category: string): void {
    if (!inputValue) {
      this.resetFilters(category);
      return;
    }
  
    const lowercaseInput = inputValue.toLowerCase();
  
    switch (category) {
      case 'soups':
        this.filteredSoups = this.soups.filter(item =>
          item.name.toLowerCase().includes(lowercaseInput)
        );
        break;
      case 'desserts':
        this.filteredDesserts = this.desserts.filter(item =>
          item.name.toLowerCase().includes(lowercaseInput)
        );
        break;
      case 'drinks':
        this.filteredDrinks = this.drinks.filter(item =>
          item.name.toLowerCase().includes(lowercaseInput)
        );
        break;
      case 'salads':
        this.filteredSalads = this.salads.filter(item =>
          item.name.toLowerCase().includes(lowercaseInput)
        );
        break;
      default:
        console.warn(`Unknown category: ${category}`);
        break;
    }
  }
  private resetFilters(category: string): void {
    switch (category) {
      case 'soups':
        this.filteredSoups = [...this.soups]; // Копиране на супите
        break;
      case 'desserts':
        this.filteredDesserts = [...this.desserts]; // Копиране на десертите
        break;
      case 'drinks':
        this.filteredDrinks = [...this.drinks]; // Копиране на напитките
        break;
      case 'salads':
        this.filteredSalads = [...this.salads]; // Копиране на салатите
        break;
      default:
        console.warn(`Непозната категория: ${category}`);
        break;
    }
  }

  submitMenu(): void {
    this.router.navigate(['/menu-details'], { queryParams: this.selectedMenu });
  }

  // navigateToSelectedMenu(): void {
  //   const queryParams = { ...this.selectedMenu };
  //   this.router.navigate(['/daily-menu'], { queryParams });
  // }
}