import { Component, OnInit  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-local-recipes',
  imports: [RouterLink,CommonModule],
  templateUrl: './show-local-recipes.component.html',
  styleUrl: './show-local-recipes.component.css'
})
export class ShowLocalRecipesComponent implements OnInit {
  title = "Рецпти в локалния сървър:"
  recipes: any[] = []; // Масив за рецепти

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRecipes(); // Извикване на метода при зареждане
  }

  loadRecipes() {
    this.http.get<any[]>('http://localhost:3000/userRecipes').subscribe(data => {
      this.recipes = data; // Записваме в променливата
    }, error => {
      console.error('Грешка при зареждане на рецептите', error);
    });
  }

}
