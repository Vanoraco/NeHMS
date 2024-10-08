using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementSystem.API.Migrations
{
    public partial class AddSeedDataToSchdulestatusTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO ScheduleStatuses (Name) VALUES ('Pending Confirmation')");
            migrationBuilder.Sql("INSERT INTO ScheduleStatuses (Name) VALUES ('Confirmed')");
            migrationBuilder.Sql("INSERT INTO ScheduleStatuses (Name) VALUES ('Treated')");
            migrationBuilder.Sql("INSERT INTO ScheduleStatuses (Name) VALUES ('Cancelled')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
