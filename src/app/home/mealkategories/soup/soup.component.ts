import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { SoupService } from '../../../services/soup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-soup',
    imports: [CommonModule, RouterModule,NavigationComponent,FormsModule],  
  templateUrl: './soup.component.html',
  styleUrl: './soup.component.css',
  standalone: true,
})
export class SoupComponent {
  title = 'Раздел готови рецепти за:';

  soups: any[] = [];
  selectedSoup: any = null;
  searchQuery: string = '';
  filteredSoups: any[] = [];
  autocompleteSuggestions: any[] = [];
  
  constructor(private soupService: SoupService) {}
  
  ngOnInit(): void {
    this.soupService.getSoups().subscribe((data) => {
      this.soups = data;
      this.filteredSoups = [...this.soups]; // Първоначално показваме всички супи
    });
  }
  
  selectSoup(soup: any): void {
    this.selectedSoup = soup;
  }

  filterSoups(): void {
    this.filteredSoups = this.soups.filter(soup => 
      soup.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Генериране на подсказки
  this.autocompleteSuggestions = this.filteredSoups.slice(0, 5); // Ограничаваме до 5 предложения
  }

  selectSuggestedSoup(soup: any): void {
    this.searchQuery = soup.name;
    this.filteredSoups = [soup]; // Показваме само избраната супа
    this.autocompleteSuggestions = [];
  }
}
