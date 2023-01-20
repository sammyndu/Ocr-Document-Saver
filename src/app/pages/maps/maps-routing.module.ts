import { ScanFormComponent } from './scan-form/scan-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BubbleMapComponent } from './bubble/bubble-map.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { MapComponent } from './search-map/map/map.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';
import { NewReportComponent } from './new-report/new-report.component';
import { SoftDocumentComponent } from './soft-document/soft-document.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'gmaps',
    component: GmapsComponent,
  }, {
    path: 'leaflet',
    component: LeafletComponent,
  }, {
    path: 'bubble',
    component: BubbleMapComponent,
  },{
    path: 'scan-form',
    component: ScanFormComponent,
  },{
    path: 'search',
    component: SearchComponent,
  },{
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'new-report',
    component: NewReportComponent,
  },
  {
    path: 'soft-doc',
    component: SoftDocumentComponent,
  }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  GmapsComponent,
  LeafletComponent,
  BubbleMapComponent,
  SearchMapComponent,
  MapComponent,
  ScanFormComponent,
  SearchComponent,
  ReportComponent,
  NewReportComponent,
  SoftDocumentComponent
];
