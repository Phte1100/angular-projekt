import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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
    console.log('Bootstrap:', (window as any).bootstrap); // Kontrollera om bootstrap är definierad
    this.loadBootstrap().then(() => {
      this.initializeCarousel();
    });
  }

  ngOnDestroy() {
    if (this.carousel) {
      this.carousel.dispose();
    }
  }

  async loadBootstrap() {
    await this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js');
  }

  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  initializeCarousel() {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    console.log('Carousel Element:', carouselElement); // Kontrollera om karusellelementet hittas
    if (carouselElement) {
      console.log('Initializing Carousel');
      this.carousel = new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 2000,
        ride: 'carousel'
      });
      console.log('Carousel Initialized');
    }
  }
}
