import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  componentName: string = '';
  selectedSpan: string | null = null;
  hideHeader: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const routeComponent = this.getRouteComponent(event.url);
          this.componentName = routeComponent ? routeComponent.charAt(0).toUpperCase() + routeComponent.slice(1) : '';
          if(event.url == '/home') {
            event.url = '/';
          }
          this.hideHeader = (event.url == '/');
        }
      });
  }

  selectSpan(spanId: string) {
    if (this.selectedSpan !== spanId) {
      this.selectedSpan = spanId;
    }
  }

  private getRouteComponent(url: string): string | null {
    // default route
    if (url === '/') {
      url = '/home';
    }
    const route = url.split('/').pop();
    return route ? route : null;
  }
}
