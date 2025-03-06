import { Component, Input } from '@angular/core';
import { RegisterFormComponentMySqlComponent } from '../register-form-component-my-sql/register-form-component-my-sql.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register-mysql',
  imports: [RegisterFormComponentMySqlComponent,RouterLink],
  templateUrl: './user-register-mysql.component.html',
  styleUrl: './user-register-mysql.component.css'
})
export class UserRegisterMysqlComponent {
  title = 'Регистрирайте се за магията на нашия кулинарен свят';
  @Input() isAdmin: boolean = false;
}