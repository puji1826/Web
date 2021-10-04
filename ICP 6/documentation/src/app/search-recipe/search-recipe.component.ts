import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  recipeValue: any;
  recipeList = [];
  edamam_id = "a3afde74";
  edamam_key = "b55955428786112be91789b469d0ec54";
  constructor(private _http: HttpClient) {
  }
  ngOnInit() {

  }
  getRecipe(recipe, currentEvent) {

    this.recipeValue = recipe;

    if (this.recipeValue !== null) {
      /**
       * Write code to get recipe
       */

      this._http.get('https://api.edamam.com/search?q=' +
        this.recipeValue +
        '&app_id=' + this.edamam_id + '&app_key=' + this.edamam_key + '&from=0&to=5')
        .subscribe((data: any) => {
          for (let i = 0; i < data.hits.length; i++) {
            this.recipeList[i] = {
              name: data.hits[i].recipe.label,
              icon: data.hits[i].recipe.image,
              url: data.hits[i].recipe.url,
            };
          }
        });
    }
    currentEvent.preventDefault();

  }
}
