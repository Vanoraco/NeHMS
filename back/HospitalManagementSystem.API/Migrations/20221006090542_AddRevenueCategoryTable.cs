using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddRevenueCategoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_overtimes_OvertimeId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_overtimes_Employees_EmployeeId",
                table: "overtimes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_overtimes",
                table: "overtimes");

            migrationBuilder.RenameTable(
                name: "overtimes",
                newName: "Overtimes");

            migrationBuilder.RenameIndex(
                name: "IX_overtimes_EmployeeId",
                table: "Overtimes",
                newName: "IX_Overtimes_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Overtimes",
                table: "Overtimes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RevenueCategorys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RevenueCategorys", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Overtimes_OvertimeId",
                table: "Employees",
                column: "OvertimeId",
                principalTable: "Overtimes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Overtimes_Employees_EmployeeId",
                table: "Overtimes",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Overtimes_OvertimeId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Overtimes_Employees_EmployeeId",
                table: "Overtimes");

            migrationBuilder.DropTable(
                name: "RevenueCategorys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Overtimes",
                table: "Overtimes");

            migrationBuilder.RenameTable(
                name: "Overtimes",
                newName: "overtimes");

            migrationBuilder.RenameIndex(
                name: "IX_Overtimes_EmployeeId",
                table: "overtimes",
                newName: "IX_overtimes_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_overtimes",
                table: "overtimes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_overtimes_OvertimeId",
                table: "Employees",
                column: "OvertimeId",
                principalTable: "overtimes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_overtimes_Employees_EmployeeId",
                table: "overtimes",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
