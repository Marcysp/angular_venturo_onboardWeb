import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent implements OnInit {
  readonly FORMAT = 'DD/MM/YYYY';
  readonly FORMAT_MODEL = 'YYYY-MM-DD';

  @Input() placeholder: string;
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() showRanges: boolean;
  
  // startDate: string;
  // endDate: string;

  model: {
    placeholder: string,
    startDate: string,
    endDate: string,
    showRange: boolean,
    daterange: string,
  };

  @Output() onChange = new EventEmitter<any>();

  constructor(private daterange: DaterangepickerConfig) { }

  ngOnInit(): void {
    this.initializeModel();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeModel();
  }

  initializeModel() {
    this.model = {
      placeholder: this.placeholder || '',
      startDate: this.startDate ? moment(this.startDate).format(this.FORMAT) : '',
      endDate: this.endDate ? moment(this.endDate).format(this.FORMAT) : '',
      showRange: this.showRanges || false,
      daterange: ''
    };

    this.setDefaultValue();
  }

  setDefaultValue() {
    if (!this.model.startDate && !this.model.endDate) {
      this.model.daterange = '';
      return;
    }

    const { startDate, endDate } = this.model;
    this.model.daterange = `${startDate} - ${endDate}`;
  }

  selectedDate(event: any) {
    this.onChange.emit({
      startDate: moment(event.start).format(this.FORMAT_MODEL),
      endDate: moment(event.end).format(this.FORMAT_MODEL)
    });
  }
}
