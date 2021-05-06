import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeQuantityComponent } from './recipe-quantity.component';

describe('RecipeQuantityComponent', () => {
  let component: RecipeQuantityComponent;
  let fixture: ComponentFixture<RecipeQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
