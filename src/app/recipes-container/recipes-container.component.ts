import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-container',
  templateUrl: './recipes-container.component.html',
  styleUrls: ['./recipes-container.component.scss'],
})
export class RecipesContainerComponent implements OnInit {
  recipes: Array<Recipe>;
  newestRecipes: Array<Recipe>;
  recipe: Recipe;
  destroy$ = new Subject();
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (+params.id >= 0) {
        this.firebaseService
          .getRecipeById(+params.id)
          .subscribe((recipe: Array<Recipe>) => {
            this.recipe = recipe[0];
          });
      }
    });
    this.firebaseService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.firebaseService.getNewestRecipes().subscribe((newest) => {
      this.newestRecipes = newest;
    });
  }

  showDetailsRecipe(id: number): void {
    this.router.navigateByUrl(`/recipes/${id}`);
  }
}
