import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StorageTestComponent } from '../storage-test/storage-test.component';
@Component({
  selector: 'app-bat-test',
  standalone: true,
  imports: [ButtonModule, JsonPipe, StorageTestComponent],
  templateUrl: './bat-test.component.html',
  styleUrl: './bat-test.component.scss',
})
export class BatTestComponent {
  testIsRunning: boolean = false;
  testIsFinished: boolean = false;
  browserInformation: any;
  networkInformation: any;
  serviceWorkerInformation: any;
 

  async runTest() {
    this.testIsRunning = true;
    this.testIsFinished = false;
    this.getBrowserInformation();
    //await this.getNetworkInfo();
    this.checkServiceWorker();
    setTimeout(() => {
      this.testIsRunning = false;
      this.testIsFinished = true;
    }, 500);
  }

  getBrowserInformation() {
    this.browserInformation = navigator.userAgent;
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
        return navigator.serviceWorker.getRegistrations().then((registrations) => {
            return registrations.length > 0;
        });
    }
    return Promise.resolve(false);
}

  async checkServiceWorker() {
    this.serviceWorkerInformation = {
      serviceWorkerSupported: this.isServiceWorkerSupported(),
      serviceWorkersRegistered: await this.areServiceWorkersRegistered() + ' (is returning always false)',
    };
  }

 
}
