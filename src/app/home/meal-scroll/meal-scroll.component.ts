import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-meal-scroll',
  imports: [CommonModule],
  templateUrl: './meal-scroll.component.html',
  styleUrls: ['./meal-scroll.component.css']
})
export class MealScrollComponent  implements AfterViewInit {
  list = [
    { title: 'Chasing Gold', text: 'TACO BELL' },
    { title: 'Be More Human', text: 'REEBOK' },
    { title: 'Legacy Summit', text: 'NIKE' },
    { title: 'Creative We Stand', text: 'NBCUNIVERSAL' },
    { title: 'L’Eden, Art Base', text: 'PERRIER-JOUËT' },
    { title: 'Better TV Starts Now', text: 'PLAYSTATION' }
  ];

  @ViewChild('container', { static: true }) container!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initAnimations();
    }, 0);
  }

  initAnimations() {
    let items = document.querySelectorAll('.items');

    items.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.to(item, {
        '--widthline': '100%',
        duration: 1,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }
}