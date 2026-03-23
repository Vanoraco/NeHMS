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
    public class AllowanceDeductionsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AllowanceDeductionsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/AllowanceDeductions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllowanceDeduction>>> GetAllowanceDeductionS()
        {
            return await _context.AllowanceDeductions.ToListAsync();
        }

        // GET: api/AllowanceDeductions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllowanceDeduction>> GetAllowanceDeduction(int id)
        {
            var allowanceDeduction = await _context.AllowanceDeductions.FindAsync(id);

            if (allowanceDeduction == null)
            {
                return NotFound();
            }

            return allowanceDeduction;
        }

        // PUT: api/AllowanceDeductions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllowanceDeduction(int id, AllowanceDeduction allowanceDeduction)
        {
            if (id != allowanceDeduction.Id)
            {
                return BadRequest();
            }

            _context.Entry(allowanceDeduction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllowanceDeductionExists(id))
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

        // POST: api/AllowanceDeductions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AllowanceDeduction>> PostAllowanceDeduction(AllowanceDeduction allowanceDeduction)
        {
            _context.AllowanceDeductions.Add(allowanceDeduction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllowanceDeduction", new { id = allowanceDeduction.Id }, allowanceDeduction);
        }

        // DELETE: api/AllowanceDeductions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllowanceDeduction(int id)
        {
            var allowanceDeduction = await _context.AllowanceDeductions.FindAsync(id);
            if (allowanceDeduction == null)
            {
                return NotFound();
            }

            _context.AllowanceDeductions.Remove(allowanceDeduction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AllowanceDeductionExists(int id)
        {
            return _context.AllowanceDeductions.Any(e => e.Id == id);
        }
    }
}
