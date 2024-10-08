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
    public class BedAllotmentsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BedAllotmentsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BedAllotments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BedAllotment>>> GetBedAllotments()
        {
            return await _context.BedAllotments.ToListAsync();
        }

        // GET: api/BedAllotments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BedAllotment>> GetBedAllotment(int id)
        {
            var bedAllotment = await _context.BedAllotments.FindAsync(id);

            if (bedAllotment == null)
            {
                return NotFound();
            }

            return bedAllotment;
        }

        // PUT: api/BedAllotments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBedAllotment(int id, BedAllotment bedAllotment)
        {
            if (id != bedAllotment.Id)
            {
                return BadRequest();
            }

            _context.Entry(bedAllotment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedAllotmentExists(id))
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

        // POST: api/BedAllotments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BedAllotment>> PostBedAllotment(BedAllotment bedAllotment)
        {
            _context.BedAllotments.Add(bedAllotment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBedAllotment", new { id = bedAllotment.Id }, bedAllotment);
        }

        // DELETE: api/BedAllotments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBedAllotment(int id)
        {
            var bedAllotment = await _context.BedAllotments.FindAsync(id);
            if (bedAllotment == null)
            {
                return NotFound();
            }

            _context.BedAllotments.Remove(bedAllotment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BedAllotmentExists(int id)
        {
            return _context.BedAllotments.Any(e => e.Id == id);
        }
    }
}
