using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddEyewearPrescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EyewearPrescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RightEyeSphDistant = table.Column<float>(type: "real", nullable: false),
                    RightEyeCylDistant = table.Column<float>(type: "real", nullable: false),
                    RightEyeAxisDistant = table.Column<int>(type: "int", nullable: false),
                    RightEyeSphClose = table.Column<float>(type: "real", nullable: false),
                    RightEyeCylClose = table.Column<float>(type: "real", nullable: false),
                    RightEyeAxisClose = table.Column<int>(type: "int", nullable: false),
                    LeftEyeSphDistant = table.Column<float>(type: "real", nullable: false),
                    LeftEyeCylDistant = table.Column<float>(type: "real", nullable: false),
                    LeftEyeAxisDistant = table.Column<int>(type: "int", nullable: false),
                    LeftEyeSphClose = table.Column<float>(type: "real", nullable: false),
                    LeftEyeCylClose = table.Column<float>(type: "real", nullable: false),
                    LeftEyeAxisClose = table.Column<int>(type: "int", nullable: false),
                    Far = table.Column<float>(type: "real", nullable: false),
                    Near = table.Column<float>(type: "real", nullable: false),
                    PhotoSolar = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    Bifocal = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    Progressive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ScratchResistant = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ResinPlastic = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    GlareFree = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    HiIndex = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    AdmissionId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCancelled = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    PatientId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EyewearPrescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EyewearPrescriptions_Admissions_AdmissionId",
                        column: x => x.AdmissionId,
                        principalTable: "Admissions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EyewearPrescriptions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EyewearPrescriptions_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EyewearPrescriptions_Patients_PatientId1",
                        column: x => x.PatientId1,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EyewearPrescriptions_AdmissionId",
                table: "EyewearPrescriptions",
                column: "AdmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_EyewearPrescriptions_EmployeeId",
                table: "EyewearPrescriptions",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EyewearPrescriptions_PatientId",
                table: "EyewearPrescriptions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_EyewearPrescriptions_PatientId1",
                table: "EyewearPrescriptions",
                column: "PatientId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EyewearPrescriptions");
        }
    }
}
