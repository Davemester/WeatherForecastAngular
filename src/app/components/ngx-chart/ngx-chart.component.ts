import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ngx-chart',
  templateUrl: './ngx-chart.component.html',
  styleUrls: ['./ngx-chart.component.css']
})
export class NgxChartComponent implements OnInit {
  @Input() multi: any[];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Output() sendSelect = new EventEmitter();
  view: any[];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor() {
   }

  ngOnInit(): void {
  }

  onSelect(data): void {

    this.sendSelect.emit(data);
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }

}
