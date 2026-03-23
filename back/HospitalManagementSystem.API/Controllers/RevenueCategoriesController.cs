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
    public class RevenueCategoriesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RevenueCategoriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/RevenueCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RevenueCategory>>> GetRevenueCategorys()
        {
            return await _context.RevenueCategories.ToListAsync();
        }

        // GET: api/RevenueCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RevenueCategory>> GetRevenueCategory(int id)
        {
            var revenueCategory = await _context.RevenueCategories.FindAsync(id);

            if (revenueCategory == null)
            {
                return NotFound();
            }

            return revenueCategory;
        }

        // PUT: api/RevenueCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRevenueCategory(int id, RevenueCategory revenueCategory)
        {
            if (id != revenueCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(revenueCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RevenueCategoryExists(id))
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

        // POST: api/RevenueCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RevenueCategory>> PostRevenueCategory(RevenueCategory revenueCategory)
        {
            _context.RevenueCategories.Add(revenueCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRevenueCategory", new { id = revenueCategory.Id }, revenueCategory);
        }

        // DELETE: api/RevenueCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRevenueCategory(int id)
        {
            var revenueCategory = await _context.RevenueCategories.FindAsync(id);
            if (revenueCategory == null)
            {
                return NotFound();
            }

            _context.RevenueCategories.Remove(revenueCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RevenueCategoryExists(int id)
        {
            return _context.RevenueCategories.Any(e => e.Id == id);
        }
    }
}
