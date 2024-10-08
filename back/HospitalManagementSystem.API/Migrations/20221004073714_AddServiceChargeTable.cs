using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddServiceChargeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "BillSchedules");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "BillLabs");

            migrationBuilder.AddColumn<int>(
                name: "ServiceChargeId",
                table: "BillSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "BillLabs",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServiceChargeId",
                table: "BillLabs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ServiceCharges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCharges", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillSchedules_ServiceChargeId",
                table: "BillSchedules",
                column: "ServiceChargeId");

            migrationBuilder.CreateIndex(
                name: "IX_BillLabs_ServiceChargeId",
                table: "BillLabs",
                column: "ServiceChargeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillLabs_ServiceCharges_ServiceChargeId",
                table: "BillLabs",
                column: "ServiceChargeId",
                principalTable: "ServiceCharges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BillSchedules_ServiceCharges_ServiceChargeId",
                table: "BillSchedules",
                column: "ServiceChargeId",
                principalTable: "ServiceCharges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillLabs_ServiceCharges_ServiceChargeId",
                table: "BillLabs");

            migrationBuilder.DropForeignKey(
                name: "FK_BillSchedules_ServiceCharges_ServiceChargeId",
                table: "BillSchedules");

            migrationBuilder.DropTable(
                name: "ServiceCharges");

            migrationBuilder.DropIndex(
                name: "IX_BillSchedules_ServiceChargeId",
                table: "BillSchedules");

            migrationBuilder.DropIndex(
                name: "IX_BillLabs_ServiceChargeId",
                table: "BillLabs");

            migrationBuilder.DropColumn(
                name: "ServiceChargeId",
                table: "BillSchedules");

            migrationBuilder.DropColumn(
                name: "ServiceChargeId",
                table: "BillLabs");

            migrationBuilder.AddColumn<float>(
                name: "Amount",
                table: "BillSchedules",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "BillLabs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Amount",
                table: "BillLabs",
                type: "real",
                maxLength: 50,
                nullable: false,
                defaultValue: 0f);
        }
    }
}
