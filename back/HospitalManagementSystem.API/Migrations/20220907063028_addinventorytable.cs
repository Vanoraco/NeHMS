using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class addinventorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_InventorySupplys",
                table: "InventorySupplys");

            migrationBuilder.RenameTable(
                name: "InventorySupplys",
                newName: "InventorySupply");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventorySupply",
                table: "InventorySupply",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", maxLength: 50, nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Quantity = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", maxLength: 50, nullable: false),
                    InventorySupplyId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    EmployeeId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventory_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inventory_InventorySupply_InventorySupplyId",
                        column: x => x.InventorySupplyId,
                        principalTable: "InventorySupply",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_EmployeeId",
                table: "Inventory",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_InventorySupplyId",
                table: "Inventory",
                column: "InventorySupplyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventorySupply",
                table: "InventorySupply");

            migrationBuilder.RenameTable(
                name: "InventorySupply",
                newName: "InventorySupplys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventorySupplys",
                table: "InventorySupplys",
                column: "Id");
        }
    }
}
