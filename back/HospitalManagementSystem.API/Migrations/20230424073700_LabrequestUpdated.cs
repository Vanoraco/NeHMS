using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class LabrequestUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LaboratoryTestCategoryId",
                table: "LabRequest",
                type: "int",
                maxLength: 50,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_LabRequest_LaboratoryTestCategoryId",
                table: "LabRequest",
                column: "LaboratoryTestCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_LabRequest_LaboratoryTestCategories_LaboratoryTestCategoryId",
                table: "LabRequest",
                column: "LaboratoryTestCategoryId",
                principalTable: "LaboratoryTestCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabRequest_LaboratoryTestCategories_LaboratoryTestCategoryId",
                table: "LabRequest");

            migrationBuilder.DropIndex(
                name: "IX_LabRequest_LaboratoryTestCategoryId",
                table: "LabRequest");

            migrationBuilder.DropColumn(
                name: "LaboratoryTestCategoryId",
                table: "LabRequest");

        }
    }
}
