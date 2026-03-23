using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using Microsoft.AspNetCore.Authorization;
using HospitalManagementSystem.API.Dtos.Inventory;
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
            return await _context.InventorySupplies.ToListAsync();
        }

        // GET: api/InventorySupplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InventorySupply>> GetInventorySupply(int id)
        {
            var inventorySupply = await _context.InventorySupplies.FindAsync(id);

            if (inventorySupply == null)
            {
                return NotFound();
            }

            return inventorySupply;
        }

        // PUT: api/InventorySupplies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventorySupply(int id, InventorySupplyUpdateDto inventorySupply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id <= 0)
            {
                return BadRequest();
            }

            var entity = new InventorySupply
            {
                Id = id,
                Name = inventorySupply.Name,
                Description = inventorySupply.Description,
                Address = inventorySupply.Address,
                PhoneNumber = inventorySupply.PhoneNumber
            };

            _context.Entry(entity).State = EntityState.Modified;

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
        public async Task<ActionResult<InventorySupply>> PostInventorySupply(InventorySupplyCreateDto inventorySupply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = new InventorySupply
            {
                Name = inventorySupply.Name,
                Description = inventorySupply.Description,
                Address = inventorySupply.Address,
                PhoneNumber = inventorySupply.PhoneNumber
            };

            _context.InventorySupplies.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventorySupply", new { id = entity.Id }, entity);
        }

        // DELETE: api/InventorySupplies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventorySupply(int id)
        {
            var inventorySupply = await _context.InventorySupplies.FindAsync(id);
            if (inventorySupply == null)
            {
                return NotFound();
            }

            _context.InventorySupplies.Remove(inventorySupply);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventorySupplyExists(int id)
        {
            return _context.InventorySupplies.Any(e => e.Id == id);
        }
    }
}
