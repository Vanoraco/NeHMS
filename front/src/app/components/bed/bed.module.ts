import { NgModule } from '@angular/core';
import { AddEditBedComponent } from './add-edit-bed/add-edit-bed.component';
import { AddEditBedallotmentComponent } from './bed-allotment/add-edit-bedallotment/add-edit-bedallotment.component';
import { BedAllotmentComponent } from './bed-allotment/bed-allotment.component';
import { BedComponent } from './bed.component';
import { AddEditBedtypeComponent } from './bedtype/add-edit-bedtype/add-edit-bedtype.component';
import { BedtypeComponent } from './bedtype/bedtype.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { BedRoutingModule } from './bed-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    BedRoutingModule
  ],
  exports: [],
  declarations: [
    BedComponent,
    BedAllotmentComponent,
    AddEditBedallotmentComponent,
    BedtypeComponent,
    AddEditBedComponent,
    AddEditBedtypeComponent,
  ],
})
export class BedModule {}
