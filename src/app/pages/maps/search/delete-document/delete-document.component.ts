import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfoEntity } from '../../../../models/document-info.model';
import { DocumentService } from '../../../../services/document.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent implements OnInit {

  submitting = false;

  documentInfo = new DocumentInfoEntity;

  constructor(
    public activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  deleteDoc() {
    this.submitting = true;
    this.documentService.deleteDocument(this.documentInfo.id).subscribe(resp => {
      this.submitting = false;
      if(resp.error != null) {
        this.toast.showError("Error", resp.error.message);
      } else {
        this.toast.showSuccess("Deleted Successfully", "Deleted");
        this.activeModal.close();
      }
      
    }, err => {
      this.submitting = false;
      this.toast.showError("Error", " Something went wrong");
      console.log(err);
    })
  }

}
