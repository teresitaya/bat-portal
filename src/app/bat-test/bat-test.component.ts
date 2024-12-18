import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { StorageTestComponent } from '../storage-test/storage-test.component';
import { PerformanceTestComponent } from '../performance-test/performance-test.component';
import { SecurityTestComponent } from '../security-test/security-test.component';
import { DisplayTestComponent } from '../display-test/display-test.component';
import { WebApisTestComponent } from '../web-apis-test/web-apis-test.component';
import { AccessibilityTestComponent } from '../accessibility-test/accessibility-test.component';
import { TimezoneTestComponent } from '../timezone-test/timezone-test.component';
@Component({
  selector: 'app-bat-test',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    ScrollPanelModule,
    JsonPipe,
    StorageTestComponent,
    PerformanceTestComponent,
    SecurityTestComponent,
    DisplayTestComponent,
    WebApisTestComponent,
    AccessibilityTestComponent,
    TimezoneTestComponent
  ],
  templateUrl: './bat-test.component.html',
  styleUrl: './bat-test.component.scss',
})
export class BatTestComponent {
  testIsRunning: boolean = false;
  testIsFinished: boolean = false;
  browserInformation: any;
  networkInformation: any;
  serviceWorkerInformation: any;
  serviceWorker: any;

  async runTest() {
    this.testIsRunning = true;
    this.testIsFinished = false;
    this.getBrowserInformation();
    await this.getNetworkInfo();
    this.checkServiceWorker();
    this.testServiceWorker();
    setTimeout(() => {
      this.testIsRunning = false;
      this.testIsFinished = true;
    }, 500);
  }

  async getBrowserInformation() {
    const incognito = await this.isIncognito();
    this.browserInformation = {
      userAgent: navigator.userAgent,
      incognito
    }
  }

  async getNetworkInfo() {
    let ipAddress = 'N/A';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ipAddress = data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    const connectionType = connection ? connection.effectiveType : 'N/A';
    const downlink = connection ? connection.downlink : 'N/A';
    const rtt = connection ? connection.rtt : 'N/A';
    const downlinkMax = connection ? connection.downlinkMax : 'N/A';

    this.networkInformation = {
      ipAddress,
      connectionType,
      downlink,
      rtt,
      downlinkMax,
    };
  }

  private isServiceWorkerSupported() {
    return 'serviceWorker' in navigator;
  }

  private areServiceWorkersRegistered() {
    if ('serviceWorker' in navigator) {
      return navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          return registrations.length > 0;
        });
    }
    return Promise.resolve(false);
  }

  async checkServiceWorker() {
    this.serviceWorkerInformation = {
      serviceWorkerSupported: this.isServiceWorkerSupported(),
      serviceWorkersRegistered:
        (await this.areServiceWorkersRegistered()) +
        ' (is returning always false)',
    };
  }

  isIncognito() {
    return new Promise((resolve) => {
        const fs = (window as any).RequestFileSystem || (window as any).webkitRequestFileSystem;
        if (!fs) {
            resolve(false); // FileSystem API is not supported, can't determine incognito mode
            return;
        }
        fs((window as any).TEMPORARY, 100, () => resolve(false), () => resolve(true));
    });
}

testServiceWorker(){
  this.serviceWorker = new Worker('/public/bat-test-sw.js');
      this.serviceWorker.postMessage('start');
      this.serviceWorker.onmessage = (message: any) => {
          console.log('serviceWorker', message)
      };
    } catch (error: any) {
      console.error(error);
}
}
