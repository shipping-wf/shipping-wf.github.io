import { Component, OnInit, Input } from '@angular/core';
import * as _ from "lodash";
import { JsonldService } from '../services';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})

export class PlaygroundComponent implements OnInit {
  @Input() jsonLdDocument: any;
  @Input() fileName;
  @Input() fileVersion;
  expandedDocument = false;
  loaderOn = true;

  constructor(
    private fetch: JsonldService
  ) {}

  ngOnInit(): void {
    this.jsonLdDocument = this.jsonLdDocument['0']
    this.expandedDocument = true;
    console.log(this.jsonLdDocument);
    this.loaderOn = false;
  }

}