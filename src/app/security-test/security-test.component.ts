import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './security-test.component.html',
  styleUrl: './security-test.component.scss'
})
export class SecurityTestComponent implements OnInit {

  securityInfo: any;

  ngOnInit(): void {
    this.getSecurityInformation();
  }

  getSecurityInformation() {
    const isSecureContext = window.isSecureContext;
    const httpsSupported = location.protocol === 'https:';
    const doNotTrackEnabled = this.isDoNotTrackEnabled();
    const adBlockerActive = this.isAdBlockerActive();
    this.securityInfo = {
      isSecureContext,
      httpsSupported,
      doNotTrackEnabled,
      adBlockerActive
    };
  }
  isDoNotTrackEnabled() {
    return navigator.doNotTrack === "1" || (window as any).doNotTrack === "1" || (navigator as any).msDoNotTrack === "1";
}

isAdBlockerActive() {
  const ad = document.createElement('div');
  ad.innerHTML = '&nbsp;';
  ad.className = 'adsbox';
  document.body.appendChild(ad);
  const isBlocked = ad.offsetHeight === 0;
  document.body.removeChild(ad);
  return isBlocked;
}
  
}
