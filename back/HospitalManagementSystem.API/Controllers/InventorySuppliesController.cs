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
    public class InventorySuppliesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public InventorySuppliesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/InventorySupplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventorySupply>>> GetInventorySupplys()
        {
            return await _context.InventorySupplys.ToListAsync();
        }

        // GET: api/InventorySupplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InventorySupply>> GetInventorySupply(int id)
        {
            var inventorySupply = await _context.InventorySupplys.FindAsync(id);

            if (inventorySupply == null)
            {
                return NotFound();
            }

            return inventorySupply;
        }

        // PUT: api/InventorySupplies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventorySupply(int id, InventorySupply inventorySupply)
        {
            if (id != inventorySupply.Id)
            {
                return BadRequest();
            }

            _context.Entry(inventorySupply).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventorySupplyExists(id))
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

        // POST: api/InventorySupplies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InventorySupply>> PostInventorySupply(InventorySupply inventorySupply)
        {
            _context.InventorySupplys.Add(inventorySupply);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventorySupply", new { id = inventorySupply.Id }, inventorySupply);
        }

        // DELETE: api/InventorySupplies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventorySupply(int id)
        {
            var inventorySupply = await _context.InventorySupplys.FindAsync(id);
            if (inventorySupply == null)
            {
                return NotFound();
            }

            _context.InventorySupplys.Remove(inventorySupply);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventorySupplyExists(int id)
        {
            return _context.InventorySupplys.Any(e => e.Id == id);
        }
    }
}
