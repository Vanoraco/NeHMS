using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.EmployeeAuth;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAuthsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public EmployeeAuthsController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmployeeAuth employeeAuth)
        {
            if (employeeAuth == null || string.IsNullOrWhiteSpace(employeeAuth.EmailAddress) || string.IsNullOrWhiteSpace(employeeAuth.Password))
            {
                return BadRequest("Username or password is incorrect");
            }

            var employee = _context.EmployeeAuths
                .Include(e => e.Employee)
                .FirstOrDefault(e => e.EmailAddress == employeeAuth.EmailAddress);
            if (employee == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            var hasher = new PasswordHasher<EmployeeAuth>();
            var verificationResult = hasher.VerifyHashedPassword(employee, employee.Password, employeeAuth.Password);
            if (verificationResult == PasswordVerificationResult.Failed)
            {
                return BadRequest("Username or password is incorrect");
            }

            if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
            {
                employee.Password = hasher.HashPassword(employee, employeeAuth.Password);
                await _context.SaveChangesAsync();
            }

            string token = CreateToken(employee);
            string message = "Login Successfully!!";
            return Ok(new { token, message });
        }
        private string CreateToken(EmployeeAuth employeeAuth)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var roleClaimValue = employeeAuth.Employee?.EmployeeRoleId.ToString() ?? string.Empty;
            var identity = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.Email, employeeAuth.EmailAddress ),
            new Claim(ClaimTypes.NameIdentifier, employeeAuth.Id.ToString() ),
            new Claim(ClaimTypes.Role, roleClaimValue ),
            });


            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = identity,
                Expires= DateTime.UtcNow.AddDays(1),
                SigningCredentials= cred
            };
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;

    }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] EmployeeAuth employeeAuth)
        {
            if (employeeAuth == null || string.IsNullOrWhiteSpace(employeeAuth.EmailAddress) || string.IsNullOrWhiteSpace(employeeAuth.Password))
            {
                return BadRequest("Email and password are required");
            }

            var employee = _context.EmployeeAuths.Where(e => e.EmailAddress == employeeAuth.EmailAddress).FirstOrDefault();
            if (employee != null)
            {
                return BadRequest("Email already exists");
            }

            var hasher = new PasswordHasher<EmployeeAuth>();
            employeeAuth.Password = hasher.HashPassword(employeeAuth, employeeAuth.Password);
            //employeeAuth.Active = 1;
            _context.EmployeeAuths.Add(employeeAuth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Register", new { id = employeeAuth.Id }, new { employeeAuth.Id, employeeAuth.EmailAddress });

        }
    }
}







