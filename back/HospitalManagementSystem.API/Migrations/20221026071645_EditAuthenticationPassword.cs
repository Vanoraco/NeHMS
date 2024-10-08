using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class EditAuthenticationPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "EmployeeAuths");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "EmployeeAuths");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "EmployeeAuths",
                type: "nvarchar(max)",
                nullable: true);

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
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAuths_Employees_EmployeeId",
                table: "EmployeeAuths");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAuths_EmployeeId",
                table: "EmployeeAuths");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "EmployeeAuths");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "EmployeeAuths",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "EmployeeAuths",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
