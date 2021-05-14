import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-quantity',
  templateUrl: './recipe-quantity.component.html',
  styleUrls: ['./recipe-quantity.component.scss'],
})
export class RecipeQuantityComponent {
  @Input() recipe: Recipe;
  persons: number = 2;
  constructor() {}

  morePersons(): void {
    this.persons++;
  }

  lesPersons(): void {
    this.persons == 2
      ? alert('Kan niet minder dan 2 personen')
      : this.persons--;
  }
}
