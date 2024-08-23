import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // waiting for browser rendering
    if (isPlatformBrowser(this.platformId)) {
      const containers = document.querySelectorAll('.pokedex-container, .move-container, .items-container');

      containers.forEach(container => {
        const element = container as HTMLElement;

        element.addEventListener('mouseover', () => {
          containers.forEach(c => {
            const otherElement = c as HTMLElement;
            if (otherElement !== element) {
              otherElement.style.opacity = '0.5';
            }
          });
        });

        element.addEventListener('mouseout', () => {
          containers.forEach(c => {
            const otherElement = c as HTMLElement;
            otherElement.style.opacity = '1';
          });
        });
      });
    }
  }
}