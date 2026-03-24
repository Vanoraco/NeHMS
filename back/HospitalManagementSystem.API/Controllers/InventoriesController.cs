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
    public class InventoriesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public InventoriesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        public async Task<ActionResult> GetInventory([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 25 : pageSize;
            pageSize = pageSize > 100 ? 100 : pageSize;

            var query = _context.Inventories.OrderBy(i => i.Id);
            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { items, page, pageSize, total });
        }

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventory>> GetInventory(int id)
        {
            var inventory = await _context.Inventories.FindAsync(id);

            if (inventory == null)
            {
                return NotFound();
            }

            return inventory;
        }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(int id, InventoryUpdateDto inventory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id <= 0)
            {
                return BadRequest();
            }

            var entity = new Inventory
            {
                Id = id,
                Name = inventory.Name,
                Description = inventory.Description,
                Quantity = inventory.Quantity,
                ExpireDate = inventory.ExpireDate,
                InventorySupplyId = inventory.InventorySupplyId,
                EmployeeId = inventory.EmployeeId,
                Date = inventory.Date
            };

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
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

        // POST: api/Inventories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(InventoryCreateDto inventory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = new Inventory
            {
                Name = inventory.Name,
                Description = inventory.Description,
                Quantity = inventory.Quantity,
                ExpireDate = inventory.ExpireDate,
                InventorySupplyId = inventory.InventorySupplyId,
                EmployeeId = inventory.EmployeeId,
                Date = inventory.Date
            };

            _context.Inventories.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventory", new { id = entity.Id }, entity);
        }

        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            var inventory = await _context.Inventories.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventories.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventories.Any(e => e.Id == id);
        }
    }
}
