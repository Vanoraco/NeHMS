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
    public class PharmacyMedStocksController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PharmacyMedStocksController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PharmacyMedStocks
        [HttpGet]
        public async Task<ActionResult> GetPharmacyMedStocks([FromQuery] int page = 1, [FromQuery] int pageSize = 25)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 25 : pageSize;
            pageSize = pageSize > 100 ? 100 : pageSize;

            var query = _context.PharmacyMedStocks.OrderBy(p => p.Id);
            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { items, page, pageSize, total });
        }

        // GET: api/PharmacyMedStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PharmacyMedStock>> GetPharmacyMedStock(int id)
        {
            var pharmacyMedStock = await _context.PharmacyMedStocks.FindAsync(id);

            if (pharmacyMedStock == null)
            {
                return NotFound();
            }

            return pharmacyMedStock;
        }

        // PUT: api/PharmacyMedStocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPharmacyMedStock(int id, PharmacyMedStockUpdateDto pharmacyMedStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id <= 0)
            {
                return BadRequest();
            }

            var entity = new PharmacyMedStock
            {
                Id = id,
                Name = pharmacyMedStock.Name,
                Description = pharmacyMedStock.Description,
                MedicationId = pharmacyMedStock.MedicationId,
                BatchNumber = pharmacyMedStock.BatchNumber,
                ExpirationDate = pharmacyMedStock.ExpirationDate,
                Price = pharmacyMedStock.Price,
                Quantity = pharmacyMedStock.Quantity,
                EmployeeId = pharmacyMedStock.EmployeeId,
                MedSupplierId = pharmacyMedStock.MedSupplierId,
                TimeStamp = pharmacyMedStock.TimeStamp
            };

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacyMedStockExists(id))
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

        // POST: api/PharmacyMedStocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PharmacyMedStock>> PostPharmacyMedStock(PharmacyMedStockCreateDto pharmacyMedStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = new PharmacyMedStock
            {
                Name = pharmacyMedStock.Name,
                Description = pharmacyMedStock.Description,
                MedicationId = pharmacyMedStock.MedicationId,
                BatchNumber = pharmacyMedStock.BatchNumber,
                ExpirationDate = pharmacyMedStock.ExpirationDate,
                Price = pharmacyMedStock.Price,
                Quantity = pharmacyMedStock.Quantity,
                EmployeeId = pharmacyMedStock.EmployeeId,
                MedSupplierId = pharmacyMedStock.MedSupplierId,
                TimeStamp = pharmacyMedStock.TimeStamp
            };

            _context.PharmacyMedStocks.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacyMedStock", new { id = entity.Id }, entity);
        }

        // DELETE: api/PharmacyMedStocks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePharmacyMedStock(int id)
        {
            var pharmacyMedStock = await _context.PharmacyMedStocks.FindAsync(id);
            if (pharmacyMedStock == null)
            {
                return NotFound();
            }

            _context.PharmacyMedStocks.Remove(pharmacyMedStock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacyMedStockExists(int id)
        {
            return _context.PharmacyMedStocks.Any(e => e.Id == id);
        }
    }
}
