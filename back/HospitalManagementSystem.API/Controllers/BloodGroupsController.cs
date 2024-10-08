using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BloodGroupsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BloodGroupsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BloodGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodGroup>>> GetBloodGroups()
        {
            return await _context.BloodGroups.ToListAsync();
        }

        // GET: api/BloodGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BloodGroup>> GetBloodGroup(int id)
        {
            var bloodgroup = await _context.BloodGroups.FindAsync(id);

            if (bloodgroup == null)
            {
                return NotFound();
            }

            return bloodgroup;
        }

        // PUT: api/BloodGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBirth(int id, BloodGroup bloodgroup)
        {
            if (id != bloodgroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(bloodgroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BloodGroupExists(id))
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

        // POST: api/BloodGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BloodGroup>> PostBloodGroup(BloodGroup bloodgroup)
        {
            _context.BloodGroups.Add(bloodgroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBloodGroup", new { id = bloodgroup.Id }, bloodgroup);
        }

        // DELETE: api/BloodGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodGroup(int id)
        {
            var bloodgroup = await _context.BloodGroups.FindAsync(id);
            if (bloodgroup == null)
            {
                return NotFound();
            }

            _context.BloodGroups.Remove(bloodgroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BloodGroupExists(int id)
        {
            return _context.BloodGroups.Any(e => e.Id == id);
        }
    }
}