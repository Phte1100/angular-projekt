import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

declare var bootstrap: any;

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit, OnDestroy {

  Miun_logotyp_CMYK: string = 'assets/images/Miun_logotyp_CMYK.svg';
  logos: string[] = [
    'assets/images/Miun_logotyp_CMYK.svg',
    'assets/images/mau_sv_logotyp.svg'
  ];
  carousel: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initializeCarousel();
  }

  ngOnDestroy() {
    if (this.carousel) {
      this.carousel.dispose();
    }
  }

  initializeCarousel() {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    if (carouselElement) {
      this.carousel = new bootstrap.Carousel(carouselElement, {
        interval: 2000,
        ride: 'carousel'
      });
    }
  }
}
