import { Component, OnInit, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PopupRequest } from '@azure/msal-browser';
import { environment } from '../../environments/environment';
import { JsonPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-msal',
  standalone: true,
  imports: [
    JsonPipe,
    ButtonModule
  ],
  templateUrl: './msal.component.html',
  styleUrl: './msal.component.scss'
})
export class MsalComponent implements OnInit {
  authorizing = false;
  msalService = inject(MsalService);
  httpClient = inject(HttpClient);
  result: any;
  tenantId: string  = '';
  token: string = '';
  aud: string = '';
  granting = false;
  granted = false;


  ngOnInit(): void {
    this.msalService.initialize();
    this.tenantId = localStorage.getItem('tenantId') || '';
    this.granted = localStorage.getItem('tenantId') ? true : false;
    if(this.granted){
      this.token = localStorage.getItem('token') || '';
    }
  }

  authorize() {
    this.authorizing = true;
    this.msalService
      .loginPopup({
        scopes: [
          'https://manage.office.com/ActivityFeed.Read',  // Office 365 Management API
          'https://manage.office.com/ActivityFeed.ReadDlp',
          'https://manage.office.com/ServiceHealth.Read'
        ],
        prompt: 'select_account',
      } as PopupRequest
      ) .subscribe({
        next: (result) => {
          if (
            result &&
            result.tenantId &&
            result.idTokenClaims &&
            (result.idTokenClaims as any).aud
          ) {
            console.log('Login popup result:', result);
            this.tenantId = result.tenantId;
            this.token = result.accessToken;
            this.aud = (result.idTokenClaims as any).aud;
            localStorage.setItem('token', this.token);
            localStorage.setItem('account', JSON.stringify(result));
          } else {
            console.error('Invalid result object:', result);
          }
          this.authorizing = false;
          this.result = result;
        },
        error: (error) => {
          console.error('Login popup error:', error);
          this.authorizing = false;
        },
      });
  }

  grantAdminConsent(): void {
    this.granting = true;
    localStorage.setItem('tenantId', this.tenantId);
    const state = Math.floor(Math.random() * 90000) + 10000; // state parameter for anti token forgery
    const adminConsentUri =
      'https://login.microsoftonline.com/' +
      `${this.tenantId}` +
      '/v2.0/adminconsent?client_id=' +
      `${this.aud}` +
      '&state=' +
      `${state}` +
      '&redirect_uri=' +
      `${window.location.origin}` +
      // Resource-specific scopes only
      '&scope=https://manage.office.com/ActivityFeed.Read https://manage.office.com/ActivityFeed.ReadDlp  https://manage.office.com/ServiceHealth.Read'
    window.location.replace(adminConsentUri);
  }
  
  getServices(){
    this.httpClient.get(`http://localhost:3000/proxy/services`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json',
      },
      params: {
        tenantId: this.tenantId
      },
    }).subscribe({
      next: (result) => {
        console.log('GET request result:', result);
        this.result = result;
      },
      error: (error) => {
        console.error('GET request error:', error);
      },
    });
  }


}
