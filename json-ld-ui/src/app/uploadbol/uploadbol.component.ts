import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonldService } from '../services';

@Component({
  selector: 'app-uploadbol',
  templateUrl: './uploadbol.component.html'
})

export class UploadbolComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fetch: JsonldService
  ) { }
  percentDone = 0;
  uploadSuccess: boolean;
  fileChosen = false;
  uploadInProgress = false;
  showUploadBlock = false;
  uploadFileName = '';
  uploadedDocumentLink = '';
  parsedJsonContent = undefined;
  selectedValue: string;
  selectedVersion = undefined;
  showDocument = false;
  linkDocument = '';
  droppedFileName = '';
  droppedFileSource = undefined;
  fileDropped = false;

  fileContent = undefined;
  selectedContextDocument;
  vOne = {
    "@context":
    {
      "billOfLading": "https://shipping-wf.github.io/BillOfLading.jsonld",
      "billOfLadingNumber":"@id",
      "address":"https://schema.org/address", 
      "street": "https://schema.org/streetAddress",
      "city": "https://schema.org/addressLocality",
      "state": "https://schema.org/addressRegion",
      "country": "https://schema.org/addressCountry",
      "postcode": "https://schema.org/postalCode",
      "contactDetails": "https://schema.org/ContactPoint",
      "email": "https://schema.org/email",
      "carrier":"https://shipping-wf.github.io/Carrier.jsonld",
      "carrierCode": "https://schema.org/identifier",
      "name": "https://schema.org/name",
      "taxId": "https://schema.org/vatID",
      "consignor":"https://shipping-wf.github.io/Consignor.jsonld",
      "taxReference": "https://schema.org/vatID",
      "partyRef": "https://shipping-wf.github.io/partyReference",
      "organizationId": "https://schema.org/leiCode",
      "consignee":"https://shipping-wf.github.io/Consignee.jsonld",
      "consignmentItems":{
  "@id": "https://shipping-wf.github.io/ConsignmentItem.jsonld",
  "@container":"@set"
      },
      "sequence": "https://schema.org/position",
      "information": "https://schema.org/description",
      "grossWeight":"https://schema.org/weight",
      "value": "https://schema.org/QuantitativeValue",
      "unit": "https://schema.org/unitCode",
      "serviceMode": "https://schema.org/serviceType",
      "transportEquipmentQuantity": "https://schema.org/Quantity",
      "charges": {
  "@id":"https://shipping-wf.github.io/Charge.jsonld",
        "@container":"@set"
        },
      "chargeCode": "https://schema.org/identifier",
      "paymentTerm": "https://schema.org/PaymentMethod",
      "chargeText": "https://schema.org/priceSpecification",
      "rate": "https://schema.org/shippingRate",
      "currency": "https://schema.org/currency",
      "amount": "https://schema.org/value",
      "freightPayableAt": "https://schema.org/Place",
      "chargePayerPartyRef": "https://schema.org/leiCode",
      "chargePayerPartyName": "https://schema.org/name",
      "notifyParties": { 
  "@id":"https://shipping-wf.github.io/NotifyParty.jsonld",
  "@container":"@set"
        },
      "shippedOnBoardDate":"https://schema.org/departureTime",
      "bookingNumber": "https://schema.org/reservationId",
      "negotiable":"https://shipping-wf.github.io/Negotiable",
      "eBL": "https://shipping-wf.github.io/isElectronic"
    }
  };
  vTwo = {
    "@context":
    {
      "billOfLading": "https://shipping-wf.github.io/BillOfLading.jsonld",
      "billOfLadingNumber":"@id",
      "address":"https://schema.org/address", 
      "street": "https://schema.org/streetAddress",
      "city": "https://schema.org/addressLocality",
      "state": "https://schema.org/addressRegion",
      "country": "https://schema.org/addressCountry",
      "postcode": "https://schema.org/postalCode",
      "contactDetails": "https://schema.org/ContactPoint",
      "email": "https://schema.org/email",
      "carrier":"https://shipping-wf.github.io/Carrier.jsonld",
      "carrierCode": "https://schema.org/identifier",
      "name": "https://schema.org/name",
      "taxId": "https://schema.org/vatID",
      "consignor":"https://shipping-wf.github.io/Consignor.jsonld",
      "taxReference": "https://schema.org/vatID",
      "businessPartyIdentifier": "https://shipping-wf.github.io/partyReference",
      "partyRef": "https://shipping-wf.github.io/partyReference",
      "organizationId": "https://schema.org/leiCode",
      "consignee":"https://shipping-wf.github.io/Consignee.jsonld",
      "consignmentItems":{
  "@id": "https://shipping-wf.github.io/ConsignmentItem.jsonld",
  "@container":"@set"
      },
      "sequence": "https://schema.org/position",
      "information": "https://schema.org/description",
      "grossWeight":"https://schema.org/weight",
      "value": "https://schema.org/QuantitativeValue",
      "unit": "https://schema.org/unitCode",
      "serviceMode": "https://schema.org/serviceType",
      "transportEquipmentQuantity": "https://schema.org/Quantity",
      "charges": {
  "@id":"https://shipping-wf.github.io/Charge.jsonld",
        "@container":"@set"
        },
      "chargeCode": "https://schema.org/identifier",
      "paymentTerm": "https://schema.org/PaymentMethod",
      "chargeText": "https://schema.org/priceSpecification",
      "rate": "https://schema.org/shippingRate",
      "currency": "https://schema.org/currency",
      "amount": "https://schema.org/value",
      "freightPayableAt": "https://schema.org/Place",
      "chargePayerPartyRef": "https://schema.org/leiCode",
      "chargePayerPartyName": "https://schema.org/name",
      "notifyParties": { 
  "@id":"https://shipping-wf.github.io/NotifyParty.jsonld",
  "@container":"@set"
        },
      "shippedOnBoardDate":"https://schema.org/departureTime",
      "bookingNumber": "https://schema.org/reservationId",
      "negotiable":"https://shipping-wf.github.io/Negotiable",
      "eBL": "https://shipping-wf.github.io/isElectronic"
    }
  };

  versions = [
    {value: 'V1', viewValue: 'V1'},
    {value: 'V2', viewValue: 'V2'},
    {value: 'V3', viewValue: 'V3'}
  ];

  ngOnInit(): void {}

  refresh(): void {
    window.location.reload();
  }

  changeApi(e: any) {
    this.selectedVersion = e;
    if (this.selectedVersion === 'V1') {
      this.selectedContextDocument = this.vOne;
    } else {
      this.selectedContextDocument = this.vTwo;
    }
  }

  newUpload() {
    this.fileChosen = false; 
    this.percentDone = 0;
    this.selectedVersion = undefined;
    this.uploadSuccess = false;
    this.selectedContextDocument = undefined;
  }

  handleDrop(files) {
    this.fileDropped = true;
    let file = files[0];
    this.uploadFileName = file?.name
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.newUpload();
      this.droppedFileSource = reader.result;
      if (!!this.droppedFileSource) {
        this.parsedJsonContent = JSON.parse(this.droppedFileSource);
      }
    };
    reader.onerror = () => {
      console.log(reader.error);
    }; 
  }

  uploadDocument() {
    this.fileChosen = true;
    this.uploadInProgress = true;
    let header;
    let apiurl;

    const v1header = {
      'Content-Type':'application/json',
      'Link': '<https://shipping-wf.github.io/BillOfLading.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
    };
  
    const v2header = {
      'Content-Type':'application/json',
      'Link': '<https://shipping-wf.github.io/BillOfLadingv2.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
    };
  
    if (this.selectedVersion === 'V1') {
      header = v1header;
      apiurl = 'http://173.193.85.229:32434/terms/expand';
      this.linkDocument = 'https://shipping-wf.github.io/BillOfLading.jsonld';
    }
  
    if (this.selectedVersion === 'V2') {
      header = v2header;
      apiurl = 'http://173.193.85.229:32434/terms/expand';
      this.linkDocument = 'https://shipping-wf.github.io/BillOfLadingv2.jsonld';
    }
  
    if (this.selectedVersion === 'V3') {
      header = v2header;
      apiurl = 'http://173.193.85.229:32434/terms/frame';
      this.linkDocument = 'https://shipping-wf.github.io/BillOfLadingv2.jsonld';
    }

    this.http.post(apiurl, this.parsedJsonContent, {headers: header, observe: 'response'}).subscribe(event => {  
      this.fileContent = event['body'];
      this.uploadSuccess = true;
    });

    this.fetch.getResponse(apiurl, this.parsedJsonContent, header).subscribe(
      (res) => {
        this.percentDone = 100;
        this.uploadSuccess = true;
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
