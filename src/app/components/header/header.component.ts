import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: 
  [ 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('toolbar') toolbar: ElementRef | undefined;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isTop = scrollPosition < 100;

    const headerMoveElement = document.querySelector('.header-move') as HTMLElement;

    if (isTop) {
      console.log('Está no topo da página');
      headerMoveElement.style.display = 'block';
    } else {
      console.log('Não está no topo da página');
      headerMoveElement.style.display = 'none';
    }
  }
}
