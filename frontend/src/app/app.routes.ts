import { Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: 'create-project', component: CreateProjectComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: '', redirectTo: 'create-project', pathMatch: 'full' }
    ]
  }
];
