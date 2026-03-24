using System;
using System.Text.Json;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Controllers;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HospitalManagementSystem.API.Tests
{
    public class PatientSchedulesControllerTests
    {
        private static DatabaseContext CreateContext()
        {
            var options = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase($"PatientSchedules_{Guid.NewGuid()}")
                .Options;
            return new DatabaseContext(options);
        }

        [Fact]
        public async Task Get_ReturnsPagedItems()
        {
            using var context = CreateContext();
            context.PatientSchedules.Add(new PatientSchedule
            {
                PatientId = 1,
                EmployeeId = 1,
                AdmissionTypeId = 1,
                RoomId = 1,
                ScheduleStatusId = 1,
                AppointmentDurationId = 1,
                Statues = "Scheduled"
            });
            context.PatientSchedules.Add(new PatientSchedule
            {
                PatientId = 1,
                EmployeeId = 1,
                AdmissionTypeId = 1,
                RoomId = 1,
                ScheduleStatusId = 1,
                AppointmentDurationId = 1,
                Statues = "Scheduled"
            });
            await context.SaveChangesAsync();

            var controller = new PatientSchedulesController(null, context);
            var result = await controller.GetPatientSchedules(page: 1, pageSize: 1);

            var ok = Assert.IsType<OkObjectResult>(result);
            var json = JsonSerializer.Serialize(ok.Value);
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;
            Assert.Equal(1, root.GetProperty("page").GetInt32());
            Assert.Equal(1, root.GetProperty("pageSize").GetInt32());
            Assert.Equal(2, root.GetProperty("total").GetInt32());
        }
    }
}
