using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddAllowanceDeductionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AllowanceDeductionS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Month = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FixedAmount = table.Column<float>(type: "real", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    AllowanceDeductionTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowanceDeductionS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AllowanceDeductionS_AllowanceDeductionTypes_AllowanceDeductionTypeId",
                        column: x => x.AllowanceDeductionTypeId,
                        principalTable: "AllowanceDeductionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllowanceDeductionS_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceDeductionS_AllowanceDeductionTypeId",
                table: "AllowanceDeductionS",
                column: "AllowanceDeductionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceDeductionS_EmployeeId",
                table: "AllowanceDeductionS",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllowanceDeductionS");
        }
    }
}
