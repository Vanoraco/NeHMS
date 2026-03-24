using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    /// <inheritdoc />
    public partial class FixEmployeeRoleIdAndFkWarnings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeRoles_EmployeeRoleId1",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_EyewearPrescriptions_Patients_PatientId1",
                table: "EyewearPrescriptions");

            migrationBuilder.DropIndex(
                name: "IX_EyewearPrescriptions_PatientId1",
                table: "EyewearPrescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeRoleId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "EyewearPrescriptions");

            migrationBuilder.DropColumn(
                name: "EmployeeRoleId1",
                table: "Employees");

            migrationBuilder.Sql(
                "ALTER TABLE \"Employees\" ALTER COLUMN \"EmployeeRoleId\" TYPE integer USING \"EmployeeRoleId\"::integer;");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeRoleId",
                table: "Employees",
                column: "EmployeeRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeRoles_EmployeeRoleId",
                table: "Employees",
                column: "EmployeeRoleId",
                principalTable: "EmployeeRoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeRoles_EmployeeRoleId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeRoleId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "PatientId1",
                table: "EyewearPrescriptions",
                type: "integer",
                nullable: true);

            migrationBuilder.Sql(
                "ALTER TABLE \"Employees\" ALTER COLUMN \"EmployeeRoleId\" TYPE text USING \"EmployeeRoleId\"::text;");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeRoleId1",
                table: "Employees",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EyewearPrescriptions_PatientId1",
                table: "EyewearPrescriptions",
                column: "PatientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeRoleId1",
                table: "Employees",
                column: "EmployeeRoleId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeRoles_EmployeeRoleId1",
                table: "Employees",
                column: "EmployeeRoleId1",
                principalTable: "EmployeeRoles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EyewearPrescriptions_Patients_PatientId1",
                table: "EyewearPrescriptions",
                column: "PatientId1",
                principalTable: "Patients",
                principalColumn: "Id");
        }
    }
}
