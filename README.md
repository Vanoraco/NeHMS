# NeHMS


The Hospital Management System (HMS) project is focused on creating a comprehensive and simple to use software system to improve the operation of hospitals and other health care institutions. It will address the most important elements of hospital management, provision of services to patients and the efficiency of operations, eliminating barriers between medical, administrative, financial and support structures of the organization.

# Key Features

## Account Management
- Manage accountant records (Add, Update, Delete, Retrieve).
- Secure login and registration for employees (POST /api/EmployeeAuths).
- Employee role management (GET, POST, PUT, DELETE).

## Admissions and Patient Information
- Full admission process, allowing the creation, retrieval, updating, and deletion of admissions.
- Support for multiple admission types and handling allergies for patients.
- Manage patient records including scheduling, medical history, and personal information.

## Medical Operations and Scheduling
- Handle appointment durations and scheduling (for patients and doctors).
- Record and manage laboratory test results, requests, and radiology reports.
- Record surgical operations, track operating room schedules, and manage staff involved.

## Bed and Ward Management
- Manage bed allotments, bed types, and ward assignments for patients.
- Includes room allocation and scheduling.

## Financial Operations
- Manage employee salaries, payroll reports, and tax rules.
- Handle expenses and deductions related to staff and hospital operations.
- Manage revenue from services and categorize service charges.

## Inventory and Pharmacy
- Track inventory supplies, manage medicine stock, and handle pharmacy sales.
- Categorize medicines, manage pharmacy expenses, and interact with suppliers.

## HR and Employee Management
- Track employee details including education, experience, and roles.
- Manage designations, holidays, and work schedules.
- Manage overtime, employee roles, and salary deductions.

## Billing and Payment Systems
- Manage bill schedules, generate bills for lab tests, and track payments.
- Support for various payment options and integration with financial operations.

## Medical Records
- Store and manage medical history (including drugs, allergies, and family history).
- Track medical certificates and department-related activities.
- Track vaccinations and pathology results.

## Notifications and Alerts
- Manage notifications to doctors, nurses, and patients.
- Handle SMS communication (sending and receiving replies via Twilio).

## Security and Permissions
- Handle employee authentication and authorization.
- Define permissions for different user roles (Admin, Doctor, Receptionist).



## API Reference


## Accountants
- **GET** /api/Accountants: Fetch all accountants
- **POST** /api/Accountants: Create a new accountant
- **GET** /api/Accountants/{id}: Get accountant by ID
- **PUT** /api/Accountants/{id}: Update accountant by ID
- **DELETE** /api/Accountants/{id}: Delete accountant by ID

## Admissions
- **GET** /api/Admissions: Fetch all admissions
- **POST** /api/Admissions: Create a new admission
- **GET** /api/Admissions/{id}: Get admission by ID
- **PUT** /api/Admissions/{id}: Update admission by ID
- **DELETE** /api/Admissions/{id}: Delete admission by ID

## Admission Types
- **GET** /api/AdmissionTypes: Fetch all admission types
- **POST** /api/AdmissionTypes: Create a new admission type
- **GET** /api/AdmissionTypes/{id}: Get admission type by ID
- **PUT** /api/AdmissionTypes/{id}: Update admission type by ID
- **DELETE** /api/AdmissionTypes/{id}: Delete admission type by ID

## Allergies
- **GET** /api/Allergies: Fetch all allergies
- **POST** /api/Allergies: Create a new allergy
- **GET** /api/Allergies/{id}: Get allergy by ID
- **PUT** /api/Allergies/{id}: Update allergy by ID
- **DELETE** /api/Allergies/{id}: Delete allergy by ID

## Allowance Deductions
- **GET** /api/AllowanceDeductions: Fetch all allowance deductions
- **POST** /api/AllowanceDeductions: Create a new allowance deduction
- **GET** /api/AllowanceDeductions/{id}: Get allowance deduction by ID
- **PUT** /api/AllowanceDeductions/{id}: Update allowance deduction by ID
- **DELETE** /api/AllowanceDeductions/{id}: Delete allowance deduction by ID

## Allowance Deduction Types
- **GET** /api/AllowanceDeductionTypes: Fetch all allowance deduction types
- **POST** /api/AllowanceDeductionTypes: Create a new allowance deduction type
- **GET** /api/AllowanceDeductionTypes/{id}: Get allowance deduction type by ID
- **PUT** /api/AllowanceDeductionTypes/{id}: Update allowance deduction type by ID
- **DELETE** /api/AllowanceDeductionTypes/{id}: Delete allowance deduction type by ID

## Appointment Durations
- **GET** /api/AppointmentDurations: Fetch all appointment durations
- **POST** /api/AppointmentDurations: Create a new appointment duration
- **GET** /api/AppointmentDurations/{id}: Get appointment duration by ID
- **PUT** /api/AppointmentDurations/{id}: Update appointment duration by ID
- **DELETE** /api/AppointmentDurations/{id}: Delete appointment duration by ID

## Availables
- **GET** /api/Availables: Fetch all availabilities
- **POST** /api/Availables: Create a new availability
- **GET** /api/Availables/{id}: Get availability by ID
- **PUT** /api/Availables/{id}: Update availability by ID
- **DELETE** /api/Availables/{id}: Delete availability by ID

## Bed Allotments
- **GET** /api/BedAllotments: Fetch all bed allotments
- **POST** /api/BedAllotments: Create a new bed allotment
- **GET** /api/BedAllotments/{id}: Get bed allotment by ID
- **PUT** /api/BedAllotments/{id}: Update bed allotment by ID
- **DELETE** /api/BedAllotments/{id}: Delete bed allotment by ID

## Beds
- **GET** /api/Beds: Fetch all beds
- **POST** /api/Beds: Create a new bed
- **GET** /api/Beds/{id}: Get bed by ID
- **PUT** /api/Beds/{id}: Update bed by ID
- **DELETE** /api/Beds/{id}: Delete bed by ID

## Bed Types
- **GET** /api/BedTypes: Fetch all bed types
- **POST** /api/BedTypes: Create a new bed type
- **GET** /api/BedTypes/{id}: Get bed type by ID
- **PUT** /api/BedTypes/{id}: Update bed type by ID
- **DELETE** /api/BedTypes/{id}: Delete bed type by ID

## Bill Labs
- **GET** /api/BillLabs: Fetch all bill labs
- **POST** /api/BillLabs: Create a new bill lab
- **GET** /api/BillLabs/{id}: Get bill lab by ID
- **PUT** /api/BillLabs/{id}: Update bill lab by ID
- **DELETE** /api/BillLabs/{id}: Delete bill lab by ID

## Bill Schedules
- **GET** /api/BillSchedules: Fetch all bill schedules
- **POST** /api/BillSchedules: Create a new bill schedule
- **GET** /api/BillSchedules/{id}: Get bill schedule by ID
- **PUT** /api/BillSchedules/{id}: Update bill schedule by ID
- **DELETE** /api/BillSchedules/{id}: Delete bill schedule by ID

## Births
- **GET** /api/Births: Fetch all birth records
- **POST** /api/Births: Create a new birth record
- **GET** /api/Births/{id}: Get birth record by ID
- **PUT** /api/Births/{id}: Update birth record by ID
- **DELETE** /api/Births/{id}: Delete birth record by ID

## Blood Groups
- **GET** /api/BloodGroups: Fetch all blood groups
- **POST** /api/BloodGroups: Create a new blood group
- **GET** /api/BloodGroups/{id}: Get blood group by ID
- **PUT** /api/BloodGroups/{id}: Update blood group by ID
- **DELETE** /api/BloodGroups/{id}: Delete blood group by ID

## Blood Group Status
- **GET** /api/BloodGroupStatus: Fetch all blood group statuses
- **POST** /api/BloodGroupStatus: Create a new blood group status
- **GET** /api/BloodGroupStatus/{id}: Get blood group status by ID
- **PUT** /api/BloodGroupStatus/{id}: Update blood group status by ID
- **DELETE** /api/BloodGroupStatus/{id}: Delete blood group status by ID

## Buildings
- **GET** /api/Buildings: Fetch all buildings
- **POST** /api/Buildings: Create a new building
- **GET** /api/Buildings/{id}: Get building by ID
- **PUT** /api/Buildings/{id}: Update building by ID
- **DELETE** /api/Buildings/{id}: Delete building by ID

## Cases
- **GET** /api/Cases: Fetch all cases
- **POST** /api/Cases: Create a new case
- **GET** /api/Cases/{id}: Get case by ID
- **PUT** /api/Cases/{id}: Update case by ID
- **DELETE** /api/Cases/{id}: Delete case by ID

## Cities
- **GET** /api/Cities: Fetch all cities

## Countries
- **GET** /api/Countries: Fetch all countries

## Deaths
- **GET** /api/Deaths: Fetch all death records
- **POST** /api/Deaths: Create a new death record
- **GET** /api/Deaths/{id}: Get death record by ID
- **PUT** /api/Deaths/{id}: Update death record by ID
- **DELETE** /api/Deaths/{id}: Delete death record by ID

## Designations
- **GET** /api/Designations: Fetch all designations
- **POST** /api/Designations: Create a new designation
- **GET** /api/Designations/{id}: Get designation by ID
- **PUT** /api/Designations/{id}: Update designation by ID
- **DELETE** /api/Designations/{id}: Delete designation by ID

## Doctors
- **GET** /api/Doctors: Fetch all doctors
- **POST** /api/Doctors: Create a new doctor
- **GET** /api/Doctors/{id}: Get doctor by ID
- **PUT** /api/Doctors/{id}: Update doctor by ID
- **DELETE** /api/Doctors/{id}: Delete doctor by ID

...

## Installation

Install front dependencies with npm

```bash
  npm install
  cd front
  ng serve
```

## Docker Quick Start

Create a `.env` in the repo root with:

```
POSTGRES_DB=HospitalDatabase
POSTGRES_USER=nehms
POSTGRES_PASSWORD=nehms_password
APP_TOKEN=change-me
EMAIL_USER=change-me
EMAIL_PASS=change-me
TWILIO_ACCOUNT_SID=change-me
TWILIO_AUTH_TOKEN=change-me
```

Then run:

```bash
docker compose up -d db
docker compose build api web
docker compose up -d
```

API: `http://localhost:5002/swagger`
Web: `http://localhost:4200`
    
