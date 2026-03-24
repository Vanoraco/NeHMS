using System;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Controllers;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.Pharmacy;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
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

        [Fact]
        public async Task Get_ReturnsPagedItems()
        {
            using var context = CreateContext();
            context.PharmacySales.Add(new PharmacySale { Amount = 1, Price = 1, PharmacyMedStockId = 1, EmployeeId = 1 });
            context.PharmacySales.Add(new PharmacySale { Amount = 2, Price = 1, PharmacyMedStockId = 1, EmployeeId = 1 });
            await context.SaveChangesAsync();

            var controller = new PharmacySalesController(context);
            var result = await controller.GetpharmacySales(page: 1, pageSize: 1);

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
