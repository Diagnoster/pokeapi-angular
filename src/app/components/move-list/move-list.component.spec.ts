import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveListComponent } from './move-list.component';

describe('MoveListComponent', () => {
  let component: MoveListComponent;
  let fixture: ComponentFixture<MoveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
