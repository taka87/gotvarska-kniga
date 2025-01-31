import { Component } from '@angular/core';
import { NavigationComponent } from '../../../navigation/navigation.component';

@Component({
  selector: 'app-desserts',
  imports: [NavigationComponent],
  templateUrl: './desserts.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class DessertsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

}
