import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cargo-list',
  templateUrl: './cargo-list.component.html'
})

export class CargoListComponent implements OnInit {
  @Input() consignmentItem;

  ngOnInit(): void {}

  lineBreakEnabledData(copy) {
    const splitarray = [];
    if (copy !== undefined) {
      const splitArraySentence = copy.split('\n');
      if (splitArraySentence.length > 0) {
        splitArraySentence.map(data => {
          splitarray.push(data);
        });
        return splitarray;
      } else {
        return null;
      }
    }
  }
}
