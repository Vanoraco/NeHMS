using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.Pharmacy;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PharmacyExpensesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PharmacyExpensesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PharmacyExpenses
        [HttpGet]
        public async Task<ActionResult> GetPharmacyExpenses([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 25 : pageSize;
            pageSize = pageSize > 100 ? 100 : pageSize;

            var query = _context.PharmacyExpenses.OrderBy(p => p.Id);
            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { items, page, pageSize, total });
        }

        // GET: api/PharmacyExpenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PharmacyExpense>> GetPharmacyExpense(int id)
        {
            var pharmacyExpense = await _context.PharmacyExpenses.FindAsync(id);

            if (pharmacyExpense == null)
            {
                return NotFound();
            }

            return pharmacyExpense;
        }

        // PUT: api/PharmacyExpenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPharmacyExpense(int id, PharmacyExpenseUpdateDto pharmacyExpense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id <= 0)
            {
                return BadRequest();
            }

            var entity = new PharmacyExpense
            {
                Id = id,
                PharmacyExpenseCatagoryId = pharmacyExpense.PharmacyExpenseCatagoryId,
                Amount = pharmacyExpense.Amount,
                Date = pharmacyExpense.Date,
                Description = pharmacyExpense.Description
            };

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacyExpenseExists(id))
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

        // POST: api/PharmacyExpenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PharmacyExpense>> PostPharmacyExpense(PharmacyExpenseCreateDto pharmacyExpense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = new PharmacyExpense
            {
                PharmacyExpenseCatagoryId = pharmacyExpense.PharmacyExpenseCatagoryId,
                Amount = pharmacyExpense.Amount,
                Date = pharmacyExpense.Date,
                Description = pharmacyExpense.Description
            };

            _context.PharmacyExpenses.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacyExpense", new { id = entity.Id }, entity);
        }

        // DELETE: api/PharmacyExpenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacyExpense(int id)
        {
            var pharmacyExpense = await _context.PharmacyExpenses.FindAsync(id);
            if (pharmacyExpense == null)
            {
                return NotFound();
            }

            _context.PharmacyExpenses.Remove(pharmacyExpense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacyExpenseExists(int id)
        {
            return _context.PharmacyExpenses.Any(e => e.Id == id);
        }
    }
}
