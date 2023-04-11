import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileModel } from 'src/assets/entites/FileModel';
import { Upload } from 'src/assets/entites/Upload';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { }


  errorMessage: string = "";
  successMessage: string = "";

  files: FileModel[];
  uploadFormVisible: boolean = false;

  currentUserProfileId: string;
  currentProfileName: string = "";

  fileName: string;
  fileCategory: string;
  file: File;
  formData = new FormData();

  uploadEntry: Upload = new Upload();
  uploadForm: FormGroup;

  videoFormatList: string[] = ["mp4", "mov", "wmv", "avi", "webm", "html5"]; 
  imageFormatList: string[] = ["jpg", "png", "jpeg", "svg"];
  documentFormatList: string[] = ["docx", "doc", "xls", "xlsx", "ppt", "pptx"];
  textFormatList: string[] = ["txt", "json"];
  allFileFormatList: string[] = [...this.documentFormatList, ...this.textFormatList, "pdf"]; 

  updateFilesView() {
    this.successMessage = "";
    this.getFilesByUserProfileId();
  }

  viewFile(file:FileModel) {
    localStorage.setItem("fileUrlToView", file.fileUrl);
    localStorage.setItem("isImageFile", JSON.stringify(this.isImageFile(file)));
    this.fileCategory = this.getFileType(file.categoryName);

    if (this.textFormatList.includes(this.fileCategory)) {
      localStorage.setItem("fileCategory", "text/plain");
    }
    else if (this.fileCategory == "pdf") {
      localStorage.setItem("fileCategory", "application/pdf");
    }
    else {
      localStorage.setItem("fileCategory", "application/msword");
    }

    this.router.navigate(['/viewFiles']);
  }

  isImageFile(file:FileModel): boolean {
    return this.imageFormatList.includes(file.categoryName);
  }

  getFilesByUserProfileId() {

    this.homeService.getFilesByUserProfileId(this.currentUserProfileId).subscribe({
      next: files => {
        this.files = files;
      },
      error: err => {
        this.errorMessage = err.error;
        this.successMessage = "";
      }
    })
  }

  logout(): void {
    localStorage.setItem("loginId", "");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("currentProfileId", "");
  }

  switchProfile(): void {
    localStorage.setItem("currentProfileId", "");
    localStorage.setItem("currentProfileName", "");
  }

  ngOnInit(): void {

    this.currentUserProfileId = localStorage.getItem("currentProfileId");

    this.currentProfileName = localStorage.getItem("currentProfileName");

    this.getFilesByUserProfileId();

    this.createUploadForm();

  }

  public createUploadForm() {
    this.uploadForm = this.formBuilder.group({
      descriptions: [this.uploadEntry.descriptions, [Validators.required]]
    });
  }

  upload(formData: FormData) {
    this.homeService.uploadFile(this.formData).subscribe({
      next: fileURL => {
        this.errorMessage = "";
        this.successMessage = "Successfully uploaded your file";
        this.uploadFormVisible = false;
      },
      error: err => {
        this.errorMessage = err.error;
        this.successMessage = "";
      }
    });

    this.clearFormData();

    setTimeout(() => { //Don't want to update view before server has a chance to respond
      this.updateFilesView();
    }, 2000);
  }


  clearFormData() { //needed so you can upload more than 1 file per session
    this.formData.delete('file');
    this.formData.delete('category');
    this.formData.delete('descriptions');
    this.formData.delete('profileId');
  }

  onUpload(event) {
    this.file = event.target.files[0];

    if (this.file) {

      this.fileName = this.file.name;
      this.fileCategory = this.getFileType(this.fileName);

      this.formData.append("file", this.file);
      this.formData.append("category", this.getFileType(this.fileName));
      this.formData.append("descriptions", this.uploadForm.get('descriptions').value);
      this.formData.append("profileId", this.currentUserProfileId);
    }


  }

  deleteFile(fileName:string){
    this.homeService.deleteFile(fileName).subscribe({
      next: response => {
        this.successMessage = response;
      },
      error: err => {
        this.errorMessage = err.error;
        this.successMessage = "";
      },
      complete: () => {
        this.updateFilesView();
      }
    }
    )
  }
  
  getFileType(fileName:string): string {
    return fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
  }

}
