import { DocumentService } from './../../../services/document.service';
import { DocumentInfoEntity } from './../../../models/document-info.model';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import { DocumentInfo } from '../../../models/document-info.model';
import { Device, DwtService } from '../../../services/dwt.service';
import { ScannerComponent } from './scanner/scanner.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'ngx-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss']
})
export class ScanFormComponent implements OnInit {
  // eventsSubject: Subject<void> = new Subject<void>();

  docInfo =  new DocumentInfo(); 

  loading = false;

  // bNoInstall = false;
  // bUseCameraViaDirectShow = false;

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.eventsSubject.next(event);
  // }
  constructor(
    //protected dwtService: DwtService, 
    private toastService: ToastService,
    private docService: DocumentService,
    private dialogService: NbDialogService) { }

  // toggleStartDemo() {
  //   this.dwtService.bUseService = !this.bNoInstall;
  //   this.dwtService.bUseCameraViaDirectShow = this.bUseCameraViaDirectShow && !this.bNoInstall;
  // }
  ngOnInit(): void {
    //this.toggleStartDemo();
  }

  openScanner() {
    //this.toggleStartDemo();
    this.dialogService.open(ScannerComponent, {
    }).onClose.subscribe(res => {
      this.docInfo.documentId = res.docSN;
      this.docInfo.documentName = res.docName;
      this.docInfo.documentContent = res.file;
      console.log(res.file);
    });
  }

  save() {
    this.loading = true;
    this.docService.addDocument(this.docInfo).subscribe(res => {
      this.loading = false;
      this.toastService.showSuccess("Added", "Document added successfully");
    }, err => {
      this.loading = false;
      this.toastService.showError("Error", "Something went wrong"); 
    });
  }

  disableSave() {
    return !this.docInfo.documentId || !this.docInfo.documentName || !this.docInfo.documentContent;
  }
}