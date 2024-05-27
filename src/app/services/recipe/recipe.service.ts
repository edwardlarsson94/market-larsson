import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeResults } from '../../models/interface/recipe/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipeList(): Observable<RecipeResults> {
    return this.http.get<RecipeResults>(`https://www.themealdb.com/api/json/v1/1/random.php`);
  }
}
