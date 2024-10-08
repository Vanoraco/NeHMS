using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class EditModelRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_BillLabs_BillLabId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Overtimes_OvertimeId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_BillLabId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OvertimeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "BillLabId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OvertimeId",
                table: "Employees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BillLabId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OvertimeId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_BillLabId",
                table: "Employees",
                column: "BillLabId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OvertimeId",
                table: "Employees",
                column: "OvertimeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_BillLabs_BillLabId",
                table: "Employees",
                column: "BillLabId",
                principalTable: "BillLabs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Overtimes_OvertimeId",
                table: "Employees",
                column: "OvertimeId",
                principalTable: "Overtimes",
                principalColumn: "Id");
        }
    }
}
