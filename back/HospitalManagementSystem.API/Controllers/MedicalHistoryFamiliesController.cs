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
    public class MedicalHistoryFamiliesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalHistoryFamiliesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalHistoryFamilies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalHistoryFamily>>> GetMedicalHistoryFamilies()
        {
            return await _context.MedicalHistoryFamilies.ToListAsync();
        }

        // GET: api/MedicalHistoryFamilies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalHistoryFamily>> GetMedicalHistoryFamily(int id)
        {
            var medicalHistoryFamily = await _context.MedicalHistoryFamilies.FindAsync(id);

            if (medicalHistoryFamily == null)
            {
                return NotFound();
            }

            return medicalHistoryFamily;
        }

        // PUT: api/MedicalHistoryFamilies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalHistoryFamily(int id, MedicalHistoryFamily medicalHistoryFamily)
        {
            if (id != medicalHistoryFamily.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalHistoryFamily).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalHistoryFamilyExists(id))
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

        // POST: api/MedicalHistoryFamilies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalHistoryFamily>> PostMedicalHistoryFamily(MedicalHistoryFamily medicalHistoryFamily)
        {
            _context.MedicalHistoryFamilies.Add(medicalHistoryFamily);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalHistoryFamily", new { id = medicalHistoryFamily.Id }, medicalHistoryFamily);
        }

        // DELETE: api/MedicalHistoryFamilies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalHistoryFamily(int id)
        {
            var medicalHistoryFamily = await _context.MedicalHistoryFamilies.FindAsync(id);
            if (medicalHistoryFamily == null)
            {
                return NotFound();
            }

            _context.MedicalHistoryFamilies.Remove(medicalHistoryFamily);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalHistoryFamilyExists(int id)
        {
            return _context.MedicalHistoryFamilies.Any(e => e.Id == id);
        }
    }
}
