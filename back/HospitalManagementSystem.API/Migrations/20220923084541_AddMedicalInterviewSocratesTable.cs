using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddMedicalInterviewSocratesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "MedicalInterviewSocrates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    PainOnSetSide = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainOnSetSuddenGradual = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainOnSetProgressiveRgressive = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainOnSetSideDuration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PainCharacteristics = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainRadiation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainAssociation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainTimeCourse = table.Column<int>(type: "int", nullable: false),
                    PainExacerbatingRelivingFactor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PainSeverity = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalInterviewSocrates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalInterviewSocrates_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

           

            migrationBuilder.CreateIndex(
                name: "IX_MedicalInterviewSocrates_PatientId",
                table: "MedicalInterviewSocrates",
                column: "PatientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.DropTable(
                name: "MedicalInterviewSocrates");

            
        }
    }
}
