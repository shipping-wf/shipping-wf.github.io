import { Component, OnInit, Input } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'document-view',
  templateUrl: './documentview.component.html'
})

export class DocumentViewComponent implements OnInit {
  @Input() jsonLdDocument: any;
  @Input() fileName;
  @Input() fileVersion;
  expandedDocument = false;
  loaderOn = true;

  ngOnInit(): void {
    this.jsonLdDocument = this.jsonLdDocument['0']
    this.expandedDocument = true;
    // console.log(this.jsonLdDocument);
    this.loaderOn = false;
  }

}