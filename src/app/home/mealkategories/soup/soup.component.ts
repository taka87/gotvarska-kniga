import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';
import { SoupService } from '../../../services/soup.service';

@Component({
  selector: 'app-soup',
    imports: [CommonModule, RouterModule,NavigationComponent],  
  templateUrl: './soup.component.html',
  styleUrl: './soup.component.css',
  standalone: true,
})
export class SoupComponent {
  title = 'Добре дошли в нашия кулинарен свят';

  soups: any[] = [];
  selectedSoup: any = null;

  constructor(private soupService: SoupService) {}

  ngOnInit(): void {
    this.soupService.getSoups().subscribe((data) => {
      this.soups = data;
    });
  }

  selectSoup(soup: any): void {
    this.selectedSoup = soup;
  }
}
