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
    public class ExpenseCatagoriesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ExpenseCatagoriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ExpenseCatagories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseCatagory>>> GetExpenseCatagories()
        {
            return await _context.ExpenseCategories.ToListAsync();
        }

        // GET: api/ExpenseCatagories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseCatagory>> GetExpenseCatagory(int id)
        {
            var expenseCatagory = await _context.ExpenseCategories.FindAsync(id);

            if (expenseCatagory == null)
            {
                return NotFound();
            }

            return expenseCatagory;
        }

        // PUT: api/ExpenseCatagories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenseCatagory(int id, ExpenseCatagory expenseCatagory)
        {
            if (id != expenseCatagory.Id)
            {
                return BadRequest();
            }

            _context.Entry(expenseCatagory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseCatagoryExists(id))
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

        // POST: api/ExpenseCatagories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExpenseCatagory>> PostExpenseCatagory(ExpenseCatagory expenseCatagory)
        {
            _context.ExpenseCategories.Add(expenseCatagory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenseCatagory", new { id = expenseCatagory.Id }, expenseCatagory);
        }

        // DELETE: api/ExpenseCatagories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpenseCatagory(int id)
        {
            var expenseCatagory = await _context.ExpenseCategories.FindAsync(id);
            if (expenseCatagory == null)
            {
                return NotFound();
            }

            _context.ExpenseCategories.Remove(expenseCatagory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseCatagoryExists(int id)
        {
            return _context.ExpenseCategories.Any(e => e.Id == id);
        }
    }
}
