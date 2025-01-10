import { Routes } from "@angular/router";
import { MakeDetailsPageComponent } from "./make-details/make-details.component";
import { MakeListPageComponent } from "./make-list/make-list.component";

export const MAKE_ROUTES: Routes = [
  {
    path: 'makes',
    component: MakeListPageComponent
  },
  {
    path: 'makes/:slug',
    component: MakeDetailsPageComponent
  },
  {
    path: '**',
    redirectTo: 'makes'
  }
];