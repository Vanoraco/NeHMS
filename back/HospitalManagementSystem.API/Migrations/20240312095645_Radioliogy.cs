using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class Radioliogy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Radiologies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", maxLength: 50, nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdmissionId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    OrderedDate = table.Column<DateTime>(type: "datetime2", maxLength: 50, nullable: false),
                    LaboratoryTestCategoryId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    EmployeeId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsCancelled = table.Column<bool>(type: "bit", maxLength: 50, nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Radiologies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Radiologies_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Radiologies_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Radiologies_LaboratoryTestCategories_LaboratoryTestCategoryId",
                        column: x => x.LaboratoryTestCategoryId,
                        principalTable: "LaboratoryTestCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Radiologies_AdmissionId",
                table: "Radiologies",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Radiologies_EmployeeId",
                table: "Radiologies",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Radiologies_LaboratoryTestCategoryId",
                table: "Radiologies",
                column: "LaboratoryTestCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Radiologies");
        }
    }
}
