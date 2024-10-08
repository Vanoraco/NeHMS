using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class LabTestResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LabTestResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Result = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    LabRequestId = table.Column<int>(type: "int", nullable: false),
                    LaboratoryTestTypeId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabTestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LabTestResults_LaboratoryTestTypes_LaboratoryTestTypeId",
                        column: x => x.LaboratoryTestTypeId,
                        principalTable: "LaboratoryTestTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LabTestResults_LabRequest_LabRequestId",
                        column: x => x.LabRequestId,
                        principalTable: "LabRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LabTestResults_LaboratoryTestTypeId",
                table: "LabTestResults",
                column: "LaboratoryTestTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LabTestResults_LabRequestId",
                table: "LabTestResults",
                column: "LabRequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabTestResults");
        }
    }
}
