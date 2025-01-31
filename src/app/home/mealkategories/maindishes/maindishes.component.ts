import { Component } from '@angular/core';
import { Navigation } from '@angular/router';
import { NavigationComponent } from '../../../navigation/navigation.component';

@Component({
  selector: 'app-maindishes',
  imports: [NavigationComponent],
  templateUrl: './maindishes.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class MaindishesComponent {
  title = 'Добре дошли в нашия кулинарен свят';

}
