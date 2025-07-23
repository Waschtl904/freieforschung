import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects = [
    { id: '1', title: 'Beispielprojekt A' },
    { id: '2', title: 'Beispielprojekt B' }
  ];
}
