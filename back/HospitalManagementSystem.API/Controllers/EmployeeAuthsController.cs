using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.EmployeeAuth;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
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
        public static EmployeeAuth employee = new EmployeeAuth();

        public EmployeeAuthsController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] EmployeeAuth employeeAuth)
        {
            String password = CreatePasswordHash(employeeAuth.Password);
            var employee = _context.EmployeeAuths.Where(e => e.EmailAddress == employeeAuth.EmailAddress && e.Password == password).FirstOrDefault();
            if (employee == null)
            {
                return BadRequest("Username or password is incorrect");
            }
            string token = CreateToken(employeeAuth);
            string message = "Login Successfully!!";
            return Ok(new { token, message });
        }
        private string CreateToken(EmployeeAuth employeeAuth)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var identity = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.Email, employeeAuth.EmailAddress ),
            new Claim(ClaimTypes.NameIdentifier, employeeAuth.Id.ToString() ),
            new Claim(ClaimTypes.Role, employeeAuth.EmployeeId.ToString() ), //role from db
            });


            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = identity,
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials= cred
            };
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;

    }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] EmployeeAuth employeeAuth)
        {
            var employee = _context.EmployeeAuths.Where(e => e.EmailAddress == employeeAuth.EmailAddress).FirstOrDefault();
            if (employee != null)
            {
                return BadRequest("Email already exists");
            }


           //CreatePasswordHash(employeeAuth.Password);

            employeeAuth.Password = CreatePasswordHash(employeeAuth.Password);
            //employeeAuth.Active = 1;
            _context.EmployeeAuths.Add(employeeAuth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Register", new { id = employeeAuth.Id }, employeeAuth);

        }

        private string CreatePasswordHash(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }
    }
}







