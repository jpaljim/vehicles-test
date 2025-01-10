import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/makes/makes.routes').then(m => m.MAKE_ROUTES)
  },
];
