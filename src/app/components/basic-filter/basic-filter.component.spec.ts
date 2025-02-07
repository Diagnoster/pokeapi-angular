import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFilterComponent } from './basic-filter.component';

describe('BasicFilterComponent', () => {
  let component: BasicFilterComponent;
  let fixture: ComponentFixture<BasicFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
