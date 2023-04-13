import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../assets/loading/loading.service';
import { Blog } from 'src/assets/entites/Blog';
import { BlogPageService } from './blog-page.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  successMsg: string;
  errMsg: string;

  constructor(private fb: FormBuilder, private blogPageService: BlogPageService, private router: Router, public loader:LoaderService) { }
  
  ngOnInit(): void {
    this.blogPageForm();
  }

  BlogPageEntry: Blog = new Blog();
  blogForm: FormGroup;
  public blogPageForm() {
    this.blogForm = this.fb.group({
      title: [this.BlogPageEntry.title, [Validators.required], null],
      content: [this.BlogPageEntry.content, [Validators.required], null],
      categoryDTO: [{ categoryId: Number(localStorage.getItem("currentCategoriesId")) }],
    })
  }
  
  public onSaveBlog(){
    this.errMsg = '';
    this.successMsg = '';
    this.BlogPageEntry = this.blogForm.value as Blog;
    this.blogPageService.saveBlog(this.BlogPageEntry).subscribe({
      next: msg => {
        this.BlogPageEntry = msg;

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
