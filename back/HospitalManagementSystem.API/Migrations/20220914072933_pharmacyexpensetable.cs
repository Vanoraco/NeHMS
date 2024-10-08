using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class pharmacyexpensetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_Employees_EmployeeId",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_InventorySupply_InventorySupplyId",
                table: "Inventory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventorySupply",
                table: "InventorySupply");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inventory",
                table: "Inventory");

            migrationBuilder.RenameTable(
                name: "InventorySupply",
                newName: "InventorySupplys");

            migrationBuilder.RenameTable(
                name: "Inventory",
                newName: "Inventorys");

            migrationBuilder.RenameIndex(
                name: "IX_Inventory_InventorySupplyId",
                table: "Inventorys",
                newName: "IX_Inventorys_InventorySupplyId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventory_EmployeeId",
                table: "Inventorys",
                newName: "IX_Inventorys_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventorySupplys",
                table: "InventorySupplys",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inventorys",
                table: "Inventorys",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "PharmacyExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", maxLength: 50, nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PharmacyExpenseCatagoryId = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Amount = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmacyExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PharmacyExpenses_PharmacyExpenseCatagorys_PharmacyExpenseCatagoryId",
                        column: x => x.PharmacyExpenseCatagoryId,
                        principalTable: "PharmacyExpenseCatagorys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PharmacyExpenses_PharmacyExpenseCatagoryId",
                table: "PharmacyExpenses",
                column: "PharmacyExpenseCatagoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_Employees_EmployeeId",
                table: "Inventorys",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_InventorySupplys_InventorySupplyId",
                table: "Inventorys",
                column: "InventorySupplyId",
                principalTable: "InventorySupplys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_Employees_EmployeeId",
                table: "Inventorys");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_InventorySupplys_InventorySupplyId",
                table: "Inventorys");

            migrationBuilder.DropTable(
                name: "PharmacyExpenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventorySupplys",
                table: "InventorySupplys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inventorys",
                table: "Inventorys");

            migrationBuilder.RenameTable(
                name: "InventorySupplys",
                newName: "InventorySupply");

            migrationBuilder.RenameTable(
                name: "Inventorys",
                newName: "Inventory");

            migrationBuilder.RenameIndex(
                name: "IX_Inventorys_InventorySupplyId",
                table: "Inventory",
                newName: "IX_Inventory_InventorySupplyId");

            migrationBuilder.RenameIndex(
                name: "IX_Inventorys_EmployeeId",
                table: "Inventory",
                newName: "IX_Inventory_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventorySupply",
                table: "InventorySupply",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inventory",
                table: "Inventory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_Employees_EmployeeId",
                table: "Inventory",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_InventorySupply_InventorySupplyId",
                table: "Inventory",
                column: "InventorySupplyId",
                principalTable: "InventorySupply",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
