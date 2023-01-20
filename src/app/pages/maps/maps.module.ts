import { DeleteDocumentComponent } from './search/delete-document/delete-document.component';
import { UpdateDocumentComponent } from './search/update-document/update-document.component';
import { DocumentService } from './../../services/document.service';
import { CallbackPipe } from './../../services/callback.pipe';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents } from './maps-routing.module';
import { FormsModule, FormsModule as ngFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scan-form/scanner/scanner.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SafeurlPipe } from '../../services/safeurl.pipe';
import { DataTablesModule } from 'angular-datatables';
import { SoftDocumentComponent } from './soft-document/soft-document.component';

@NgModule({
  imports: [
    ThemeModule,
    GoogleMapsModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    ngFormsModule,
    NbDatepickerModule,
    NgbModule,
    CommonModule,
    NbDialogModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    DataTablesModule,
    NbIconModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    ...routedComponents,
    ScannerComponent,
    SearchResultComponent,
    CallbackPipe,
    SafeurlPipe,
    UpdateDocumentComponent,
    DeleteDocumentComponent,
    SoftDocumentComponent
  ],
  providers: [
    DocumentService
  ]
})
export class MapsModule { }
