import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Categories } from 'src/assets/entites/Categories'; 
import { LoaderService } from '../../assets/loading/loading.service';
import { AddCategoriesService } from './add-categories.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  successMsg: string;
  errMsg: string;

  private helper = new JwtHelperService();
  

  constructor(private fb: FormBuilder, private addCategoriesService: AddCategoriesService, private router: Router, public loader:LoaderService) { }
  
  ngOnInit(): void {
    this.addCategoriesForm();
  }

  CategoriesEntry: Categories = new Categories();
  categoriesForm: FormGroup;
  public addCategoriesForm() {
    this.categoriesForm = this.fb.group({
      categoryName: [this.CategoriesEntry.categoryName, [Validators.required], null],
      profileId: [localStorage.getItem("currentProfileId")],

    })
  }
  public onAddCategories(){
    //console.log(this.categoriesForm);
    this.errMsg = '';
    this.successMsg = '';
    this.CategoriesEntry = this.categoriesForm.value as Categories;
    this.addCategoriesService.addCategories(this.CategoriesEntry).subscribe({
      next: msg => {
        this.CategoriesEntry = msg;
      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
