using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PharmacySalesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PharmacySalesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PharmacySales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PharmacySale>>> GetpharmacySales()
        {
            return await _context.PharmacySales.Include(ps => ps.PharmacyMedStock)
                .Include(ps => ps.Employee)
                
                .ToListAsync();
        }

        // GET: api/PharmacySales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PharmacySale>> GetPharmacySale(int id)
        {
            var pharmacySale = await _context.PharmacySales.FindAsync(id);

            if (pharmacySale == null)
            {
                return NotFound();
            }

            return pharmacySale;
        }

        // PUT: api/PharmacySales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPharmacySale(int id, PharmacySale pharmacySale)
        {
            if (id != pharmacySale.Id)
            {
                return BadRequest();
            }

            _context.Entry(pharmacySale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacySaleExists(id))
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

        // POST: api/PharmacySales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PharmacySale>> PostPharmacySale(PharmacySale pharmacySale)
        {
            _context.PharmacySales.Add(pharmacySale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacySale", new { id = pharmacySale.Id }, pharmacySale);
        }

        // DELETE: api/PharmacySales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacySale(int id)
        {
            var pharmacySale = await _context.PharmacySales.FindAsync(id);
            if (pharmacySale == null)
            {
                return NotFound();
            }

            _context.PharmacySales.Remove(pharmacySale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacySaleExists(int id)
        {
            return _context.PharmacySales.Any(e => e.Id == id);
        }
    }
}
