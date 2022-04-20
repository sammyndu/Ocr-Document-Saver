import { DocumentInfo, DocumentInfoEntity } from './../../../../models/document-info.model';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DocumentService } from '../../../../services/document.service';
import { ToastService } from '../../../../services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDocumentComponent } from '../update-document/update-document.component';
import { DeleteDocumentComponent } from '../delete-document/delete-document.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  title: string;

  submitting = false;
  loading = false;
  searchError = false;

  docs: DocumentInfoEntity[] = [];

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {
    processing: true,
    order: [[3, "desc"]],
    ordering: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private documentService: DocumentService,
    private toast: ToastService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getDocs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dtTrigger.next();
  }

  getDocs() {
    this.loading = true;
    return this.documentService.getDocuments().subscribe(res => {
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

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  updateDocument(id: number){
    const modalRef = this.modalService.open(UpdateDocumentComponent, { size: 'md', backdropClass: "modal-backdrop"});
    modalRef.componentInstance.documentInfo = this.docs.find(x => x.id === id) ?? new DocumentInfoEntity;
    modalRef.result.then(() => {
      //this.getDocs(true);
      this.modal.close();
      //this.rerender();
    })
  }

  deleteDocument(id: number) {
    const modalRef = this.modalService.open(DeleteDocumentComponent, { size: 'md'});
    modalRef.componentInstance.documentInfo = this.docs.find(x => x.id === id) ?? new DocumentInfoEntity;
    modalRef.result.then(() => {
      //this.getDocs(true);
      //this.rerender();
      this.modal.close();
    })
  }
}
