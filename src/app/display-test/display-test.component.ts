import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './display-test.component.html',
  styleUrl: './display-test.component.scss',
})
export class DisplayTestComponent implements OnInit {
  displayInfo: any;

  ngOnInit(): void {
    this.getDisplayInformation();
  }

  private getScreenResolution() {
    return {
      width: screen.width + ' px',
      height: screen.height + ' px',
    };
  }

  private getViewportSize() {
    return {
      width: window.innerWidth  + ' px',
      height: window.innerHeight  + ' px',
    };
  }

  getDisplayInformation() {
    const devicePixelRatio = window.devicePixelRatio;
    const getScreenResolution = this.getScreenResolution();
    const viewPortResolution = this.getViewportSize();
    const colorDepth = screen.colorDepth + ' bit';
    const pixelDepth = screen.pixelDepth + ' bit';
    
    this.displayInfo = {
      devicePixelRatio,
      getScreenResolution,
      viewPortResolution,
      colorDepth,
      pixelDepth,
    };
  }
}
