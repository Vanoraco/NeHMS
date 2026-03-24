using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Dtos.Pharmacy;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PharmacySalesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PharmacySalesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PharmacySales
        [HttpGet]
        public async Task<ActionResult> GetpharmacySales([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 25 : pageSize;
            pageSize = pageSize > 100 ? 100 : pageSize;

            var query = _context.PharmacySales.Include(ps => ps.PharmacyMedStock)
                .Include(ps => ps.Employee)
                .OrderBy(ps => ps.Id);

            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { items, page, pageSize, total });
        }

        // GET: api/PharmacySales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PharmacySale>> GetPharmacySale(int id)
        {
            var pharmacySale = await _context.PharmacySales.FindAsync(id);

            if (pharmacySale == null)
            {
                return NotFound();
            }

            return pharmacySale;
        }

        // PUT: api/PharmacySales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPharmacySale(int id, PharmacySaleUpdateDto pharmacySale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id <= 0)
            {
                return BadRequest();
            }

            var entity = new PharmacySale
            {
                Id = id,
                description = pharmacySale.Description,
                Amount = pharmacySale.Amount,
                Price = pharmacySale.Price,
                TimeStamp = pharmacySale.TimeStamp,
                PharmacyMedStockId = pharmacySale.PharmacyMedStockId,
                EmployeeId = pharmacySale.EmployeeId
            };

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacySaleExists(id))
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

        // POST: api/PharmacySales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PharmacySale>> PostPharmacySale(PharmacySaleCreateDto pharmacySale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = new PharmacySale
            {
                description = pharmacySale.Description,
                Amount = pharmacySale.Amount,
                Price = pharmacySale.Price,
                TimeStamp = pharmacySale.TimeStamp,
                PharmacyMedStockId = pharmacySale.PharmacyMedStockId,
                EmployeeId = pharmacySale.EmployeeId
            };

            _context.PharmacySales.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacySale", new { id = entity.Id }, entity);
        }

        // DELETE: api/PharmacySales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacySale(int id)
        {
            var pharmacySale = await _context.PharmacySales.FindAsync(id);
            if (pharmacySale == null)
            {
                return NotFound();
            }

            _context.PharmacySales.Remove(pharmacySale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacySaleExists(int id)
        {
            return _context.PharmacySales.Any(e => e.Id == id);
        }
    }
}
