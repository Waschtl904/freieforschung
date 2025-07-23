import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

export interface Hypothesis {
  id: string;
  project_id: string;
  text: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class HypothesisService {
  private http = inject(HttpClient);
  private baseUrl = '/api/hypotheses';

  hypotheses = signal<Hypothesis[]>([]);

  load(projectId: string) {
    this.http.get<Hypothesis[]>(`${this.baseUrl}/project/${projectId}`)
      .subscribe(list => this.hypotheses.set(list));
  }

  create(projectId: string, text: string) {
    const body = { id: uuidv4(), project_id: projectId, text };
    return this.http.post<Hypothesis>(this.baseUrl, body)
      .subscribe(h => this.hypotheses.update(arr => [...arr, h]));
  }
}
