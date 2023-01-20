import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentInfoEntity } from '../../../models/document-info.model';
import { DocumentService } from '../../../services/document.service';
import { ToastService } from '../../../services/toast.service';

import {saveAs} from 'file-saver';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  submitting = false;
  loading = false;
  searchError = false;

  docs: DocumentInfoEntity[] = [];

  docContent: string;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {
    processing: true,
    order: [[3, "desc"]],
    ordering: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private documentService: DocumentService,
    private toast: ToastService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getDocs();
  }

  getDocs() {
    this.loading = true;
    return this.documentService.getNewDocuments().subscribe(res => {
      this.loading = false;
      console.log(res);
      
      this.docs = res.content;
      // for(let i = 0; i < this.docs.length; i++) {
      //   this.docs[i].documentContent = this.sanitizer.bypassSecurityTrustUrl(this.docs[i].documentContent).toString();
      // }
      this.dtTrigger.next(true);
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  getDocContent(id) {
    this.documentService.getDocumentContent(id).subscribe(res => {
      this.docContent = res.content?.documentContent;
      console.log(res)

      const doc = this.docs.find(x => x.id == id);

      saveAs(this.dataURItoBlob(this.docContent), `doc ${doc?.documentName}`);
    })
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }

  // downloadFile(base64: string) {
  //   const blob = new Blob(base64, { type: 'application/pdf' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
