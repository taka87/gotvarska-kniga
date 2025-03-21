import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.css'
})
export class AppInfoComponent {
title = "Key Challenges in Application Development & Developer Insights"

  // Дефинирайте тип за секциите
  sections: ('intro' | 'techStack' | 'challenges')[];

  content = {
    intro: {
      en: "The development of this application presented several key challenges...",
      bg: "Създаването на това приложение донесе редица предизвикателства..."
    },
    techStack: {
      en: "The application is built using Angular 16...",
      bg: "Приложението е изградено с Angular 16..."
    },
    challenges: {
      en: "One of the main challenges was implementing real-time updates...",
      bg: "Един от основните предизвикателства бе внедряването на реално време..."
    }
  };

  constructor() {
    // Инициализирайте масива с ключове
    this.sections = Object.keys(this.content) as ('intro' | 'techStack' | 'challenges')[];
  }
}
