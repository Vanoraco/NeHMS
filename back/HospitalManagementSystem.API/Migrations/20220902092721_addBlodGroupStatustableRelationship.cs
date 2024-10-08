using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class addBlodGroupStatustableRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BloodGroupStatusId",
                table: "BloodGroups",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BloodGroups_BloodGroupStatusId",
                table: "BloodGroups",
                column: "BloodGroupStatusId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BloodGroups_BloodGroupStatuses_BloodGroupStatusId",
                table: "BloodGroups",
                column: "BloodGroupStatusId",
                principalTable: "BloodGroupStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BloodGroups_BloodGroupStatuses_BloodGroupStatusId",
                table: "BloodGroups");

            migrationBuilder.DropIndex(
                name: "IX_BloodGroups_BloodGroupStatusId",
                table: "BloodGroups");

            migrationBuilder.DropColumn(
                name: "BloodGroupStatusId",
                table: "BloodGroups");
        }
    }
}
