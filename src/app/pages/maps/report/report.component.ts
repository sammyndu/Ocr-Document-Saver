import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DocumentInfoEntity } from '../../../models/document-info.model';
import { DocumentService } from '../../../services/document.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

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

}
