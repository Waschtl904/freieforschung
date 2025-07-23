import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HypothesisService } from '../../services/hypothesis.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hypothesis-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './hypothesis-list.component.html'
})
export class HypothesisListComponent implements OnInit {
  private hs = inject(HypothesisService);
  @Input({ required: true }) projectId!: string;

  get list() { return this.hs.hypotheses(); }

  ngOnInit() {
    this.hs.load(this.projectId);
  }
}
