
import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AlertConsoleComponent } from './features/alerts/pages/alert-console/alert-console.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'alerts',
        pathMatch: 'full'
      },
      {
        path: 'alerts',
        component: AlertConsoleComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'alerts'
  }
];
