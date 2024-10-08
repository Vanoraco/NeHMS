using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class EditAuthenticationPasswordAndRelationshipp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAuths_EmployeeId",
                table: "EmployeeAuths",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeAuths_Employees_EmployeeId",
                table: "EmployeeAuths",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAuths_Employees_EmployeeId",
                table: "EmployeeAuths");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAuths_EmployeeId",
                table: "EmployeeAuths");
        }
    }
}
