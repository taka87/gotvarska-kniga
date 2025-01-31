import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';

@Component({
  selector: 'app-soup',
    imports: [CommonModule, RouterModule,NavigationComponent],  
  templateUrl: './soup.component.html',
  styleUrl: './soup.component.css',
  standalone: true,
})
export class SoupComponent {
  title = 'Добре дошли в нашия кулинарен свят';

}
