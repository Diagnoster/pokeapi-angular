import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    UpperFirstLetterPipe
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  componentName: string = '';
  selectedSpan: string | null = null;
  hideHeader: boolean = false;
  isDarkMode = false;
  opened = false;

  // Mapping IDs to region names
  private regionMap: { [key: number]: string } = {
    1: 'Kanto',
    2: 'Johto',
    3: 'Hoenn',
    4: 'Sinnoh',
    5: 'Unova',
    6: 'Kalos',
    7: 'Alola',
    8: 'Galar',
    9: 'Hisui',
    10: 'Paldea'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const regionId = this.getRegionIdFromUrl(event.url);
          const regionName = this.regionMap[regionId] || this.getRouteComponent(event.url) || 'Unknown Region';
          this.componentName = regionName;
          
          if (event.url === '/home') {
            event.url = '/';
          }
          this.hideHeader = (event.url === '/');
        }
      });
  }

  selectSpan(spanId: string) {
    if (this.selectedSpan !== spanId) {
      this.selectedSpan = spanId;
    }
  }

  private getRegionIdFromUrl(url: string): number {
    const parts = url.split('/');
    const id = parseInt(parts[parts.length - 1], 10); // get the last segment of the URL
    return !isNaN(id) ? id : -1;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private getRouteComponent(url: string): string | null {
    // check url contains "?"
    const urlParts = url.split('?');

    // get last party of the parameters
    const cleanUrl = urlParts[0].split('/').pop();
  
    // if urlParts -> get name of url
    if (urlParts.length > 1) {
      const params = new URLSearchParams(urlParts[1]);
      const locationName = params.get('name');
      
      if (locationName) {
        return decodeURIComponent(locationName);
      }
    }
    // if there is no 'name', returns the last segment of the URL
    return cleanUrl ? decodeURIComponent(cleanUrl.replace(/-/g, ' ')) : null;
  }

  goToHome(): void {
    this.router.navigate([`/home`]);
  }
}
