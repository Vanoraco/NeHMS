using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class EditePatientPatientScheduleBloodGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Is_Confirmed",
                table: "PatientSchedules");

            migrationBuilder.AddColumn<string>(
                name: "Statues",
                table: "PatientSchedules",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "BloodGroupId",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_BloodGroupId",
                table: "Patients",
                column: "BloodGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_BloodGroups_BloodGroupId",
                table: "Patients",
                column: "BloodGroupId",
                principalTable: "BloodGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_BloodGroups_BloodGroupId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_BloodGroupId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Statues",
                table: "PatientSchedules");

            migrationBuilder.DropColumn(
                name: "BloodGroupId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Patients");

            migrationBuilder.AddColumn<bool>(
                name: "Is_Confirmed",
                table: "PatientSchedules",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
