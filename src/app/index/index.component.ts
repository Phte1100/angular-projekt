import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// Deklarera den globala bootstrap-variabeln för karusellfunktionalitet
declare var bootstrap: any;

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit, OnDestroy {

  // Definiera en sträng för standardlogotypen
  Miun_logotyp_CMYK: string = 'assets/images/Miun_logotyp_CMYK.svg';

  // Array med logotyper som ska visas i karusellen
  logos: string[] = [
    'assets/images/Miun_logotyp_CMYK.svg',
    'assets/images/mau_sv_logotyp.svg',
    'assets/images/Logotyp_Lunds_universitet_(vit).png',
    'assets/images/umu-logo-SE.svg',
    'assets/images/KTH-logo.png',
    'assets/images/sthlm_universitet.png',
    'assets/images/1920px-Linkoping_University_Logo.png'
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
// Metod för att initiera Bootstrap-karusellen
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
