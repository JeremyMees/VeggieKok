import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Difficulty } from 'src/app/models/difficulty';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Output() newRecipe = new EventEmitter<Recipe>();
  difficultys: Array<Difficulty> = [
    { value: 'Makkelijk' },
    { value: 'Gemiddeld' },
    { value: 'Gevorderd' },
  ];
  selectedValue: string;

  constructor(private router: Router) {}

  openInput(): void {
    document.getElementById('fileInput').click();
  }

  onSubmit(recipe: Recipe): void {
    recipe.steps = recipe.steps.filter((element) => {
      return element !== '';
    });
    recipe.ingredients = recipe.ingredients.filter((element) => {
      return element.ingredient !== '';
    });
    recipe.time = Number(recipe.time);
    if (
      recipe.name === '' ||
      recipe.description === '' ||
      recipe.difficulty === '' ||
      recipe.image === '' ||
      recipe.steps === [] ||
      recipe.ingredients === []
    ) {
      alert('Vul alle velden in met een *');
    } else {
      recipe.created_at = new Date();
      this.newRecipe.emit(recipe);
      this.router
        .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/admin']);
        });
    }
  }
}
