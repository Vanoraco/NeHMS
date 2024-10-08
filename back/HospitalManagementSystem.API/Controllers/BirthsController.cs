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
    public class BirthsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BirthsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Births
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Birth>>> GetBirths()
        {
            return await _context.Births.ToListAsync();
        }

        // GET: api/Births/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Birth>> GetBirth(int id)
        {
            var birth = await _context.Births.FindAsync(id);

            if (birth == null)
            {
                return NotFound();
            }

            return birth;
        }

        // PUT: api/Births/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBirth(int id, Birth birth)
        {
            if (id != birth.Id)
            {
                return BadRequest();
            }

            _context.Entry(birth).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BirthExists(id))
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

        // POST: api/Births
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Birth>> PostBirth(Birth birth)
        {
            _context.Births.Add(birth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBirth", new { id = birth.Id }, birth);
        }

        // DELETE: api/Births/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBirth(int id)
        {
            var birth = await _context.Births.FindAsync(id);
            if (birth == null)
            {
                return NotFound();
            }

            _context.Births.Remove(birth);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BirthExists(int id)
        {
            return _context.Births.Any(e => e.Id == id);
        }
    }
}
