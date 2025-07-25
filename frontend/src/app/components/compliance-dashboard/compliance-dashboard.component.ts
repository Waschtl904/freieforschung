import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Report { id: string; title: string; status: string; lastChecked: string; }

@Component({
  selector: 'app-compliance-dashboard',
  template: `
    <h2>DSGVO-Compliance Dashboard</h2>
    <div *ngFor="let r of reports" class="card">
      <h3>{{r.title}}</h3>
      <p>Status: {{r.status}}</p>
      <p>Letzte Prüfung: {{r.lastChecked}}</p>
    </div>`,
  styles: [`.card{border:1px solid #ccc;padding:1rem;margin:0.5rem 0}`]
})
export class ComplianceDashboardComponent implements OnInit {
  reports: Report[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<Report[]>('/api/compliance/reports').subscribe(r => this.reports = r);
  }
}
