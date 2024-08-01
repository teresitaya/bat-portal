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

  async checkPersistence() {
    if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persisted();
        if (!isPersisted) {
            const isPersistent = await navigator.storage.persist();
            return isPersistent ? 'Data is now persistent' : 'Failed to enable persistent storage';
        } else {
            return 'Data is already persistent';
        }
    } else {
        return 'Persistence API is not supported in this browser';
    }
  }

  async getWebApisInfo() {
    const geolocation = this.isGeolocationAvailable();
    const webRTC = this.isWebRTCAvailable();
    const webGL = this.isWebGLAvailable();
    const webAssembly = this.isWebAssemblyAvailable();
    const pushNotifications = this.arePushNotificationsAvailable();
    const persistence = await this.checkPersistence();

    this.webApisInfo = {
      geolocation,
      webRTC,
      webGL,
      webAssembly,
      pushNotifications,
      persistence,
    };
  }

}
