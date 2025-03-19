import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesDetailsComponent } from './abilities-details.component';

describe('AbilitiesDetailsComponent', () => {
  let component: AbilitiesDetailsComponent;
  let fixture: ComponentFixture<AbilitiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbilitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
