import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: Observable<any>;
  constructor(
    private firebaseService: FirebaseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseService.getNewestRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  selectedRecipe(recipe: Recipe): void {
    this.router.navigateByUrl(`recipes/${recipe.id}`);
  }
}
