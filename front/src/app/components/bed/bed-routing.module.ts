import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedComponent } from './bed.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BedComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BedRoutingModule {}
