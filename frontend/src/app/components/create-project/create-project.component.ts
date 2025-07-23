import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  private fb = inject(FormBuilder);
  private rs = inject(ResponsiveService);

  projectForm!: FormGroup;
  isSubmitting = false;

  // Nutze die korrekten Signale
  isHandset = this.rs.isHandset;
  formLayoutClass = this.rs.formLayoutClass;

  constructor() {
    effect(() => { if (this.projectForm) this.updateForm(); });
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]),
      category: new FormControl('', Validators.required),
      tags: new FormControl(''),
      isPublic: new FormControl(true),
      collaborationLevel: new FormControl('open')
    });
    this.updateForm();
  }

  private updateForm() {
    const controls = this.projectForm.controls;
    if (this.rs.isHandset()) {
      controls['description'].setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(500)]);
    } else {
      controls['description'].setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(1000)]);
    }
    controls['description'].updateValueAndValidity({ emitEvent: false });
  }

  onSubmit() {
    if (this.projectForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Projekt erfolgreich erstellt! (Simulation)');
        this.projectForm.reset();
      }, 2000);
    } else {
      this.markTouched();
    }
  }

  onCancel() {
    this.projectForm.reset();
  }

  private markTouched() {
    Object.values(this.projectForm.controls).forEach(ctrl => ctrl.markAsTouched());
  }

  get titleControl() {
    return this.projectForm.get('title') as FormControl;
  }
  get descriptionControl() {
    return this.projectForm.get('description') as FormControl;
  }
  get categoryControl() {
    return this.projectForm.get('category') as FormControl;
  }
}
