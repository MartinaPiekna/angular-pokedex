import { Routes } from '@angular/router';
import { RouteTwoComponent } from './route-two/route-two.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'two', component: RouteTwoComponent },
];
