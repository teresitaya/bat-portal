import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timezone-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './timezone-test.component.html',
  styleUrl: './timezone-test.component.scss'
})
export class TimezoneTestComponent implements OnInit {
  timeInformation: any;

  ngOnInit(): void {
    this.getTimeInformation();
  }

  getTimeInformation() {
    const timeZone = this.getTimeZone();
    const locale = this.getLocale();
    this.timeInformation = {
      timeZone,
      locale
    };
  }
  getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

 getLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale;
}
}
