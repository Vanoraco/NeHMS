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
    public class TaxRulesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TaxRulesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TaxRules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaxRule>>> GetTaxRules()
        {
            return await _context.TaxRules.ToListAsync();
        }

        // GET: api/TaxRules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaxRule>> GetTaxRule(int id)
        {
            var taxRule = await _context.TaxRules.FindAsync(id);

            if (taxRule == null)
            {
                return NotFound();
            }

            return taxRule;
        }

        // PUT: api/TaxRules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaxRule(int id, TaxRule taxRule)
        {
            if (id != taxRule.Id)
            {
                return BadRequest();
            }

            _context.Entry(taxRule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxRuleExists(id))
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

        // POST: api/TaxRules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaxRule>> PostTaxRule(TaxRule taxRule)
        {
            _context.TaxRules.Add(taxRule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaxRule", new { id = taxRule.Id }, taxRule);
        }

        // DELETE: api/TaxRules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaxRule(int id)
        {
            var taxRule = await _context.TaxRules.FindAsync(id);
            if (taxRule == null)
            {
                return NotFound();
            }

            _context.TaxRules.Remove(taxRule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaxRuleExists(int id)
        {
            return _context.TaxRules.Any(e => e.Id == id);
        }
    }
}
