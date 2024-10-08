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
    public class MedicalHistoryDrugsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalHistoryDrugsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalHistoryDrugs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalHistoryDrug>>> GetMedicalHistoryDrugs()
        {
            return await _context.MedicalHistoryDrugs.ToListAsync();
        }

        // GET: api/MedicalHistoryDrugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalHistoryDrug>> GetMedicalHistoryDrug(int id)
        {
            var medicalHistoryDrug = await _context.MedicalHistoryDrugs.FindAsync(id);

            if (medicalHistoryDrug == null)
            {
                return NotFound();
            }

            return medicalHistoryDrug;
        }

        // PUT: api/MedicalHistoryDrugs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalHistoryDrug(int id, MedicalHistoryDrug medicalHistoryDrug)
        {
            if (id != medicalHistoryDrug.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalHistoryDrug).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalHistoryDrugExists(id))
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

        // POST: api/MedicalHistoryDrugs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalHistoryDrug>> PostMedicalHistoryDrug(MedicalHistoryDrug medicalHistoryDrug)
        {
            _context.MedicalHistoryDrugs.Add(medicalHistoryDrug);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalHistoryDrug", new { id = medicalHistoryDrug.Id }, medicalHistoryDrug);
        }

        // DELETE: api/MedicalHistoryDrugs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalHistoryDrug(int id)
        {
            var medicalHistoryDrug = await _context.MedicalHistoryDrugs.FindAsync(id);
            if (medicalHistoryDrug == null)
            {
                return NotFound();
            }

            _context.MedicalHistoryDrugs.Remove(medicalHistoryDrug);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalHistoryDrugExists(int id)
        {
            return _context.MedicalHistoryDrugs.Any(e => e.Id == id);
        }
    }
}
