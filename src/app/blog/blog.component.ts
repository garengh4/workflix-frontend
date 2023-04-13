import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/assets/entites/Blog';
import { LoaderService } from '../../assets/loading/loading.service';
import { BlogService } from './blog.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog[];
  postId: string;
  successMsg: string;
  errMsg: string;

  private helper = new JwtHelperService();

constructor(private blogService: BlogService, private router: Router, public loader: LoaderService){}

  ngOnInit(): void {
    this.getBlogByCategory();
  }
  
  public deleteBlog(blog: Blog) {
    if (confirm("Are you sure you want to delete the blog" + blog.title + "?")) {
      this.blogService.deleteBlog(blog.postId).subscribe({
        next: msg => {
          this.successMsg = msg;
          window.alert(this.successMsg);
          this.getBlogByCategory();

        }, error: msg => {
          this.errMsg = msg;
        }
      })
    }
  }

  setCurrentBlogId(postId: string): void {
    localStorage.setItem("currentPostId", postId);
  }

  public getBlogByCategory() {
    this.blogService.getBlogByCategoryId(localStorage.getItem("currentCategoriesId")).subscribe({
      next: data => {
        this.blog = data;
        console.log(this.blog)
      }
    }
    )
  }
}
