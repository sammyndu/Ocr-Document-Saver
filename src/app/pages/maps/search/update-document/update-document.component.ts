import { Component, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfoEntity } from '../../../../models/document-info.model';
import { DocumentService } from '../../../../services/document.service';
import { ToastService } from '../../../../services/toast.service';
import { ScannerComponent } from '../../scan-form/scanner/scanner.component';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit {

  file!: File;
  submitting = false;
  fileString = '';

  fileUpdated = false;

  documentInfo = new DocumentInfoEntity;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private toast: ToastService,
    @Optional() private dialogService: NbDialogService
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
      
      //this.documentInfo.documentContent = data;
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

  openScanner() {
    //this.toggleStartDemo();
    // this.dialogService.open(ScannerComponent, {
    // }).onClose.subscribe(res => {
    //   this.fileUpdated = true;
    //   //this.documentInfo.documentId = res.docSN;
    //   this.documentInfo.documentName = res.docName;
    //   this.documentInfo.documentContent = res.file;
    //   //console.log(res.file);
    // });

    const modalRef = this.modalService.open(ScannerComponent, { size: 'md', backdropClass: "modal-backdrop"});
    //modalRef.componentInstance.documentInfo = this.docs.find(x => x.id === id) ?? new DocumentInfoEntity;
    modalRef.componentInstance.isDocumentUpdate = true;
    modalRef.componentInstance.DocumentUpdateFiles = this.dataUrlToFileList([this.documentInfo.documentContent], [this.documentInfo.documentName]);
    modalRef.closed.subscribe((res) => {
      console.log(res)
      //this.getDocs(true);
      console.log('here');
        this.fileUpdated = true;
      //this.documentInfo.documentId = res.docSN;
      //this.documentInfo.documentName = res.docName;
      this.documentInfo.documentContent = res.file;
      //console.log(res.file);
    })

  }

  public dataUrlToFileList(dataUrls: string[], fileNames: string[]): FileList {
    const fileArray: File[] = [];

    for (let index = 0; index < dataUrls.length; index++) {
        const dataUrl = dataUrls[index];
        const fileName = fileNames[index];
        // Converting content to Blob
        const blobObject = this.dataUrlToBlob(dataUrl);
        // Converting Blob to file
        const file = new File([blobObject], fileName);
        fileArray.push(file);
    }

    // Converting array with file to filelist and passing to uploader
    return fileArray as unknown as FileList; // < -------------- MAGIC HAPPENS HERE
}

private dataUrlToBlob(dataUrl: string): Blob {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataUrl.split(",")[1]);

  // separate out the mime component
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ia], { type: mimeString });
  return blob;
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
