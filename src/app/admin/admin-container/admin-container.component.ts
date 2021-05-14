import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnInit {
  recipes: Array<any>;
  add: boolean = true;
  delete: boolean = false;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  addNewRecipe(recipe: Recipe): void {
    this.firebaseService.addRecipe(recipe);
  }

  deleteOldRecipe(name: string): void {
    this.firebaseService.deleteRecipe(name);
  }

  seeAdd(): void {
    this.add = true;
    this.delete = false;
  }

  seeDelete(): void {
    this.add = false;
    this.delete = true;
  }
}
