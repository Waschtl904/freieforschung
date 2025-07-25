import { Component, OnInit } from '@angular/core';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  consentKey = 'cookieConsent';
  settings: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  };
  accepted = false;

  ngOnInit() {
    const saved = localStorage.getItem(this.consentKey);
    if (saved) {
      this.settings = JSON.parse(saved).settings;
      this.accepted = true;
      this.applySettings();
    }
  }

  acceptAll() {
    this.settings = { necessary: true, analytics: true, marketing: true, functional: true };
    this.save();
  }

  rejectAll() {
    this.settings = { necessary: true, analytics: false, marketing: false, functional: false };
    this.save();
  }

  save() {
    localStorage.setItem(this.consentKey, JSON.stringify({ timestamp: new Date(), settings: this.settings }));
    this.accepted = true;
    this.applySettings();
    // Optional: POST to backend /api/privacy/cookie-consent
  }

  private applySettings() {
    // z.B. Analytics nur bei settings.analytics laden
  }
}
