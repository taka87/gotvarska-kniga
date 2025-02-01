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
  title = 'Добре дошли в нашия кулинарен свят';

  soups: any[] = [];
  selectedSoup: any = null;
  filteredSoups: any[] = [];
  
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
  
  searchQuery: string = '';

  filterSoups(): void {
    this.filteredSoups = this.soups.filter(soup => 
      soup.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
