import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Upload } from 'src/assets/entites/Upload';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileName: string;
  file: File;
  errorMessage: string;
  fileURL: string;
  currentUserProfileId: string;
  formData = new FormData();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { }

  ngOnInit():void {

    this.currentUserProfileId = localStorage.getItem("currentProfileId");

    this.createUploadForm();
  }


  uploadEntry: Upload = new Upload();
  uploadForm: FormGroup;

  public createUploadForm() {
    this.uploadForm = this.formBuilder.group({
      category: [this.uploadEntry.category, [Validators.required]],
      descriptions: [this.uploadEntry.descriptions, [Validators.required]]
    });
  }

  upload(formData:FormData) {
    this.homeService.uploadFile(this.formData).subscribe({
      next: fileURL => {
        this.fileURL = fileURL;
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }

  onUpload(event) {
    this.file = event.target.files[0];

    if (this.file) {

      this.fileName = this.file.name;
  
      this.formData.append("file",this.file);
      this.formData.append("category",this.uploadForm.get('category').value);
      this.formData.append("descriptions", this.uploadForm.get('descriptions').value);
      this.formData.append("profileId",this.currentUserProfileId);
    }

    
  }


}
