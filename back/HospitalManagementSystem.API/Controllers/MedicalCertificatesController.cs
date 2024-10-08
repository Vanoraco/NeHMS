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
    public class MedicalCertificatesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MedicalCertificatesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MedicalCertificates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalCertificate>>> GetMedicalCertificates()
        {
            return await _context.MedicalCertificates.ToListAsync();
        }

        // GET: api/MedicalCertificates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalCertificate>> GetMedicalCertificate(int id)
        {
            var medicalCertificate = await _context.MedicalCertificates.FindAsync(id);

            if (medicalCertificate == null)
            {
                return NotFound();
            }

            return medicalCertificate;
        }

        // PUT: api/MedicalCertificates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalCertificate(int id, MedicalCertificate medicalCertificate)
        {
            if (id != medicalCertificate.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicalCertificate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalCertificateExists(id))
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

        // POST: api/MedicalCertificates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedicalCertificate>> PostMedicalCertificate(MedicalCertificate medicalCertificate)
        {
            _context.MedicalCertificates.Add(medicalCertificate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalCertificate", new { id = medicalCertificate.Id }, medicalCertificate);
        }

        // DELETE: api/MedicalCertificates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalCertificate(int id)
        {
            var medicalCertificate = await _context.MedicalCertificates.FindAsync(id);
            if (medicalCertificate == null)
            {
                return NotFound();
            }

            _context.MedicalCertificates.Remove(medicalCertificate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicalCertificateExists(int id)
        {
            return _context.MedicalCertificates.Any(e => e.Id == id);
        }
    }
}
