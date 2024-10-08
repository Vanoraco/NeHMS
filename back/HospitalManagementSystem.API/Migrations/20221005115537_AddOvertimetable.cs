using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddOvertimetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OvertimeId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "overtimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", maxLength: 50, nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Hours = table.Column<float>(type: "real", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", maxLength: 50, nullable: false),
                    FixedAmount = table.Column<float>(type: "real", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_overtimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_overtimes_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OvertimeId",
                table: "Employees",
                column: "OvertimeId");

            migrationBuilder.CreateIndex(
                name: "IX_overtimes_EmployeeId",
                table: "overtimes",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_overtimes_OvertimeId",
                table: "Employees",
                column: "OvertimeId",
                principalTable: "overtimes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_overtimes_OvertimeId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "overtimes");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OvertimeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OvertimeId",
                table: "Employees");
        }
    }
}
