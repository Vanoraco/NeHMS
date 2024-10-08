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
    public class PharmacyExpenseCatagoriesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PharmacyExpenseCatagoriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PharmacyExpenseCatagories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PharmacyExpenseCatagory>>> GetPharmacyExpenseCatagorys()
        {
            return await _context.PharmacyExpenseCatagorys.ToListAsync();
        }

        // GET: api/PharmacyExpenseCatagories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PharmacyExpenseCatagory>> GetPharmacyExpenseCatagory(int id)
        {
            var pharmacyExpenseCatagory = await _context.PharmacyExpenseCatagorys.FindAsync(id);

            if (pharmacyExpenseCatagory == null)
            {
                return NotFound();
            }

            return pharmacyExpenseCatagory;
        }

        // PUT: api/PharmacyExpenseCatagories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPharmacyExpenseCatagory(int id, PharmacyExpenseCatagory pharmacyExpenseCatagory)
        {
            if (id != pharmacyExpenseCatagory.Id)
            {
                return BadRequest();
            }

            _context.Entry(pharmacyExpenseCatagory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacyExpenseCatagoryExists(id))
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

        // POST: api/PharmacyExpenseCatagories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PharmacyExpenseCatagory>> PostPharmacyExpenseCatagory(PharmacyExpenseCatagory pharmacyExpenseCatagory)
        {
            _context.PharmacyExpenseCatagorys.Add(pharmacyExpenseCatagory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacyExpenseCatagory", new { id = pharmacyExpenseCatagory.Id }, pharmacyExpenseCatagory);
        }

        // DELETE: api/PharmacyExpenseCatagories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacyExpenseCatagory(int id)
        {
            var pharmacyExpenseCatagory = await _context.PharmacyExpenseCatagorys.FindAsync(id);
            if (pharmacyExpenseCatagory == null)
            {
                return NotFound();
            }

            _context.PharmacyExpenseCatagorys.Remove(pharmacyExpenseCatagory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacyExpenseCatagoryExists(int id)
        {
            return _context.PharmacyExpenseCatagorys.Any(e => e.Id == id);
        }
    }
}
