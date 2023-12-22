import {Routes} from '@angular/router';
import { RouteOneComponent } from './route-one/route-one.component';
import { RouteTwoComponent } from './route-two/route-two.component';

export const routes: Routes = [
  { path: '', component: RouteOneComponent },
    { path: 'one', component: RouteOneComponent },
    { path: 'two', component: RouteTwoComponent }
];
