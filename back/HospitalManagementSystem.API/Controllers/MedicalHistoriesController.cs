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
    public class MedicalHistoriesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalHistoriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalHistory>>> GetMedicalHistorys()
        {
            return await _context.MedicalHistories.ToListAsync();
        }

        // GET: api/MedicalHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalHistory>> GetMedicalHistory(int id)
        {
            var medicalHistory = await _context.MedicalHistories.FindAsync(id);

            if (medicalHistory == null)
            {
                return NotFound();
            }

            return medicalHistory;
        }

        // PUT: api/MedicalHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalHistory(int id, MedicalHistory medicalHistory)
        {
            if (id != medicalHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalHistoryExists(id))
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

        // POST: api/MedicalHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalHistory>> PostMedicalHistory(MedicalHistory medicalHistory)
        {
            _context.MedicalHistories.Add(medicalHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalHistory", new { id = medicalHistory.Id }, medicalHistory);
        }

        // DELETE: api/MedicalHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalHistory(int id)
        {
            var medicalHistory = await _context.MedicalHistories.FindAsync(id);
            if (medicalHistory == null)
            {
                return NotFound();
            }

            _context.MedicalHistories.Remove(medicalHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalHistoryExists(int id)
        {
            return _context.MedicalHistories.Any(e => e.Id == id);
        }
    }
}
