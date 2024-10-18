using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EyewearPrescriptionController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EyewearPrescriptionController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/EyewearPrescription
        [HttpGet]
        [SwaggerOperation(Summary = "Get all eyewear prescriptions", Description = "Retrieves a list of all eyewear prescriptions in the system.")]
        [ProducesResponseType(typeof(IEnumerable<EyewearPrescription>), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<EyewearPrescription>>> GetEyewearPrescriptions()
        {
            return await _context.EyewearPrescriptions
                                 .Include(e => e.Patient)
                                 .Include(e => e.Employee)
                                 .ToListAsync();
        }

        // GET: api/EyewearPrescription/{id}
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Get a specific eyewear prescription", Description = "Retrieves a specific eyewear prescription by its unique ID.")]
        [ProducesResponseType(typeof(EyewearPrescription), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<EyewearPrescription>> GetEyewearPrescription(int id)
        {
            var eyewearPrescription = await _context.EyewearPrescriptions
                                                    .Include(e => e.Patient)
                                                    .Include(e => e.Employee)
                                                    .FirstOrDefaultAsync(e => e.Id == id);

            if (eyewearPrescription == null)
            {
                return NotFound();
            }

            return eyewearPrescription;
        }

        // POST: api/EyewearPrescription
        [HttpPost]
        [SwaggerOperation(Summary = "Create a new eyewear prescription", Description = "Creates a new eyewear prescription for a patient.")]
        [ProducesResponseType(typeof(EyewearPrescription), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<EyewearPrescription>> PostEyewearPrescription(EyewearPrescription eyewearPrescription)
        {
            _context.EyewearPrescriptions.Add(eyewearPrescription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEyewearPrescription), new { id = eyewearPrescription.Id }, eyewearPrescription);
        }

        // PUT: api/EyewearPrescription/{id}
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Update an existing eyewear prescription", Description = "Updates the details of an existing eyewear prescription.")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> PutEyewearPrescription(int id, EyewearPrescription eyewearPrescription)
        {
            if (id != eyewearPrescription.Id)
            {
                return BadRequest();
            }

            _context.Entry(eyewearPrescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EyewearPrescriptionExists(id))
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

        // DELETE: api/EyewearPrescription/{id}
        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Delete an eyewear prescription", Description = "Deletes an eyewear prescription by its unique ID.")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteEyewearPrescription(int id)
        {
            var eyewearPrescription = await _context.EyewearPrescriptions.FindAsync(id);
            if (eyewearPrescription == null)
            {
                return NotFound();
            }

            _context.EyewearPrescriptions.Remove(eyewearPrescription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EyewearPrescriptionExists(int id)
        {
            return _context.EyewearPrescriptions.Any(e => e.Id == id);
        }
    }
}