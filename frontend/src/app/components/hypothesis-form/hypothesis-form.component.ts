import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HypothesisService } from '../../services/hypothesis.service';

@Component({
  selector: 'app-hypothesis-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hypothesis-form.component.html'
})
export class HypothesisFormComponent {
  private fb = inject(FormBuilder);
  private hs = inject(HypothesisService);

  @Input({ required: true }) projectId!: string;

  form = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]]
  });

  submit() {
    if (this.form.valid) {
      this.hs.create(this.projectId, this.form.value.text!);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
