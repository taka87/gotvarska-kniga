import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() activePage: string | null = null;

  navItems = [
    { path: '/soups', label: 'Soups' },
    { path: '/main-dishes', label: 'Main Dishes' },
    { path: '/salads', label: 'Salads' },
    { path: '/desserts', label: 'Desserts' }
  ];
}
