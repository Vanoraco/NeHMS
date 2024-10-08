import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  PatientList$: Observable<any[]>;
  educationLevelList$: Observable<any[]>;
  genderList$: Observable<any[]>;
  maritalStatusList$: Observable<any[]>;
  countryList$: Observable<any[]>;
  languagesList$: Observable<any[]>;
  bloodGroupList$: Observable<any[]>;
  citiesList$: Observable<any[]>;

  selectImageFromWebCam: boolean = false;
  selectImageFromFile: boolean = false;
  imageFile: any;
  imageFileName: string;

  progress: number;
  message: string;
  response: { dbPath: '' };
  url = 'assets/img/profile-img.jpg';

  @Output() public onUploadFinished = new EventEmitter();

  @Input() PatientList: any;
  id: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  phone: string = '';
  dateOfBirth: number = 0;
  age: number = 0;
  email: string = '';
  imageUrl: string = '';
  educationLevelId: number = 0;
  address: string = '';
  countryId = 0;
  cityId = 0;
  genderId: number = 0;
  maritalStatusId: number = 0;
  languageId: number = 0;
  is_decessed = true;
  bloodGroupId: number = 0;

  constructor(
    private patientService: PatientService,
    private toast: NgToastService,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.id = this.PatientList.id;
    this.firstName = this.PatientList.firstName;
    this.middleName = this.PatientList.middleName;
    this.lastName = this.PatientList.lastName;
    this.dateOfBirth = this.PatientList.dateOfBirth;
    this.age = this.PatientList.age;
    this.phone = this.PatientList.phone;
    this.email = this.PatientList.email;
    this.educationLevelId = this.PatientList.educationLevelId;
    this.address = this.PatientList.address;
    this.countryId = this.PatientList.countryId;
    this.cityId = this.PatientList.cityId;
    this.genderId = this.PatientList.genderId;
    this.maritalStatusId = this.PatientList.maritalStatusId;
    this.languageId = this.PatientList.languageId;
    this.is_decessed = true;
    this.bloodGroupId = this.PatientList.bloodGroupId;
    this.imageUrl = this.PatientList.imageUrl;

    this.educationLevelList$ = this.empService.getEducationLevels();
    this.languagesList$ = this.empService.getLanguages();
    this.PatientList$ = this.patientService.getPatientApi();
    this.genderList$ = this.empService.getGenders();
    this.citiesList$ = this.empService.getCities();
    this.maritalStatusList$ = this.empService.getMaritalStatuses();
    this.countryList$ = this.empService.getCountries();
    this.bloodGroupList$ = this.empService.getBloodGroupApi();
  }

  currentDate: Date = new Date();
  ageCalculation() {
    const fullYear = this.currentDate.getFullYear();
    const dob = new Date(this.dateOfBirth).getFullYear();
    this.age = fullYear - dob;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  addPatient() {
    var mypatient = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      age: +this.age,
      phone: this.phone,
      email: this.email,
      educationLevelId: +this.educationLevelId,
      address: this.address,
      countryId: +this.countryId,
      cityId: +this.cityId,
      genderId: +this.genderId,
      maritalStatusId: +this.maritalStatusId,
      languageId: +this.languageId,
      is_decessed: true,
      bloodGroupId: +this.bloodGroupId,
      imageUrl: this.imageUrl,
    };
    console.log(mypatient);
    this.patientService.addPatientApi(mypatient).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary:
          mypatient.firstName +
          ' ' +
          mypatient.lastName +
          ' Sucessfully Added!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.PatientList$ = this.patientService.getPatientApi();
    });
  }

  updatePatient() {
    var mypatient = {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      age: this.age,
      email: this.email,
      educationLevelId: this.educationLevelId,
      address: this.address,
      countryId: this.countryId,
      cityId: this.cityId,
      genderId: this.genderId,
      maritalStatusId: this.maritalStatusId,
      languageId: this.languageId,
      is_decessed: true,
      bloodGroupId: this.bloodGroupId,
      imageUrl: this.imageUrl,
    };
    var id: number = this.id;
    console.log(mypatient);

    this.patientService.updatePatientApi(id, mypatient).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary:
          mypatient.firstName +
          ' ' +
          mypatient.lastName +
          ' Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.PatientList$ = this.patientService.getPatientApi();
    });
  }

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  public getSnapshot(): void {
    this.selectImageFromWebCam = true;
    this.selectImageFromFile = false;
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.imageFile = this.convertImageToBlob(webcamImage!.imageAsDataUrl);
    this.imageFileName = 'Webcam_image_' + Date.now() + '.jpg';
  }

  private convertImageToBlob(dataUrl: string): Blob {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  onSelect(event) {
    this.selectImageFromFile = true;
    this.selectImageFromWebCam = false;
    this.imageFile = event.target.files[0];
    this.imageFileName = 'File_image_' + Date.now() + '.jpg';
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

  upload() {
    if (this.imageFile.length === 0) {
      return;
    }
    this.patientService
      .addPatientImageApi(this.imageFile, this.imageFileName)
      .subscribe((res: any) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.message,
          duration: 4000,
        });
        this.imageUrl = res.dbPath;
      });
  }

  uploadFinished = (event) => {
    this.response = event;
  };
}
