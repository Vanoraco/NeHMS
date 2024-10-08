using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class EditPatientSchduleRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppointmentDurationId",
                table: "PatientSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScheduleStatusId",
                table: "PatientSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PatientSchedules_AppointmentDurationId",
                table: "PatientSchedules",
                column: "AppointmentDurationId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientSchedules_ScheduleStatusId",
                table: "PatientSchedules",
                column: "ScheduleStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientSchedules_AppointmentDurations_AppointmentDurationId",
                table: "PatientSchedules",
                column: "AppointmentDurationId",
                principalTable: "AppointmentDurations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PatientSchedules_ScheduleStatuses_ScheduleStatusId",
                table: "PatientSchedules",
                column: "ScheduleStatusId",
                principalTable: "ScheduleStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientSchedules_AppointmentDurations_AppointmentDurationId",
                table: "PatientSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_PatientSchedules_ScheduleStatuses_ScheduleStatusId",
                table: "PatientSchedules");

            migrationBuilder.DropIndex(
                name: "IX_PatientSchedules_AppointmentDurationId",
                table: "PatientSchedules");

            migrationBuilder.DropIndex(
                name: "IX_PatientSchedules_ScheduleStatusId",
                table: "PatientSchedules");

            migrationBuilder.DropColumn(
                name: "AppointmentDurationId",
                table: "PatientSchedules");

            migrationBuilder.DropColumn(
                name: "ScheduleStatusId",
                table: "PatientSchedules");
        }
    }
}
