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
    public class PreExamCheckupsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PreExamCheckupsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PreExamCheckups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PreExamCheckup>>> GetPreExamCheckups()
        {
            return await _context.PreExamCheckups.ToListAsync();
        }

        // GET: api/PreExamCheckups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PreExamCheckup>> GetPreExamCheckup(int id)
        {
            var preExamCheckup = await _context.PreExamCheckups.FindAsync(id);

            if (preExamCheckup == null)
            {
                return NotFound();
            }

            return preExamCheckup;
        }

        // PUT: api/PreExamCheckups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPreExamCheckup(int id, PreExamCheckup preExamCheckup)
        {
            if (id != preExamCheckup.Id)
            {
                return BadRequest();
            }

            _context.Entry(preExamCheckup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PreExamCheckupExists(id))
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

        // POST: api/PreExamCheckups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PreExamCheckup>> PostPreExamCheckup(PreExamCheckup preExamCheckup)
        {
            _context.PreExamCheckups.Add(preExamCheckup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPreExamCheckup", new { id = preExamCheckup.Id }, preExamCheckup);
        }

        // DELETE: api/PreExamCheckups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePreExamCheckup(int id)
        {
            var preExamCheckup = await _context.PreExamCheckups.FindAsync(id);
            if (preExamCheckup == null)
            {
                return NotFound();
            }

            _context.PreExamCheckups.Remove(preExamCheckup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PreExamCheckupExists(int id)
        {
            return _context.PreExamCheckups.Any(e => e.Id == id);
        }
    }
}
