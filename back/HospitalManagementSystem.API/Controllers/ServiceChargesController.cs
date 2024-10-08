using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Data;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ServiceChargesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ServiceChargesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ServiceCharges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceCharge>>> GetServiceCharges()
        {
            return await _context.ServiceCharges.ToListAsync();
        }

        // GET: api/ServiceCharges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceCharge>> GetServiceCharge(int id)
        {
            var serviceCharge = await _context.ServiceCharges.FindAsync(id);

            if (serviceCharge == null)
            {
                return NotFound();
            }

            return serviceCharge;
        }

        // PUT: api/ServiceCharges/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceCharge(int id, ServiceCharge serviceCharge)
        {
            if (id != serviceCharge.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceCharge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceChargeExists(id))
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

        // POST: api/ServiceCharges
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceCharge>> PostServiceCharge(ServiceCharge serviceCharge)
        {
            _context.ServiceCharges.Add(serviceCharge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceCharge", new { id = serviceCharge.Id }, serviceCharge);
        }

        // DELETE: api/ServiceCharges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceCharge(int id)
        {
            var serviceCharge = await _context.ServiceCharges.FindAsync(id);
            if (serviceCharge == null)
            {
                return NotFound();
            }

            _context.ServiceCharges.Remove(serviceCharge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceChargeExists(int id)
        {
            return _context.ServiceCharges.Any(e => e.Id == id);
        }
    }
}
