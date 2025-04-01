import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-favourite-menu',
  imports: [CommonModule],
  templateUrl: './favourite-menu.component.html',
  styleUrl: './favourite-menu.component.css'
})
export class FavouriteMenuComponent  implements OnInit {
  recipes = [
    {
      id: 1,
      title: 'Classic Spaghetti Carbonara',
      image: 'assets/home-favourite/spaghetti-carbonara.jpg',
      description: 'Authentic Italian pasta dish with eggs, cheese, pancetta, and black pepper. The creamy sauce is made by emulsifying eggs with hot pasta water and grated cheese.'
    },
    {
      id: 2,
      title: 'Vegetable Stir Fry',
      image: 'assets/home-favourite/vegetable-stir-fry.jpg',
      description: 'Quick and healthy Asian-inspired dish with fresh vegetables, tofu or chicken, and a savory sauce. Perfect for weeknight dinners and packed with nutrients.'
    },
    {
      id: 3,
      title: 'Chocolate Lava Cake',
      image: 'assets/home-favourite/chocolate-lava-cake.jpg',
      description: 'Decadent dessert with a molten chocolate center. Served warm with vanilla ice cream or fresh berries for the perfect balance of temperatures and flavors.'
    }
  ];

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.initAnimations();
  }

  initAnimations() {
    // Animation for cards when they come into view
    gsap.utils.toArray(".card").forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }

}
