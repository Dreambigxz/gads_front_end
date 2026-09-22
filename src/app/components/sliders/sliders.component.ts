import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

interface NewsSlide {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  time: string;
  category: string;
}
@Component({
  selector: 'app-sliders',
  imports: [
    CommonModule
  ],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.scss'
})
export class SlidersComponent {

  activeSlide = 0;

  private sliderInterval?: ReturnType<typeof setInterval>;
  private touchStartX = 0;

  slides: NewsSlide[] = [
    {
      id: 1,
      badge: 'BREAKING',
      title: 'World leaders unite for a cleaner, greener future',
      description:
        'Global summit sets bold new climate targets to accelerate change by 2030.',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
      time: '2h ago',
      category: 'World'
    },
    {
      id: 2,
      badge: 'SPORTS',
      title: 'Underdogs stun champions in dramatic final',
      description:
        'A late winning goal completed one of the biggest surprises of the season.',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85',
      time: '3h ago',
      category: 'Sports'
    },
    {
      id: 3,
      badge: 'TECHNOLOGY',
      title: 'New technology is changing how people work',
      description:
        'Smarter digital tools are helping businesses improve productivity.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
      time: '5h ago',
      category: 'Technology'
    },
    {
      id: 4,
      badge: 'BUSINESS',
      title: 'Global markets show renewed optimism this week',
      description:
        'Investors respond positively as international markets continue to recover.',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      time: '7h ago',
      category: 'Business'
    }
  ];

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.pauseSlider();
  }

  startSlider(): void {
    this.pauseSlider();

    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = undefined;
    }
  }

  nextSlide(): void {
    this.activeSlide =
      (this.activeSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.activeSlide =
      (this.activeSlide - 1 + this.slides.length) %
      this.slides.length;
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
    this.startSlider();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
    this.pauseSlider();
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const distance = this.touchStartX - touchEndX;

    if (Math.abs(distance) > 50) {
      distance > 0
        ? this.nextSlide()
        : this.previousSlide();
    }

    this.startSlider();
  }
  

}
