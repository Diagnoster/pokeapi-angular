import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentComponent } from './home-component.component';

describe('HomeComponentComponent', () => {
  let component: HomeComponentComponent;
  let fixture: ComponentFixture<HomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
