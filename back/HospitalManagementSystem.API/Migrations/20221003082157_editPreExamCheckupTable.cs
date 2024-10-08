using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class editPreExamCheckupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PreExamCheckups_Patients_PatientId",
                table: "PreExamCheckups");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "PreExamCheckups",
                newName: "AdmissionId");

            migrationBuilder.RenameIndex(
                name: "IX_PreExamCheckups_PatientId",
                table: "PreExamCheckups",
                newName: "IX_PreExamCheckups_AdmissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PreExamCheckups_Admissions_AdmissionId",
                table: "PreExamCheckups",
                column: "AdmissionId",
                principalTable: "Admissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PreExamCheckups_Admissions_AdmissionId",
                table: "PreExamCheckups");

            migrationBuilder.RenameColumn(
                name: "AdmissionId",
                table: "PreExamCheckups",
                newName: "PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_PreExamCheckups_AdmissionId",
                table: "PreExamCheckups",
                newName: "IX_PreExamCheckups_PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_PreExamCheckups_Patients_PatientId",
                table: "PreExamCheckups",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
