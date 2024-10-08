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
    public class AvailablesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AvailablesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Availables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Available>>> GetAvailables()
        {
            return await _context.Availables.ToListAsync();
        }

        // GET: api/Availables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Available>> GetAvailable(int id)
        {
            var available = await _context.Availables.FindAsync(id);

            if (available == null)
            {
                return NotFound();
            }

            return available;
        }

        // PUT: api/Availables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvailable(int id, Available available)
        {
            if (id != available.Id)
            {
                return BadRequest();
            }

            _context.Entry(available).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvailableExists(id))
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

        // POST: api/Availables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Available>> PostAvailable(Available available)
        {
            _context.Availables.Add(available);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAvailable", new { id = available.Id }, available);
        }

        // DELETE: api/Availables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailable(int id)
        {
            var available = await _context.Availables.FindAsync(id);
            if (available == null)
            {
                return NotFound();
            }

            _context.Availables.Remove(available);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvailableExists(int id)
        {
            return _context.Availables.Any(e => e.Id == id);
        }
    }
}
