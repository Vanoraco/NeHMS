using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddVisualAcuityAndIntraocularPressureToPreExamCheckup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "IntraocularPressure",
                table: "PreExamCheckups",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "VisualAcuity",
                table: "PreExamCheckups",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntraocularPressure",
                table: "PreExamCheckups");

            migrationBuilder.DropColumn(
                name: "VisualAcuity",
                table: "PreExamCheckups");
        }
    }
}
