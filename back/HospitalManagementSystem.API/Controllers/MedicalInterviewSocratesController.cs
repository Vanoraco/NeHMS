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
    public class MedicalInterviewSocratesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalInterviewSocratesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalInterviewSocrates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalInterviewSocrates>>> GetMedicalInterviewSocrates()
        {
            return await _context.MedicalInterviewSocrates.ToListAsync();
        }

        // GET: api/MedicalInterviewSocrates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalInterviewSocrates>> GetMedicalInterviewSocrates(int id)
        {
            var medicalInterviewSocrates = await _context.MedicalInterviewSocrates.FindAsync(id);

            if (medicalInterviewSocrates == null)
            {
                return NotFound();
            }

            return medicalInterviewSocrates;
        }

        // PUT: api/MedicalInterviewSocrates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalInterviewSocrates(int id, MedicalInterviewSocrates medicalInterviewSocrates)
        {
            if (id != medicalInterviewSocrates.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalInterviewSocrates).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalInterviewSocratesExists(id))
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

        // POST: api/MedicalInterviewSocrates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalInterviewSocrates>> PostMedicalInterviewSocrates(MedicalInterviewSocrates medicalInterviewSocrates)
        {
            _context.MedicalInterviewSocrates.Add(medicalInterviewSocrates);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalInterviewSocrates", new { id = medicalInterviewSocrates.Id }, medicalInterviewSocrates);
        }

        // DELETE: api/MedicalInterviewSocrates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalInterviewSocrates(int id)
        {
            var medicalInterviewSocrates = await _context.MedicalInterviewSocrates.FindAsync(id);
            if (medicalInterviewSocrates == null)
            {
                return NotFound();
            }

            _context.MedicalInterviewSocrates.Remove(medicalInterviewSocrates);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalInterviewSocratesExists(int id)
        {
            return _context.MedicalInterviewSocrates.Any(e => e.Id == id);
        }
    }
}
