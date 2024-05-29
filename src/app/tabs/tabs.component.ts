import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

// Deklarerar komponenten med selector och paths till HTML/CSS samt vilka moduler som ska importeras
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'] 
})
export class TabsComponent {
  // En array med länkarna som ska användas för tabbarna
  links = ['Hem', 'Kurser', 'Ramschema'];
  // Aktiv länk som sätts vid initialiseringen av komponenten
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
