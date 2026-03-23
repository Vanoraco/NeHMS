using System;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Controllers;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.Pharmacy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HospitalManagementSystem.API.Tests
{
    public class PharmacySalesControllerTests
    {
        private static DatabaseContext CreateContext()
        {
            var options = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase($"PharmacySales_{Guid.NewGuid()}")
                .Options;
            return new DatabaseContext(options);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenModelInvalid()
        {
            using var context = CreateContext();
            var controller = new PharmacySalesController(context);

            controller.ModelState.AddModelError("Amount", "Required");
            var result = await controller.PostPharmacySale(new PharmacySaleCreateDto());

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }
    }
}
