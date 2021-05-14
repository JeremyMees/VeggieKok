import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipes: Array<Recipe>;
  @Output() selected = new EventEmitter<number>();
  route: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.route = this.router.url;
  }

  selectedRecipe(id: number): void {
    this.selected.emit(id);
  }
}
