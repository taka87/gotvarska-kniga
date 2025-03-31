import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-favorite-recipes',
  standalone: true, // Standalone компонент
  imports: [CommonModule], // Добавяме CommonModule, за да работи *ngFor
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css']
})
export class FavoriteRecipesComponent implements AfterViewInit {
  @ViewChild('loader', { static: false }) loader: ElementRef | undefined;

  // Масив със снимки от assets
  soups = [
    'assets/gsap/soups/ChickenSoup1.jpg',
    'assets/gsap/soups/CucumberYogurtSoup1.jpg',
    'assets/gsap/soups/LentilSoup1.jpg',
    'assets/gsap/soups/TripeSoup1.jpg',
    'assets/gsap/soups/MeatBall1.jpg',
    'assets/gsap/soups/MushroomSoup1.jpg',
    'assets/gsap/soups/PotatoSoup1.jpg',
  ];

  dishes = [
    'assets/gsap/dishes/ChickenWithPotatoes2.jpg',
    'assets/gsap/dishes/ChickenWithRice2.jpg',
    'assets/gsap/dishes/FishWithSideDish2.jpg',
    'assets/gsap/dishes/Musakka2.jpg',
    'assets/gsap/dishes/SpaghettiBolognese2.jpg',
    'assets/gsap/dishes/StuffedBellPeppers2.jpg',
    'assets/gsap/dishes/VealStew2.jpg',
  ];

  salads = [
    'assets/gsap/salads/ArugulaSalad3.jpg',
    'assets/gsap/salads/AvocadoSalad3.jpg',
    'assets/gsap/salads/CaesarSalad3.jpg',
    'assets/gsap/salads/GreekSalad3.jpg',
    'assets/gsap/salads/QuinoaSalad3.jpg',
    'assets/gsap/salads/ShopskaSalad3.jpg',
    'assets/gsap/salads/TunaSalad3.jpg',
  ];

  desserts = [
    'assets/gsap/desserts/ChocolateMousse5.jpg',
    'assets/gsap/desserts/ChocolateSouffle5.jpg',
    'assets/gsap/desserts/Pancakes5.jpg',
    'assets/gsap/desserts/Cheesecake5.jpg',
    'assets/gsap/desserts/CremeBrulee5.jpg',
    'assets/gsap/desserts/FruitSalad5.jpg',
    'assets/gsap/desserts/Tiramisu5.jpg',
  ];


  constructor() {}

  ngAfterViewInit(): void {
    this.showDemo();
  }

  /** Основна анимация */
  showDemo(): void {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTo(0, 0);
    }
    gsap.to('.loader', { autoAlpha: 0 });

    // Анимиране на редовете със снимки и заглавията
    gsap.utils.toArray('.animated-row').forEach((row, index) => {
      const rowElement = row as HTMLElement;
      const wrapper = rowElement.querySelector('.wrapper') as HTMLElement;
      if (!wrapper) return;

      // Определяме посоката на движение
      const [x, xEnd] = index % 2 === 0 
        ? [wrapper.scrollWidth * -1, 0] // Ляво -> Дясно
        : ['100%', (wrapper.scrollWidth - rowElement.offsetWidth) * -1]; // Дясно -> Ляво

      gsap.fromTo(wrapper, { x }, {
        x: xEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: rowElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    });
  }
  
  // constructor() {}

  // ngAfterViewInit(): void {
  //   this.showDemo();
  // }

  // /** Основна анимация */
  // showDemo(): void {
  //   if (document.scrollingElement) {
  //     document.scrollingElement.scrollTo(0, 0);
  //   }
  //   gsap.to('.loader', { autoAlpha: 0 });

  //   // Взимаме всички секции (редове от снимки)
  //   gsap.utils.toArray('.image-row').forEach((row, index) => {
  //     const rowElement = row as HTMLElement;
  //     const wrapper = rowElement.querySelector('.wrapper') as HTMLElement;
  //     if (!wrapper) return;

  //     const [x, xEnd] = index % 2 === 0 
  //       ? [wrapper.scrollWidth * -1, 0] // Ляво -> Дясно
  //       : ['100%', (wrapper.scrollWidth - rowElement.offsetWidth) * -1]; // Дясно -> Ляво

  //     gsap.fromTo(wrapper, { x }, {
  //       x: xEnd,
  //       ease: 'none',
  //       scrollTrigger: {
  //         trigger: rowElement,
  //         start: 'top bottom',
  //         end: 'bottom top',
  //         scrub: 0.5
  //       }
  //     });
  //   });
  // }
}