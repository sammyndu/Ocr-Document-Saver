import { SearchDocument } from './../../../models/search-document.model';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SearchResultComponent } from './search-result/search-result.component';
import { DocumentService } from '../../../services/document.service';
import { DocumentInfo } from '../../../models/document-info.model';
import { ToastService } from '../../../services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../../services/session.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string;

  loading = false;

  user:User = new User()

  searchData = new SearchDocument;

  constructor(
    private sessionService: SessionService,
    private toast: ToastService,
    private docService: DocumentService,
    private modalService: NgbModal,
    private dialogService: NbDialogService) {}

  
open(search: DocumentInfo[]) {
  
    // this.dialogService.open(SearchResultComponent, {
    //   context: {
    //     title: 'Search Result',
    //     docs: search
    //   },
    // });

    const modalRef = this.modalService.open(SearchResultComponent, { size: 'lg' });

    modalRef.componentInstance.title = 'Search Result';
    modalRef.componentInstance.docs = search;
  }
  
  ngOnInit() {
    this.user = this.sessionService.getUserInfo();
  }

  dismiss() {

  }

  search() {
    this.loading = true;

    if(this.user.role == Role.Scan) {
      this.searchData.userName = this.user.username;
    }

    this.docService.searchDocument(this.searchData).subscribe(res => {
      this.loading = false;
      this.open(res.content)
    }, err => {
      this.loading = false;
      this.toast.showError("Error", "could not fecth documents");
    })
  }

  disableSubmit() {
    return this.searchData.documentId?.length < 1 && this.searchData.documentName?.length < 1 && !this.searchData.date;
  }

  

}
