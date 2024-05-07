import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  links = ['Hem', 'Kurser', 'Ramschema'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }


  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
