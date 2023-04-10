import { Component, Input } from '@angular/core';

@Component({
  selector: 'front-end-internship-assignment-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss'],
})
export class ErrorComponentComponent {
  @Input() errorState = '';

  message: { [key: string]: string } = {
    API_ERROR: 'Something went wrong. Please try again later.',
    NO_DATA: 'No data found.'
  };
}
