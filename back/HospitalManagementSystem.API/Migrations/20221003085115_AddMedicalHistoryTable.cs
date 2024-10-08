using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddMedicalHistoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MedicalHistoryDrugs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Symptom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    patientId = table.Column<int>(type: "int", nullable: false),
                    PostMedication = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    RecratioalDrug = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IntravenousDrug = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    OtcDrug = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalHistoryDrugs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalHistoryDrugs_Patients_patientId",
                        column: x => x.patientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedicalHistoryDrugs_patientId",
                table: "MedicalHistoryDrugs",
                column: "patientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalHistoryDrugs");
        }
    }
}
