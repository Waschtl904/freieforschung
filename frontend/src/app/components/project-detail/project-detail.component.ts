import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HypothesisFormComponent } from '../hypothesis-form/hypothesis-form.component';
import { HypothesisListComponent } from '../hypothesis-list/hypothesis-list.component';
import { SemanticService } from '../../services/semantic.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HypothesisFormComponent,
    HypothesisListComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private semantic = inject(SemanticService);

  project!: any;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('project_id')!;
    this.project = await this.http.get(`/api/projects/${id}`).toPromise();
    // JSON-LD einbetten
    const ld = await this.semantic.compact(this.project);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
  }
}
