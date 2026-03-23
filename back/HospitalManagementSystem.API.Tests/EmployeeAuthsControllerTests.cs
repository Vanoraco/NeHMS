using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Controllers;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace HospitalManagementSystem.API.Tests
{
    public class EmployeeAuthsControllerTests
    {
        private static DatabaseContext CreateContext()
        {
            var options = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase($"TestDb_{Guid.NewGuid()}")
                .Options;
            return new DatabaseContext(options);
        }

        private static IConfiguration CreateConfiguration()
        {
            return new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    ["AppSettings:Token"] = "test-secret-key-1234567890-123456"
                })
                .Build();
        }

        private static Employee CreateEmployee()
        {
            return new Employee
            {
                FirstName = "Test",
                MiddleName = "User",
                LastName = "Account",
                DateOfBirth = DateTime.UtcNow.AddYears(-30),
                Age = 30,
                Address = "Test Address",
                Phone = 123456789,
                EmailAddress = "employee@example.com",
                ImageUrl = "test.png",
                GenderId = 1,
                MaritalStatusId = 1,
                LanguageId = 1,
                EducationLevelId = 1,
                EmployeeRoleId = 1,
                MedicalDepartmentId = 1,
                CityId = 1,
                CountryId = 1,
                DesignationId = 1,
                SpecializationId = 1
            };
        }

        private static async Task<Employee> SeedEmployeeAsync(DatabaseContext context, string email)
        {
            var employee = CreateEmployee();
            employee.EmailAddress = email;
            context.Employees.Add(employee);
            await context.SaveChangesAsync();
            return employee;
        }

        [Fact]
        public async Task Register_ReturnsCreated_WithoutPassword()
        {
            using var context = CreateContext();
            var controller = new EmployeeAuthsController(context, CreateConfiguration());

            var employee = await SeedEmployeeAsync(context, "employee.register@example.com");

            var result = await controller.Register(new EmployeeAuth
            {
                EmailAddress = "test.user@example.com",
                Password = "P@ssw0rd!",
                EmployeeId = employee.Id
            });

            var created = Assert.IsType<CreatedAtActionResult>(result);
            var json = JsonSerializer.Serialize(created.Value);

            Assert.Contains("EmailAddress", json, StringComparison.OrdinalIgnoreCase);
            Assert.DoesNotContain("Password", json, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task Login_ReturnsToken_ForValidCredentials()
        {
            using var context = CreateContext();
            var controller = new EmployeeAuthsController(context, CreateConfiguration());

            var employee = await SeedEmployeeAsync(context, "employee.login@example.com");

            var register = await controller.Register(new EmployeeAuth
            {
                EmailAddress = "login.user@example.com",
                Password = "P@ssw0rd!",
                EmployeeId = employee.Id
            });

            Assert.IsType<CreatedAtActionResult>(register);

            var stored = await context.EmployeeAuths.SingleOrDefaultAsync(e => e.EmailAddress == "login.user@example.com");
            Assert.NotNull(stored);

            var hasher = new PasswordHasher<EmployeeAuth>();
            var verification = hasher.VerifyHashedPassword(stored!, stored!.Password, "P@ssw0rd!");
            Assert.NotEqual(PasswordVerificationResult.Failed, verification);

            var queried = context.EmployeeAuths
                .Include(e => e.Employee)
                .FirstOrDefault(e => e.EmailAddress == "login.user@example.com");
            Assert.NotNull(queried);

            var login = await controller.Login(new EmployeeAuth
            {
                EmailAddress = "login.user@example.com",
                Password = "P@ssw0rd!"
            });

            var ok = Assert.IsType<OkObjectResult>(login);
            var json = JsonSerializer.Serialize(ok.Value);

            Assert.Contains("token", json, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_ForInvalidPassword()
        {
            using var context = CreateContext();
            var controller = new EmployeeAuthsController(context, CreateConfiguration());

            var employee = await SeedEmployeeAsync(context, "employee.badpass@example.com");

            var register = await controller.Register(new EmployeeAuth
            {
                EmailAddress = "wrongpass.user@example.com",
                Password = "P@ssw0rd!",
                EmployeeId = employee.Id
            });

            Assert.IsType<CreatedAtActionResult>(register);

            var login = await controller.Login(new EmployeeAuth
            {
                EmailAddress = "wrongpass.user@example.com",
                Password = "WrongPassword"
            });

            Assert.IsType<BadRequestObjectResult>(login);
        }
    }
}
