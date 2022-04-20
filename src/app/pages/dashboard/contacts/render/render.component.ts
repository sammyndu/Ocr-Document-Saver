import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { Role } from '../../../../models/role.enum';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class RenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
      console.log(this.rowData);
    this.renderValue = this.value ? "<span>Yes</span>" : "<span>No</span>";
  }

}

@Component({
    template: `
      {{renderValue}}
    `,
  })
export class RoleRenderComponent implements ViewCell, OnInit {

    renderValue: string;
  
    @Input() value: Role;
    @Input() rowData: any;
  
    ngOnInit() {
      this.renderValue = Role[this.value];
    }
  
  }