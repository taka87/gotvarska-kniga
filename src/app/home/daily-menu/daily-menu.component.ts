//Daily-menu_> new


import { Component, OnInit } from '@angular/core';
import { MenuDataService } from '../../services/menu-data.service';
import { ActivatedRoute } from '@angular/router'; // За параметри
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Дефинирайте интерфейс за филтрираните списъци
interface FilteredLists {
  filteredSoups: any[];
  filteredDesserts: any[];
  filteredDrinks: any[];
  filteredSalads: any[];
}

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

  // selectedMenu: Record<string, string> ={
    selectedMenu: { [key: string]: string } ={
    soup: '',
    dessert: '',
    drink: '',
    salad: ''
  };

  constructor(
    private menuDataService: MenuDataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData('soups', 'soups');
    this.loadData('desserts', 'desserts');
    this.loadData('drinks', 'drinkmenu');
    this.loadData('salads', 'salads');
  }

  private loadData(property: string, fileName: string): void {
    this.menuDataService.getMenuData(fileName).subscribe(
      data => {
        (this as any)[property] = data;
        this.resetFilters(property);
      },
      error => {
        console.error(`Грешка при зареждане на ${fileName}:`, error);
      }
    );
  }

  private resetFilters(category: string): void {
    switch (category) {
      case 'soups':
        this.filteredSoups = [...this.soups];
        break;
      case 'desserts':
        this.filteredDesserts = [...this.desserts];
        break;
      case 'drinks':
        this.filteredDrinks = [...this.drinks];
        break;
      case 'salads':
        this.filteredSalads = [...this.salads];
        break;
      default:
        console.warn(`Непозната категория: ${category}`);
        break;
    }
  }

  // Във функцията filterItems за всяка категория добави .slice(0, 10)
  filterItems(inputValue: string, category: string): void {
    type FilteredCategory = 
      | 'filteredSoups' 
      | 'filteredDesserts' 
      | 'filteredDrinks' 
      | 'filteredSalads';
  
    const filteredKey = `filtered${this.capitalizeFirstLetter(category)}` as FilteredCategory;
    const itemsKey = category as keyof DailyMenuComponent;
    
    const items = this[itemsKey] as any[];
    
    if (!inputValue) {
      this[filteredKey] = [...items];
      return;
    }
    console.log('Filtered soups:', this.filteredSoups.length); // Трябва да показва <= 5
    const lowercaseInput = inputValue.toLowerCase();
    this[filteredKey] = items
      .filter(item => item.name.toLowerCase().includes(lowercaseInput))
      .slice(0, 5);
  }
  
  // Добавете помощна функция за типове
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  validateSelection(category: string, selectedValue: string): boolean {
    let exists = false;
    switch (category) {
      case 'soups':
        exists = this.soups.some(item => item.name === selectedValue);
        break;
      case 'desserts':
        exists = this.desserts.some(item => item.name === selectedValue);
        break;
      case 'drinks':
        exists = this.drinks.some(item => item.name === selectedValue);
        break;
      case 'salads':
        exists = this.salads.some(item => item.name === selectedValue);
        break;
    }
    return exists;
  }

  submitMenu(): void {
    // Проверяваме само попълнените полета
    if (this.selectedMenu["soup"] && !this.validateSelection('soups', this.selectedMenu["soup"])) {
      this.showMessage('❌ Soup does not exist!');
      return;
    }
    if (this.selectedMenu["dessert"] && !this.validateSelection('desserts', this.selectedMenu["dessert"])) {
      this.showMessage('❌ Dessert does not exist!');
      return;
    }
    if (this.selectedMenu["drink"] && !this.validateSelection('drinks', this.selectedMenu["drink"])) {
      this.showMessage('❌ Drink does not exist!');
      return;
    }
    if (this.selectedMenu["salad"] && !this.validateSelection('salads', this.selectedMenu["salad"])) {
      this.showMessage('❌ Salad does not exist!');
      return;
    }
  
    // Ако всички попълнени полета са валидни, пренасочваме към новата страница
    this.router.navigate(['/menu-details'], { queryParams: this.selectedMenu });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  // SCROLL
  dropdownVisible: { [key: string]: boolean } = { soups: false };

  showDropdown(category: string): void {
    this.dropdownVisible[category] = true;
  }
  
  hideDropdown(category: string): void {
    setTimeout(() => { 
      this.dropdownVisible[category] = false; 
    }, 200); // Малък delay за да можем да кликнем
  }
  
  selectItem(category: string, value: string): void {
    this.selectedMenu[category] = value;
    this.hideDropdown(category);
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value || '';
  }

  // navigateToSelectedMenu(): void {
  //   const queryParams = { ...this.selectedMenu };
  //   this.router.navigate(['/daily-menu'], { queryParams });
  // }
}