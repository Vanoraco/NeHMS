using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace WebAPICheck.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LabTestResultsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public LabTestResultsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/LabTestResults
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LabTestResult>>> GetLabTestResults()
        {
            if (_context.LabTestResults == null)
            {
                return NotFound();
            }
            return await _context.LabTestResults.ToListAsync();
        }

        // GET: api/LabTestResults/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<LabTestResult>> GetLabTestResult(int id)
        {
            var labTestResult = await _context.LabTestResults.FindAsync(id);

            if (labTestResult == null)
            {
                return NotFound();
            }

            return labTestResult;
        }

        // PUT: api/LabTestResults/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateLabTestResult(int id, LabTestResult labTestResult)
        {
            Console.WriteLine($"Received Id: {id}, LabTestResult: {labTestResult.Id}");
            
            _context.Entry(labTestResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabTestResultExists(id))
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

        // POST: api/LabTestResults
        [HttpPost]
        public async Task<ActionResult<LabTestResult>> PostLabTestResult(LabTestResult labTestResult)
        {
            if (_context.LabTestResults == null)
            {
                return Problem("Entity set 'DatabaseContext.LabTestResults' is null.");
            }

            _context.LabTestResults.Add(labTestResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLabTestResult), new { id = labTestResult.Id }, labTestResult);
        }

        // DELETE: api/LabTestResults/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteLabTestResult(int id)
        {
            var labTestResult = await _context.LabTestResults.FindAsync(id);
            if (labTestResult == null)
            {
                return NotFound();
            }

            _context.LabTestResults.Remove(labTestResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LabTestResultExists(int id)
        {
            return _context.LabTestResults.Any(e => e.Id == id);
        }
    }
}
