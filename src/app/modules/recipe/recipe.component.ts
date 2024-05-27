import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Recipe, RecipeResults, defaultRecipe } from '../../models/interface/recipe/recipe';
import { JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    NzCardModule,
    NgIf,
    NgFor,
    JsonPipe
  ],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = defaultRecipe;


  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipe();
  }

  fetchRecipe(): void {
    this.recipeService.getRecipeList().subscribe({
      next: (response) => {
        if (response) {
          for (let index = 0; index < response.meals.length; index++) {
            const element = response.meals[index];
            this.recipe = element;
          }        
        }
      },
      error: (error) => {
        console.error('Error fetching recipe:', error);
      }
    });
  }
  
}
