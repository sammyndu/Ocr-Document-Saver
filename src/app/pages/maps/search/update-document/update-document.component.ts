import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfoEntity } from '../../../../models/document-info.model';
import { DocumentService } from '../../../../services/document.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit {

  file!: File;
  submitting = false;
  fileString = '';

  documentInfo = new DocumentInfoEntity;

  constructor(
    public activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  async updateDocument(form: NgForm) {
    if(form.valid) {
      let data = '';
      this.submitting = true
      if(this.file != null) {
        data = await this.readBase64(this.file);
      }
      
      this.documentInfo.documentContent = data;
        this.documentService.updateDocument(this.documentInfo.id, this.documentInfo).subscribe(resp => {
          this.submitting = false;
          console.log(resp);
          if(resp.error != null) {
            this.toast.showError("Error", resp.error.message);
          } else {
            this.toast.showSuccess("Updated","Document updated successfully.", );
            //this.documentInfo = new DocumentInfo;
            //this.fileString = '';
            this.activeModal.close();
          }
          console.log(resp);
        }, err => {
          this.submitting = false;
          this.toast.showError("Error", err.message);
          console.log(err);
        })
      }
  }

  getFile(event: any) {
    this.file = event.target?.files[0];
  }

  
  private readBase64(file: any): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);
    
      reader.readAsDataURL(file);
    });
    return future;
  }

}
