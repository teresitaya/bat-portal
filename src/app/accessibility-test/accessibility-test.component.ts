import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessibility-test',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './accessibility-test.component.html',
  styleUrl: './accessibility-test.component.scss'
})
export class AccessibilityTestComponent implements OnInit {
  accessibilityInfo: any;
  screenReaderDetected: boolean = false;
  
  ngOnInit() {
    this.detectScreenReader();
  } 
  detectScreenReader() {
    this.screenReaderDetected = false;
    const srDetection = document.getElementById('sr-detection');
    if (!srDetection) {
        return;
    }
    srDetection.innerText = 'Screen reader detection test';
    
    const observer = new MutationObserver(() => {
        this.screenReaderDetected = true;
        this.updateAccessibilityInfo();
    });
    
    observer.observe(srDetection, { childList: true });
    
    setTimeout(() => {
        observer.disconnect();
        this.updateAccessibilityInfo();
    }, 500);
}

 detectHighContrastMode() {
    const div = document.createElement('div');
    div.style.border = '1px solid';
    div.style.borderColor = 'white black';
    document.body.appendChild(div);

    const computedStyle = window.getComputedStyle(div);
    const highContrast = computedStyle.borderTopColor !== computedStyle.borderRightColor;
    document.body.removeChild(div);

    return highContrast;
}

updateAccessibilityInfo() {
  this.accessibilityInfo = {
    screenReaderDetected  : this.screenReaderDetected,
    highContrastModeDetected: this.detectHighContrastMode()
  }
}

 
}
