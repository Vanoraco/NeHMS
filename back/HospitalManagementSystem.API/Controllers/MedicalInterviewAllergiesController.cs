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
    public class MedicalInterviewAllergiesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalInterviewAllergiesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalInterviewAllergies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalInterviewAllergy>>> GetMedicalInterviewAllergies()
        {
            return await _context.MedicalInterviewAllergies.ToListAsync();
        }

        // GET: api/MedicalInterviewAllergies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalInterviewAllergy>> GetMedicalInterviewAllergy(int id)
        {
            var medicalInterviewAllergy = await _context.MedicalInterviewAllergies.FindAsync(id);

            if (medicalInterviewAllergy == null)
            {
                return NotFound();
            }

            return medicalInterviewAllergy;
        }

        // PUT: api/MedicalInterviewAllergies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalInterviewAllergy(int id, MedicalInterviewAllergy medicalInterviewAllergy)
        {
            if (id != medicalInterviewAllergy.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalInterviewAllergy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalInterviewAllergyExists(id))
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

        // POST: api/MedicalInterviewAllergies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalInterviewAllergy>> PostMedicalInterviewAllergy(MedicalInterviewAllergy medicalInterviewAllergy)
        {
            _context.MedicalInterviewAllergies.Add(medicalInterviewAllergy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalInterviewAllergy", new { id = medicalInterviewAllergy.Id }, medicalInterviewAllergy);
        }

        // DELETE: api/MedicalInterviewAllergies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalInterviewAllergy(int id)
        {
            var medicalInterviewAllergy = await _context.MedicalInterviewAllergies.FindAsync(id);
            if (medicalInterviewAllergy == null)
            {
                return NotFound();
            }

            _context.MedicalInterviewAllergies.Remove(medicalInterviewAllergy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalInterviewAllergyExists(int id)
        {
            return _context.MedicalInterviewAllergies.Any(e => e.Id == id);
        }
    }
}
