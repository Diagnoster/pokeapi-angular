import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: 
  [ 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  componentName: string = '';
  selectedSpan: string | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const routeComponent = this.getRouteComponent(event.url);
          this.componentName = routeComponent ? routeComponent.charAt(0).toUpperCase() + routeComponent.slice(1) : '';
        }
      });
  }

  selectSpan(spanId: string) {
    if (this.selectedSpan !== spanId) {
      this.selectedSpan = spanId;
    }
  }

  private getRouteComponent(url: string): string | null {
    const route = url.split('/').pop();
    return route ? route : null;
  }
}
