import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './storage-test.component.html',
  styleUrl: './storage-test.component.scss'
})
export class StorageTestComponent implements OnInit {

  storageInformation: any;

  ngOnInit(): void {
    this.getStorageInformation();
  }


  areCookiesEnabled() {
    document.cookie = 'testcookie=1';
    const cookiesEnabled = document.cookie.indexOf('testcookie=') !== -1;
    if (cookiesEnabled) {
      document.cookie =
        'testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return cookiesEnabled;
  }

  async getStorageInformation() {
    const localStorageAvailable = this.isLocalStorageAvailable();
    const sessionStorageAvailable = this.isSessionStorageAvailable();
    const quotaInformation = await this.getQuotaManagement();
    const indexedDBAvailable = this.isIndexedDBAvailable();
    const cookiesAllowed = this.areCookiesEnabled();
    let localStorageSpace;
    let sessionStorageSpace;
    if (localStorageAvailable) {
      localStorageSpace = (this.getStorageSpace(localStorage) || 0) + ' bytes';
    }
    if (sessionStorageAvailable) {
      sessionStorageSpace = (this.getStorageSpace(sessionStorage) || 0) + ' bytes';
    }
    this.storageInformation = {
      localStorageAvailable,
      sessionStorageAvailable,
      localStorageSpace,
      sessionStorageSpace,
      quotaInformation,
      cookiesAllowed,
      indexedDBAvailable
    };
  }

  isLocalStorageAvailable() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }
  isSessionStorageAvailable() {
    try {
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  getStorageSpace(storage: any) {
    let total = 0;
    for (let x in storage) {
      if (storage.hasOwnProperty(x)) {
        total += (storage[x].length + x.length) * 2;
      }
    }
    return total;
  }

  isIndexedDBAvailable() {
    return 'indexedDB' in window;
  }

  async getQuotaManagement() {
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        const quota = estimate.quota || 0; // Total storage quota in bytes
        const usage = estimate.usage || 0; // Used storage in bytes

        return {
            quota : quota + ' bytes',
            usage : usage + ' bytes',
            usagePercentage: (usage / quota * 100).toFixed(5) + '%'
        };
    } else {
        return null;
    }
}
}
