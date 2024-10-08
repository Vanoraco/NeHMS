import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-allergy',
  templateUrl: './add-edit-allergy.component.html',
  styleUrls: ['./add-edit-allergy.component.css']
})
export class AddEditAllergyComponent implements OnInit {
  allergyList$: any;
  constructor(private allergyService: PatientService,
    private toast: NgToastService

    ) { }
  @Input() allergyList: any;
  id: number = 0;
  name: string = "";
  description: string="";
  ngOnInit(): void {
    this.allergyList$ = this.allergyService.getAllergyApi();
    this.id = this.allergyList.id;
    this.name = this.allergyList.name;
    this.description= this.allergyList.description;
  }
  addAllergy() {
    var allergiesList = {
      name: this.name,
      description: this.description,

    };
    console.log(allergiesList);
    this.allergyService.addAllergyApi(allergiesList).subscribe((res) => {
      var closeModalBtn = document.getElementById('allergy-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    }

    );
  }
  updateAllergy() {
    var allergy = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.allergyService.updateAllergyApi(id, allergy).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('allergy-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    },
    (err) => {
      this.toast.error({
        detail: 'Error',
        summary: 'Something went wrong!',
        duration: 4000,
      });
    });
  }
}
