import { Component, Input } from '@angular/core';
import { RegisterFormComponentOnlineDB } from '../register-form-component-online-DB/register-form-component-online-db.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register-online-db',
  imports: [RegisterFormComponentOnlineDB,RouterLink],
  templateUrl: './user-register-online-db.component.html',
  styleUrl: './user-register-online-db.component.css'
})
export class UserRegisterOnlineDB {
  title = 'Регистрирайте се за магията на нашия кулинарен свят';
  @Input() isAdmin: boolean = false;
}