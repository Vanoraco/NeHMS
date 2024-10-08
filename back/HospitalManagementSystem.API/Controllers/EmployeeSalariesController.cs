using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeSalariesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EmployeeSalariesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeSalaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeSalary>>> GetEmployeeSalaries()
        {
            return await _context.EmployeeSalaries.ToListAsync();
        }

        // GET: api/EmployeeSalaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeSalary>> GetEmployeeSalary(int id)
        {
            var employeeSalary = await _context.EmployeeSalaries.FindAsync(id);

            if (employeeSalary == null)
            {
                return NotFound();
            }

            return employeeSalary;
        }

        // PUT: api/EmployeeSalaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeSalary(int id, EmployeeSalary employeeSalary)
        {
            if (id != employeeSalary.Id)
            {
                return BadRequest();
            }

            _context.Entry(employeeSalary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeSalaryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeSalaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeSalary>> PostEmployeeSalary(EmployeeSalary employeeSalary)
        {
            _context.EmployeeSalaries.Add(employeeSalary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeSalary", new { id = employeeSalary.Id }, employeeSalary);
        }

        // DELETE: api/EmployeeSalaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeSalary(int id)
        {
            var employeeSalary = await _context.EmployeeSalaries.FindAsync(id);
            if (employeeSalary == null)
            {
                return NotFound();
            }

            _context.EmployeeSalaries.Remove(employeeSalary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeSalaryExists(int id)
        {
            return _context.EmployeeSalaries.Any(e => e.Id == id);
        }
    }
}
