import { Component } from '@angular/core';
import { NavigationComponent } from '../../../navigation/navigation.component';


@Component({
  selector: 'app-salads',
  imports: [NavigationComponent],
  templateUrl: './salads.component.html',
  styleUrl: '../soup/soup.component.css',

})
export class SaladsComponent {
  title = 'Добре дошли в нашия кулинарен свят';

}
