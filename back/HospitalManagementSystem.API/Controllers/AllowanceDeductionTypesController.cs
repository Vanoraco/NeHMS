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
    public class AllowanceDeductionTypesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AllowanceDeductionTypesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/AllowanceDeductionTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllowanceDeductionType>>> GetAllowanceDeductionTypes()
        {
            return await _context.AllowanceDeductionTypes.ToListAsync();
        }

        // GET: api/AllowanceDeductionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllowanceDeductionType>> GetAllowanceDeductionType(int id)
        {
            var allowanceDeductionType = await _context.AllowanceDeductionTypes.FindAsync(id);

            if (allowanceDeductionType == null)
            {
                return NotFound();
            }

            return allowanceDeductionType;
        }

        // PUT: api/AllowanceDeductionTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllowanceDeductionType(int id, AllowanceDeductionType allowanceDeductionType)
        {
            if (id != allowanceDeductionType.Id)
            {
                return BadRequest();
            }

            _context.Entry(allowanceDeductionType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllowanceDeductionTypeExists(id))
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

        // POST: api/AllowanceDeductionTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AllowanceDeductionType>> PostAllowanceDeductionType(AllowanceDeductionType allowanceDeductionType)
        {
            _context.AllowanceDeductionTypes.Add(allowanceDeductionType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllowanceDeductionType", new { id = allowanceDeductionType.Id }, allowanceDeductionType);
        }

        // DELETE: api/AllowanceDeductionTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllowanceDeductionType(int id)
        {
            var allowanceDeductionType = await _context.AllowanceDeductionTypes.FindAsync(id);
            if (allowanceDeductionType == null)
            {
                return NotFound();
            }

            _context.AllowanceDeductionTypes.Remove(allowanceDeductionType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AllowanceDeductionTypeExists(int id)
        {
            return _context.AllowanceDeductionTypes.Any(e => e.Id == id);
        }
    }
}
