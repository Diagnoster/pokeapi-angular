import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeListComponent } from './poke-list.component';

describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
