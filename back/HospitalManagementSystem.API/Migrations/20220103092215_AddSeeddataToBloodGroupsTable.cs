using Microsoft.EntityFrameworkCore.Migrations;

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddSeeddataToBloodGroupsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE * FROM BloodGroups");
        }
    }
}
