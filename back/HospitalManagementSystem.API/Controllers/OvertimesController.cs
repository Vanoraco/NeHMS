using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using Microsoft.AspNetCore.Authorization;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OvertimesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public OvertimesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Overtimes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Overtime>>> Getovertimes()
        {
            return await _context.Overtimes.ToListAsync();
        }

        // GET: api/Overtimes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Overtime>> GetOvertime(int id)
        {
            var overtime = await _context.Overtimes.FindAsync(id);

            if (overtime == null)
            {
                return NotFound();
            }

            return overtime;
        }

        // PUT: api/Overtimes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOvertime(int id, Overtime overtime)
        {
            if (id != overtime.Id)
            {
                return BadRequest();
            }

            _context.Entry(overtime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OvertimeExists(id))
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

        // POST: api/Overtimes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Overtime>> PostOvertime(Overtime overtime)
        {
            _context.Overtimes.Add(overtime);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOvertime", new { id = overtime.Id }, overtime);
        }

        // DELETE: api/Overtimes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOvertime(int id)
        {
            var overtime = await _context.Overtimes.FindAsync(id);
            if (overtime == null)
            {
                return NotFound();
            }

            _context.Overtimes.Remove(overtime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OvertimeExists(int id)
        {
            return _context.Overtimes.Any(e => e.Id == id);
        }
    }
}
