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
    public class RadiologiesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RadiologiesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Radiologies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Radiology>>> GetRadiologies()
        {
            return await _context.Radiologies.ToListAsync();
        }

        // GET: api/Radiologies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Radiology>> GetRadiologies(int id)
        {
            var radiologies = await _context.Radiologies.FindAsync(id);

            if (radiologies == null)
            {
                return NotFound();
            }

            return radiologies;
        }

        // PUT: api/Radiologies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRadiologies(int id, Radiology radiologies)
        {
            if (id != radiologies.Id)
            {
                return BadRequest();
            }

            _context.Entry(radiologies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RadiologyExists(id))
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

        // POST: api/Radiologies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Radiology>> PostRadiologies(Radiology radiologies)
        {
            _context.Radiologies.Add(radiologies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRadiologies", new { id = radiologies.Id }, radiologies);
        }

        // DELETE: api/Radiologies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRadiologies(int id)
        {
            var radiologies = await _context.Radiologies.FindAsync(id);
            if (radiologies == null)
            {
                return NotFound();
            }

            _context.Radiologies.Remove(radiologies);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RadiologyExists(int id)
        {
            return _context.Radiologies.Any(e => e.Id == id);
        }
    }
}
