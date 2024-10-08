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
    public class AdmissionTypesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AdmissionTypesController(DatabaseContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdmissionType>>> GetAdmissionTypes()
        {
            return await _context.AdmissionTypes.ToListAsync();
        }

        // GET: api/AdmissionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdmissionType>> GetAdmissionType(int id)
        {
            var admissiontype = await _context.AdmissionTypes.FindAsync(id);

            if (admissiontype == null)
            {
                return NotFound();
            }

            return admissiontype;
        }

        // PUT: api/AdmissionTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmissionType(int id, AdmissionType admissiontype)
        {
            if (id != admissiontype.Id)
            {
                return BadRequest();
            }

            _context.Entry(admissiontype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdmissionTypeExists(id))
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

        // POST: api/AdmissionTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdmissionType>> PostAdmissionType(AdmissionType admissiontype)
        {
            _context.AdmissionTypes.Add(admissiontype);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmissionType", new { id = admissiontype.Id }, admissiontype);
        }

        // DELETE: api/AdmissionTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmissionType(int id)
        {
            var admissiontype = await _context.AdmissionTypes.FindAsync(id);
            if (admissiontype == null)
            {
                return NotFound();
            }

            _context.AdmissionTypes.Remove(admissiontype);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdmissionTypeExists(int id)
        {
            return _context.AdmissionTypes.Any(e => e.Id == id);
        }
    }
}
