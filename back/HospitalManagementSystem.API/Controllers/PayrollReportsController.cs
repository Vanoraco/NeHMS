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
    public class PayrollReportsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PayrollReportsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PayrollReports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayrollReport>>> GetPayrollReports()
        {
            return await _context.PayrollReports.ToListAsync();
        }

        // GET: api/PayrollReports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayrollReport>> GetPayrollReport(int id)
        {
            var payrollReport = await _context.PayrollReports.FindAsync(id);

            if (payrollReport == null)
            {
                return NotFound();
            }

            return payrollReport;
        }

        // PUT: api/PayrollReports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayrollReport(int id, PayrollReport payrollReport)
        {
            if (id != payrollReport.Id)
            {
                return BadRequest();
            }

            _context.Entry(payrollReport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayrollReportExists(id))
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

        // POST: api/PayrollReports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PayrollReport>> PostPayrollReport(PayrollReport payrollReport)
        {
            _context.PayrollReports.Add(payrollReport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayrollReport", new { id = payrollReport.Id }, payrollReport);
        }

        // DELETE: api/PayrollReports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayrollReport(int id)
        {
            var payrollReport = await _context.PayrollReports.FindAsync(id);
            if (payrollReport == null)
            {
                return NotFound();
            }

            _context.PayrollReports.Remove(payrollReport);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PayrollReportExists(int id)
        {
            return _context.PayrollReports.Any(e => e.Id == id);
        }
    }
}
