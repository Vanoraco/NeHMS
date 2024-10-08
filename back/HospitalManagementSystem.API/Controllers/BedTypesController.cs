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
    public class BedTypesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BedTypesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/BedTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BedType>>> GetBedTypes()
        {
            return await _context.BedTypes.ToListAsync();
        }

        // GET: api/BedTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BedType>> GetBedType(int id)
        {
            var bedtype = await _context.BedTypes.FindAsync(id);

            if (bedtype == null)
            {
                return NotFound();
            }

            return bedtype;
        }

        // PUT: api/BedTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBedType(int id, BedType bedtype)
        {
            if (id != bedtype.Id)
            {
                return BadRequest();
            }

            _context.Entry(bedtype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedTypeExists(id))
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

        // POST: api/Bedtypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BedType>> PostBed(BedType bedtype)
        {
            _context.BedTypes.Add(bedtype);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBedType", new { id = bedtype.Id }, bedtype);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBedType(int id)
        {
            var bedtype = await _context.BedTypes.FindAsync(id);
            if (bedtype == null)
            {
                return NotFound();
            }

            _context.BedTypes.Remove(bedtype);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BedTypeExists(int id)
        {
            return _context.BedTypes.Any(e => e.Id == id);
        }
    }
}
