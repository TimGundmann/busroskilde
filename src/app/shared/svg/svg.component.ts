import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {

  @Input() name: String;
  @Input() width = '32';
  @Input() height = '32';

  constructor() { }
}
