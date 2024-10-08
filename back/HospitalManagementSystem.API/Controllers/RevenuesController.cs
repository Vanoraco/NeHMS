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
    public class RevenuesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RevenuesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Revenues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Revenue>>> GetRevenues()
        {
            return await _context.Revenues.ToListAsync();
        }

        // GET: api/Revenues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Revenue>> GetRevenue(int id)
        {
            var revenue = await _context.Revenues.FindAsync(id);

            if (revenue == null)
            {
                return NotFound();
            }

            return revenue;
        }

        // PUT: api/Revenues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRevenue(int id, Revenue revenue)
        {
            if (id != revenue.Id)
            {
                return BadRequest();
            }

            _context.Entry(revenue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RevenueExists(id))
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

        // POST: api/Revenues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Revenue>> PostRevenue(Revenue revenue)
        {
            _context.Revenues.Add(revenue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRevenue", new { id = revenue.Id }, revenue);
        }

        // DELETE: api/Revenues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRevenue(int id)
        {
            var revenue = await _context.Revenues.FindAsync(id);
            if (revenue == null)
            {
                return NotFound();
            }

            _context.Revenues.Remove(revenue);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RevenueExists(int id)
        {
            return _context.Revenues.Any(e => e.Id == id);
        }
    }
}
