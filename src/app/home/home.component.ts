import { Component,OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserControlComponent } from "../user-control/user-control.component";
import { DailyMenuComponent } from './daily-menu/daily-menu.component';
import { LoggedButtonComponent } from '../logged-button/logged-button.component';
import { UserSessionService } from '../services/user-session.service';
import { UserMysqlComponent } from '../mysql/user-mysql/user-mysql.component';
import { UserControlMysqlComponent } from '../mysql/user-control-mysql/user-control-mysql.component';
import { LoggedButtonMysqlComponent } from '../mysql/logged-button-mysql/logged-button-mysql.component';
import { AuthService } from '../mysql-services/auth-service.service';
// import { MapComponent } from "../google-map/map/map.component";
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { UserRegisterOnlineDB } from '../online-DB/user-register-online-DB/user-register-online-db.component';
// import { LoggedButtonOnlineDBComponent } from '../online-DB/logged-button-online-DB/logged-button-online-db.component';
import { LoggedButtonOnlinedbComponent } from '../online-DB/logged-button-onlinedb/logged-button-onlinedb.component';
import { UserControlOnlineDBComponent } from '../online-DB/user-control-online-DB/user-control-online-db.component';
import { AuthServiceOnlineDB } from '../online-DB/online-DB-services/auth-service-online-db.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule, 
    RouterModule,
    DailyMenuComponent, 
    UserControlComponent, 
    LoggedButtonComponent,
    UserControlMysqlComponent, 
    LoggedButtonMysqlComponent,
    UserControlOnlineDBComponent,
    LoggedButtonOnlinedbComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Добави този ред

  //imports: [UserControlComponent, LoggedButtonComponent, LoggedButtonMysqlqlComponent,  UserMysqlComponent, MapComponent]
})
export class HomeComponent {
  title = "Immerse yourself in the magic of our culinary world";
  showRegisterFormMysql = false;
  showRegisterFormOnlineDB = false;
  swiper: Swiper | null = null;

  //LocalDB
  isLogged = false;  
  userName = 'user'; 

  //MYSQl
  isLoggedMySQL = false;  
  userNameMySQL: string | null = null;  
  isMenuOpen = false; // Контролира видимостта на менюто

  
  //OnlineDB
  isLoggedOnlineDB = false;  
  userNameOnlineDB: string | null = null;  
  isMenuOpenOnlineDB = false; // Контролира видимостта на менюто

  showFavorites = false;
  showCategories = true;

  //swiper
  swiperKey = 0;
  images = [
    'assets/images/swiper/image1.jpg',
    'assets/images/swiper/maindish.jpg',
    'assets/images/swiper/salad.jpg'
  ];
  
  constructor(
    private userSession: UserSessionService, 
    private authService: AuthService,
    private authServiceOnlineDB: AuthServiceOnlineDB
  ) {}

  ngOnChanges() {
    this.swiperKey++;
  }
  
  // new
  getCategoryRoute(categoryName: string): string {
    switch (categoryName) {
      case 'Soups': return '/soups';
      case 'Main Dishes': return '/main-dishes';
      case 'Salads': return '/salads';
      case 'Desserts': return '/desserts';

      default: return '/';
    }
  }

  categories = [
    { id: 1, name: 'Soups', image: 'assets/Soups/pustra_zelenchukova_supa.jpg' },  //ако смениш "супи"-> се чупи пътя ??
    { id: 2, name: 'Main Dishes', image: 'assets/Maindishes/maindish.jpg' },
    { id: 4, name: 'Salads', image: 'assets/Salads/salad.jpg' },
    { id: 3, name: 'Desserts', image: 'assets/Desserts/dessert.jpg' },

  ];

  // toggleCategories() {
  //   this.showCategories = !this.showCategories;
  // }

  favoriteRecipes = [
    { name: 'Торта Гараш', description: 'Класическа шоколадова торта с богат вкус.' },
    { name: 'Мусака', description: 'Традиционно българско ястие с картофи и кайма.' },
    { name: 'Шкембе чорба', description: 'Супа с шкембе, подходяща за махмурлук.' },
  ];

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  toggleMySqlRegistrationForm() {
    this.showRegisterFormMysql = !this.showRegisterFormMysql;
  }

  //ONLINE DB
  toggleOnlineDBRegistrationForm() {
    this.showRegisterFormOnlineDB = !this.showRegisterFormOnlineDB;
  }

  // секция за логин/регистрация MYSQL
  ngOnInit(): void {
    this.checkLoginStatus();
    this.checkLoginStatusOnlineDB();

    // Следим в реално време, ако AuthService засече промяна
    this.authService.userLoggedIn$.subscribe(() => {
      this.checkLoginStatus();
    });

    // Следим в реално време, ако AuthService засече промяна ONLINEDB
    this.authServiceOnlineDB.userLoggedIn$.subscribe(() => {
      this.checkLoginStatusOnlineDB();
    });

    //JSON Server
    this.isLogged = this.userSession.isLoggedIn(); // Проверяваме дали потребителят е логнат

    if (this.isLogged) {
      const userData = JSON.parse(localStorage.getItem('loggedUserJSON') || '{}');
      this.userName = userData.firstName || 'Гост';
    }

    if (this.isLogged) {
      this.isMenuOpen = false;
    }

    this.userSession.currentUser$.subscribe(userData => {
      this.isLogged = userData !== null;
      if (this.isLogged) {
        const user = JSON.parse(userData || '{}');
        this.userName = user.firstName || 'Гост';
      }
    });
  

    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      navigation: true,
      pagination: { clickable: true },
      autoplay: { delay: 3000 },
    });
  }

  //MYSQL
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('loggedUserMYSQL');

    if (token && userData) {
      this.isLoggedMySQL = true;
      try {
        const parsedUser = JSON.parse(userData);
        this.userNameMySQL = parsedUser.firstName || "Потребител";
      } catch (error) {
        console.error("⚠️ Грешка при парсване на потребителските данни!", error);
      }
    } else {
      this.isLoggedMySQL = false;
      this.userNameMySQL = null;
    }
  }

  //ONLINEDB
  checkLoginStatusOnlineDB(): void {
    const userData = localStorage.getItem("loggedUser"); // 🔄 Използваме правилния ключ
  
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        this.isLoggedOnlineDB = true;
        this.userNameOnlineDB = parsedUser.email; // 👈 Или `parsedUser.firstName`
        // console.log("✅ Потребителят е логнат:", parsedUser);
      } catch (error) {
        console.error("⚠️ Грешка при парсване на потребителските данни!", error);
      }
    } else {
      this.isLoggedOnlineDB = false;
      this.userNameOnlineDB = null;
      // console.log("❌ Няма логнат потребител (OnlineDB)");
    }
  }

  logOut(): void {
    localStorage.removeItem('token');  
    localStorage.removeItem('loggedUserMYSQL'); 
    this.isLoggedMySQL = false;
    this.userNameMySQL = null;
    if (typeof window !== 'undefined') {
      // Кодът тук ще се изпълнява само в браузъра
    window.location.reload();
      console.log(window.location.href);
    }
  }

  logOutOnlineDB(): void {
    localStorage.removeItem('token');  
    localStorage.removeItem('loggedUser'); 
    this.isLoggedOnlineDB = false;
    this.userNameOnlineDB = null;
    if (typeof window !== 'undefined') {
      // Кодът тук ще се изпълнява само в браузъра
    window.location.reload();
      console.log(window.location.href);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }  
  toggleMenuOnlineDB() {
    this.isMenuOpenOnlineDB = !this.isMenuOpenOnlineDB;
  }

    // SWIPER - slide
  ngAfterViewInit() {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true, // За безкрайно въртене
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 3000, // Върти снимките автоматично на всеки 3 сек
        disableOnInteraction: false
      }
    });
  }  
}