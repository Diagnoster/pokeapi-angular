import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureListComponent } from './nature-list.component';

describe('NatureListComponent', () => {
  let component: NatureListComponent;
  let fixture: ComponentFixture<NatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NatureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
