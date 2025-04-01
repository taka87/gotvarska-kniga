import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Pane } from 'tweakpane';

// Регистрирай ScrollTrigger плагина
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-meal-design',
  imports: [],
  templateUrl: './meal-design.component.html',
  styleUrl: './meal-design.component.css'
})
export class MealDesignComponent  implements AfterViewInit {
  @ViewChild('mainContainer', { static: true }) mainContainer!: ElementRef;

  config = {
    theme: 'dark',
    animate: true,
    snap: true,
    start: gsap.utils.random(0, 100, 1),
    end: gsap.utils.random(900, 1000, 1),
    scroll: true,
    debug: false,
  };

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLDivElement>('ul li'); // Ясно казваме, че ще са HTML елементи

    gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

    // Анимация за прозрачност на елементите
    const dimmer = gsap.timeline()
      .to(items.slice(1), { opacity: 1, stagger: 0.5 })
      .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: 'center center',
      end: 'center center',
      animation: dimmer,
      scrub: 0.2,
    });

    // Анимация за цветовете при скролиране
    const scroller = gsap.timeline().fromTo(
      document.documentElement,
      { '--hue': this.config.start },
      { '--hue': this.config.end, ease: 'none' }
    );

    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: 'center center',
      end: 'center center',
      animation: scroller,
      scrub: 0.2,
    });

    // Добавяне на контролен панел с Tweakpane
    const ctrl = new Pane({ title: 'Config', expanded: false });

    ctrl.addBinding(this.config, 'animate', { label: 'Animate' }).on('change', () => this.updateSettings());
    ctrl.addBinding(this.config, 'snap', { label: 'Snap' }).on('change', () => this.updateSettings());
    ctrl.addBinding(this.config, 'start', { label: 'Hue Start', min: 0, max: 1000, step: 1 }).on('change', () => this.updateSettings());
    ctrl.addBinding(this.config, 'end', { label: 'Hue End', min: 0, max: 1000, step: 1 }).on('change', () => this.updateSettings());
    ctrl.addBinding(this.config, 'scroll', { label: 'Scrollbar' }).on('change', () => this.updateSettings());
    ctrl.addBinding(this.config, 'debug', { label: 'Debug' }).on('change', () => this.updateSettings());
  }

  updateSettings(): void {
    document.documentElement.dataset['theme'] = this.config.theme;
    document.documentElement.dataset['syncScrollbar'] = this.config.scroll.toString();
    document.documentElement.dataset['animate'] = this.config.animate.toString();
    document.documentElement.dataset['snap'] = this.config.snap.toString();
    document.documentElement.dataset['debug'] = this.config.debug.toString();
    document.documentElement.style.setProperty('--start', this.config.start.toString());
    document.documentElement.style.setProperty('--hue', this.config.start.toString());
    document.documentElement.style.setProperty('--end', this.config.end.toString());
  }
}