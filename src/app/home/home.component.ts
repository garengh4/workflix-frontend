import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileModel } from 'src/assets/entites/FileModel';
import { AuthService } from '../auth/auth.service';
import { Upload } from 'src/assets/entites/Upload';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private formBuilder: FormBuilder, private auth: AuthService) { }


  errorMessage: string = "";
  successMessage: string = "";

  files: FileModel[];
  uploadFormVisible: boolean = false;

  currentUserProfileId: string;
  currentProfileName: string = "";

  fileName: string;
  file: File;
  fileURL: string;
  formData = new FormData();

  uploadEntry: Upload = new Upload();
  uploadForm: FormGroup;

  updateFilesView() {
    this.successMessage = "";
    this.getFilesByUserProfileId();
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

  logout():void {
    this.auth.logout();
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
      category: [this.uploadEntry.category, [Validators.required]],
      descriptions: [this.uploadEntry.descriptions, [Validators.required]]
    });
  }

  upload(formData: FormData) {
    this.homeService.uploadFile(this.formData).subscribe({
      next: fileURL => {
        this.fileURL = fileURL;
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
    }, 1500);
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

      this.formData.append("file", this.file);
      this.formData.append("category", this.uploadForm.get('category').value);
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

}
