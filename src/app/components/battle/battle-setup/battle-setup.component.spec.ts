import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSetupComponent } from './battle-setup.component';

describe('BattleSetupComponent', () => {
  let component: BattleSetupComponent;
  let fixture: ComponentFixture<BattleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
