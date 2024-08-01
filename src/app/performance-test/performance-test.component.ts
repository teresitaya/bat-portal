import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './performance-test.component.html',
  styleUrl: './performance-test.component.scss'
})
export class PerformanceTestComponent implements OnInit {
  performanceInformation: any;
  memoryInfo: any;

  ngOnInit(): void {
    this.getPerformanceInformation();
    this.getMemoryInfo();
  }
  private getPageLoadTime() {
    const [navigationEntry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
        return loadTime;
    }
    return null;
}

private getNavigationTiming() {
    if (performance.getEntriesByType) {
        const [navigationEntry] = performance.getEntriesByType('navigation');
        if (navigationEntry) {
            return navigationEntry.duration;
        }
    }
    return null;
}

getPerformanceInformation() {
    this.performanceInformation = {
        pageLoadTime: this.getPageLoadTime() ? this.getPageLoadTime() + ' ms' : 'N/A',
        navigationTiming: this.getNavigationTiming() ? this.getNavigationTiming() + ' ms' : 'N/A'
    };
  }
  
  getMemoryInfo() {
    this.memoryInfo = {
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize + ' bytes',
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize + ' bytes',
      jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit + ' bytes'
    };
  }
}
