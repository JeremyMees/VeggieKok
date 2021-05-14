import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss'],
})
export class RecipeContainerComponent {
  @Input() recipe: Recipe;
  @Input() recipes: Array<Recipe>;
  @Output() selected = new EventEmitter<number>();
  constructor() {}

  selectedRecipe(id: number): void {
    this.selected.emit(id);
  }
}
