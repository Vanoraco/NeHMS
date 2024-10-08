export interface Employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  phone: string;
  address: string;
  emailAddress: string;
  genderId: number;
  maritalStatusId: number;
  languageId: number;
  educationLevelId: number;
  employeeRoleId: number;
  medicalDepartmentId: number;
  cityId: number;
  countryId: number;
  designationId: number;
  specializationId: number;
}
export interface Language {
  id: number;
  name: string;
  description: string;
}
export interface Gender {
  id: number;
  name: string;
  description: string;
}
export interface Country {
  id: number;
  name: string;
  description: string;
}
export interface City {
  id: number;
  name: string;
  description: string;
}
export interface MaritalStatus {
  id: number;
  name: string;
  description: string;
}

export interface EmployeeRole {
  id: number;
  name: string;
  description: string;
  permission: string;
}
export interface Designation {
  id: number;
  name: string;
  description: string;
}
export interface MedicalDepartment {
  id: number;
  name: string;
  description: string;
}
export interface Specialization {
  id: number;
  name: string;
  description: string;
}
export interface EducationLevel {
  id: number;
  name: string;
  description: string;
}

export interface Building {
  id: number;
  name: string;
  description: string;
}
