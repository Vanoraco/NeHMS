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
    public class BloodGroupStatusController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BloodGroupStatusController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BloodGroupStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodGroupStatus>>> GetBloodGroupStatuses()
        {
            return await _context.BloodGroupStatuses.ToListAsync();
        }

        // GET: api/BloodGroupStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BloodGroupStatus>> GetBloodGroupStatus(int id)
        {
            var bloodGroupStatus = await _context.BloodGroupStatuses.FindAsync(id);

            if (bloodGroupStatus == null)
            {
                return NotFound();
            }

            return bloodGroupStatus;
        }

        // PUT: api/BloodGroupStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBloodGroupStatus(int id, BloodGroupStatus bloodGroupStatus)
        {
            if (id != bloodGroupStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(bloodGroupStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BloodGroupStatusExists(id))
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

        // POST: api/BloodGroupStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BloodGroupStatus>> PostBloodGroupStatus(BloodGroupStatus bloodGroupStatus)
        {
            _context.BloodGroupStatuses.Add(bloodGroupStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBloodGroupStatus", new { id = bloodGroupStatus.Id }, bloodGroupStatus);
        }

        // DELETE: api/BloodGroupStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodGroupStatus(int id)
        {
            var bloodGroupStatus = await _context.BloodGroupStatuses.FindAsync(id);
            if (bloodGroupStatus == null)
            {
                return NotFound();
            }

            _context.BloodGroupStatuses.Remove(bloodGroupStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BloodGroupStatusExists(int id)
        {
            return _context.BloodGroupStatuses.Any(e => e.Id == id);
        }
    }
}
