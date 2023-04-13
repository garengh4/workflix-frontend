import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/assets/entites/Categories';
import { LoaderService } from '../../assets/loading/loading.service';
import { CategoriesService } from './categories.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Categories[];
  categoryId: string;
  successMsg: string;
  errMsg: string;

  private helper = new JwtHelperService();

constructor(private categoriesService: CategoriesService, private router: Router, public loader: LoaderService){}

  ngOnInit(): void {
    this.getCategoriesByProfile();
  }

  setCurrentCategoriesId(categoryId: string): void {
    console.log("Setting current category");
    localStorage.setItem("currentCategoriesId", categoryId);
  }

  setCurrentCategoriesName(categoryName: string): void {
    console.log("Setting Category name");
    localStorage.setItem("currentCategoryName", categoryName);
  }

  public getCategoriesByProfile() {
    this.categoriesService.getCategoriesByProfileId(localStorage.getItem("currentProfileId")).subscribe({
      next: data => {
        this.categories = data;
        console.log(this.categories)
      }
    }
    )
  }
}
