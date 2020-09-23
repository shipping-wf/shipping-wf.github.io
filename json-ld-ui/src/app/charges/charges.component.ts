import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'charges',
  templateUrl: './charges.component.html'
})
export class ChargesComponent implements OnInit {
  @Input() chargeItem;
  
  ngOnInit(): void {}

}
