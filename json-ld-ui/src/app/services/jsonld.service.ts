import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class JsonldService {

  constructor(private http: HttpClient, private router: Router) {}

  getExpanded(jsonLdDoc) {
    return this.http.post("http://173.193.85.229:32434/terms/expand", jsonLdDoc, { observe: "response" });
  }

  getResponse(apiurl, jsonLdDoc, header) {
    return this.http.post(apiurl, jsonLdDoc, { headers: header, observe: "response" });
  }
}