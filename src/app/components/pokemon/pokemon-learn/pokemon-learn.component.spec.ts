import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonLearnComponent } from './pokemon-learn.component';

describe('PokemonLearnComponent', () => {
  let component: PokemonLearnComponent;
  let fixture: ComponentFixture<PokemonLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonLearnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
