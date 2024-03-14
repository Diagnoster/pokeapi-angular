import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityListComponent } from './ability-list.component';

describe('AbilityListComponent', () => {
  let component: AbilityListComponent;
  let fixture: ComponentFixture<AbilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
