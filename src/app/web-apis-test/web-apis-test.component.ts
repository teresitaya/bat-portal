import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-apis-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './web-apis-test.component.html',
  styleUrl: './web-apis-test.component.scss',
})
export class WebApisTestComponent implements OnInit {
  webApisInfo: any;

  ngOnInit(): void {
    this.getWebApisInfo();
  }
  isGeolocationAvailable() {
    return 'geolocation' in navigator;
  }

  isWebRTCAvailable() {
    return 'RTCPeerConnection' in window;
  }

  isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  isWebAssemblyAvailable() {
    return typeof WebAssembly === 'object';
  }

  arePushNotificationsAvailable() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  getWebApisInfo() {
    const geolocation = this.isGeolocationAvailable();
    const webRTC = this.isWebRTCAvailable();
    const webGL = this.isWebGLAvailable();
    const webAssembly = this.isWebAssemblyAvailable();
    const pushNotifications = this.arePushNotificationsAvailable();

    this.webApisInfo = {
      geolocation,
      webRTC,
      webGL,
      webAssembly,
      pushNotifications,
    };
  }

}
